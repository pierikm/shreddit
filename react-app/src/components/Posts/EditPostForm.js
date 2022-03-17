import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';
import { editPost, loadPosts } from "../../store/posts";

function EditPostForm({ post, setShowModal }) {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    // const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    // const history = useHistory();
    // const redirect = () => history.replace(`/posts`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description
        }
        await dispatch(editPost(payload, post.id))
        await dispatch(loadPosts());
        setShowModal(false);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Title</label>
            <textarea
                placeholder="Title"
                rows="2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
                placeholder="Description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Submit</button>
        </form>
    )
}

export default EditPostForm;
