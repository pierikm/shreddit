import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from '../../store/comments'

function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(postId);
        const payload = {
            post_id: postId,
            content
        }
        await dispatch(createComment(payload))
    }
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
        </>
    )
}

export default CommentForm;
