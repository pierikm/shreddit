import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, postLoadComments } from '../../store/comments'

function CommentForm({ postId }) {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            post_id: postId,
            parent_id: null,
            content
        }
        setShowErrors(true)

        if (!errors.length) {
            await dispatch(createComment(payload))
            setContent('');
            setShowErrors(false);
            await dispatch(postLoadComments(postId));
        }
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const commentValidator = () => {
        const errors = [];
        if (content.length < 1) errors.push("Comment cannot be empty.");
        if (content.length > 2000) errors.push("Comment can be no more than 2000 characters.")
        setErrors(errors);
    }

    useEffect(() => {
        commentValidator();
    }, [content])

    return (
        <>
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
            <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
                {/* <label className="add-comment-label">Add a comment</label> */}
                <textarea
                    className="comment-input input"
                    rows="5"
                    value={content}
                    onKeyDown={(e) => onEnterPress(e)}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="comment-btn button">Submit Comment</button>
            </form>
        </>
    )
}

export default CommentForm;
