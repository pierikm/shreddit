import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    createComment,
    editComment,
    deleteComment,
    postLoadComments,
    createVote
} from "../../store/comments";
import { countToStr } from './utils';

function Comment({ comment, post_id, comments, parentId = null, count }) {
    const [editing, setEditing] = useState(false);
    const [replying, setReplying] = useState(false);
    const [reply, setReply] = useState('');
    const [content, setContent] = useState(comment.content);
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);

    const commentsArr = Object.values(comments);
    const countStr = countToStr(count);

    const dispatch = useDispatch();

    const commentValidator = () => {
        const errors = [];
        if (content.length < 1) errors.push("Comment cannot be empty.");
        if (content.length > 2000) errors.push("Comment can be no more than 2000 characters.")
        setErrors(errors);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            post_id,
            content
        }
        if (!errors.length) {
            setEditing(false)
            await dispatch(editComment(payload, comment.id));
            await dispatch(postLoadComments(post_id));
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        const payload = {
            post_id,
            parent_id: comment.id,
            content: reply
        }
        if (!errors.length) {
            setReplying(false);
            setReply('');
            await dispatch(createComment(payload));
            await dispatch(postLoadComments(post_id));
        }
    };

    const handleVote = async (strVote) => {
        const payload = {
            vote: strVote
        };
        if (comment?.votes[user.id] === undefined) {
            await dispatch(createVote(payload, comment.id));
        }
        else if (comment?.votes[user.id].vote) {
            // await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'false') {
                console.log("create downvote");
                // await dispatch(createVote(payload, post.id));
            }
        }
        else if (!comment?.votes[user.id].vote) {
            // await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'true') {
                // await dispatch(createVote(payload, post.id));
            }
        }
        // await dispatch(loadSinglePost(post.id));
        // await dispatch(loadVotes());
    };

    useEffect(() => {
        commentValidator();
    }, [content])

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
        await dispatch(postLoadComments(post_id));
    };

    if (editing) {
        return (
            <div className="comment-container" id={parentId ? 'comment-reply' : ''}>
                <div>
                    <span className="comment-username">
                        {comment.user.username}
                    </span>
                </div>
                <div>
                    {errors.map(error => (
                        <div
                            id="error"
                            key={error}>
                            {error}
                        </div>
                    ))}
                </div>
                <form className="comment-edit-form" onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                        className="comment-edit-input"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <span className="comment-edit-btns">
                        <button
                            type="submit"
                            className="button edit-comment-btn">
                            Submit
                        </button>
                        <button
                            className="button edit-comment-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setContent(comment.content);
                                setEditing(false);
                            }}>
                            Cancel
                        </button>
                    </span>
                </form>
            </ div>
        )
    }
    return (
        <>

            <div className={`comment-container`}>
                <div className="score-container">
                    <img
                        alt="upvote"
                        className={'vote-icon upvote-icon' + `${comment.votes && comment.votes[user.id]?.vote === true ? ' selected' : ''}`}
                        src="/static/snowboard_icon.png"
                        onClick={() => handleVote('true')} />
                    <div>
                        {comment.score}
                    </div>
                    <img
                        alt="downvote"
                        className={'vote-icon downvote-icon' + `${comment.votes && comment.votes[user.id]?.vote === false ? ' selected' : ''}`}
                        src="/static/ski_icon.png"
                        onClick={() => handleVote('false')} />
                </div>
                <div>
                    <span className="comment-username">
                        {comment.user.username}
                    </span>
                </div>
                <p className='comment-content'>{comment.content}</p>
                <span className="comment-edit-btns">
                    {count < 5 &&
                        <button
                            className="button edit-comment-btn"
                            onClick={() => setReplying(!replying)}>
                            Reply
                        </button>
                    }
                    {user.id === comment.user.id &&
                        <>
                            <button className="button edit-comment-btn" onClick={() => setEditing(true)}>Edit</button>
                            <button className="button edit-comment-btn" onClick={() => handleDelete()}>Delete</button>
                        </>
                    }
                </ span>
                {
                    replying &&
                    <form className="comment-reply-form" onSubmit={(e) => handleReply(e)}>
                        <textarea
                            className="comment-reply-input"
                            rows="5"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <span className="comment-reply-btns">
                            <button
                                type="submit"
                                className="button reply-comment-btn">
                                Submit
                            </button>
                            <button
                                className="button reply-comment-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // setReply('');
                                    setReplying(false);
                                }}>
                                Cancel
                            </button>
                        </span>
                    </form>
                }

                {
                    count < 5 &&
                    <div className="reply-container">
                        <ul className={`comment-section ${countStr}`}>
                            {
                                Object.values(comments)
                                    .filter(reply => reply.parent_id === comment.id)
                                    .map(reply => (
                                        <Comment key={reply.id}
                                            post_id={post_id}
                                            comment={reply}
                                            comments={comments}
                                            count={count + 1} />
                                    ))
                            }
                        </ul>
                    </div>
                }
            </ div>
        </>
    )
}

export default Comment;
