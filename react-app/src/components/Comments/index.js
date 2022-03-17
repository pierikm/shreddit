import { useState } from "react";

function CommentForm({ postId }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        payload = {
            post_id: postId,
            content
        }
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
