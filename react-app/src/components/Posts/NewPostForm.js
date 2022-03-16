import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createPost, loadPosts } from "../../store/posts";

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = () => history.replace(`/posts`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description
        }
        await dispatch(createPost(payload))
        await dispatch(loadPosts());
        redirect();
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
                placeholder="Title"
                rows="2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
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

export default NewPostForm;
