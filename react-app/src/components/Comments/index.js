import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment, deleteComment } from "../../store/comments";
import { loadPosts } from "../../store/posts";

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
        await dispatch(loadPosts());
    };

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
        await dispatch(loadPosts());
    };

    if (editing) {
        return (
            <>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </>
        )
    }
    return (
        <>
            <div>{comment.user.username}</div>
            <p>{comment.content}</p>
            {user.id === comment.user.id &&
                <>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </>
            }
        </>
    )
}

export default Comment;
