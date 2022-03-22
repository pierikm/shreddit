import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal2 } from '../Modal';
import { deletePost, loadPosts, loadSinglePost } from "../../store/posts"
import { createVote, deleteVote, loadVotes } from "../../store/votes";
import EditPostForm from "./EditPostForm";
import "./posts.css";

function PostPreview({ post, userId }) {
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const dispatch = useDispatch();
    const votes = useSelector(state => state.votes[post.id]);

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
    };

    const handleVote = async (strVote) => {
        // console.log("vote", votes[userId]);
        // console.log("strVote", strVote);
        const payload = {
            vote: strVote
        };
        if (votes[userId] === undefined) {
            // console.log("No vote -> create vote");
            await dispatch(createVote(payload, post.id));
        }
        else if (votes[userId].vote) {
            // console.log("Upvote -> delete vote");
            await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'false') {
                console.log("create downvote");
                await dispatch(createVote(payload, post.id));
            }
        }
        else if (!votes[userId].vote) {
            // console.log("Downvote -> delete vote");
            await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'true') {
                // console.log("create upvote");
                await dispatch(createVote(payload, post.id));
            }
        }
        await dispatch(loadSinglePost(post.id));
        await dispatch(loadVotes());
    };

    return (
        <>
            <div className="score-container">
                <img
                    alt="upvote"
                    className={'vote-icon upvote-icon' + `${votes && votes[userId]?.vote === true ? ' selected' : ''}`}
                    src="/static/snowboard_icon.png"
                    onClick={() => handleVote('true')} />
                <div>
                    {post.score}
                </div>
                <img
                    alt="downvote"
                    className={'vote-icon downvote-icon' + `${votes && votes[userId]?.vote === false ? ' selected' : ''}`}
                    src="/static/ski_icon.png"
                    onClick={() => handleVote('false')} />
            </div>
            {post?.image_url ?
                <img
                    alt="thumbnail"
                    className="preview-pic img"
                    src={post.image_url} /> :
                <img
                    alt="text thumbnail"
                    className="preview-pic text"
                    src="/static/paragraph_icon.png" />
            }
            <div className="preview-dtls-container">
                <NavLink className="post-link" exact to={`/posts/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                </NavLink>
                <div className="preview-user-container">
                    <span className="preview-posted-by">posted by</span>
                    <span className="preview-username">{post.username}</span>
                    {userId === post.user_id &&
                        <span className="preview-user-btns">
                            <button
                                className="button"
                                onClick={() => !showModal && setShowModal(true)}>
                                Edit
                            </button>
                            <button
                                className="button"
                                onClick={() => setShowDelete(true)}>
                                Delete
                            </button>
                        </span>
                    }
                </div>
            </div>
            <div className="edit">
                {
                    showModal &&
                    <Modal2
                        title="Edit Post"
                        onClose={() => setShowModal(false)}
                        show={showModal}
                    >
                        <EditPostForm
                            post={post}
                            setShowModal={setShowModal}
                        />
                    </Modal2>
                }
                {
                    showDelete && <Modal2
                        title="Delete Post?"
                        onClose={() => setShowDelete(false)}
                        show={showDelete}
                    >
                        <button
                            id="confirm-delete-btn"
                            className="button"
                            onClick={handleDelete}>
                            Confirm Delete
                        </button>
                    </Modal2>
                }
            </div>
        </>
    )
}

export default PostPreview
