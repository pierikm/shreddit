import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from '../../store/comments'
import { postLoadComments } from "../../store/comments";

function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            post_id: postId,
            content
        }
        setShowErrors(true)

        if (!errors.length) {
            const comment = await dispatch(createComment(payload))
            setContent('');
            setShowErrors(false);
            dispatch(postLoadComments(postId));
        }
    }

    const commentValidator = () => {
        const errors = [];
        if (content.length < 1) errors.push("Comment must have at least 1 character.");
        if (content.length > 2000) errors.push("Comment can be no more than 2000 characters.")
        setErrors(errors);
    }

    useEffect(() => {
        commentValidator();
    }, [content])

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
            {
                showErrors &&
                <div className="comment-errors">
                    {
                        errors.map(error => (
                            <div id="error" key={error}>{error}</div>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default CommentForm;
