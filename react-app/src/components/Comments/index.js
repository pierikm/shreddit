import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment, deleteComment } from "../../store/comments";
import { postLoadComments } from '../../store/comments';

function Comment({ comment, post_id }) {
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditing(false)
        const payload = {
            post_id,
            content
        }
        await dispatch(editComment(payload, comment.id));
        await dispatch(postLoadComments(post_id));
    };

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
        await dispatch(postLoadComments(post_id));
    };

    if (editing) {
        return (
            <div className="comment-container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="button">Submit</button>
                </form>
                <button className="button" onClick={() => setEditing(false)}>Cancel</button>
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
                <span>
                    <button className="button" onClick={() => setEditing(true)}>Edit</button>
                    <button className="button" onClick={() => handleDelete()}>Delete</button>
                </ span>
            }
        </ div>
    )
}

export default Comment;
