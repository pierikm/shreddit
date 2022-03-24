import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment, deleteComment } from "../../store/comments";
import { postLoadComments } from '../../store/comments';

function Comment({ comment, post_id }) {
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);

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

    useEffect(() => {
        commentValidator();
    }, [content])

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
        await dispatch(postLoadComments(post_id));
    };

    if (editing) {
        return (
            <div className="comment-container">
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
        <div className="comment-container">
            <div>
                <span className="comment-username">
                    {comment.user.username}
                </span>
            </div>
            <p>{comment.content}</p>
            {user.id === comment.user.id &&
                <span className="comment-edit-btns">
                    <button className="button edit-comment-btn" onClick={() => setEditing(true)}>Edit</button>
                    <button className="button edit-comment-btn" onClick={() => handleDelete()}>Delete</button>
                </ span>
            }
        </ div>
    )
}

export default Comment;
