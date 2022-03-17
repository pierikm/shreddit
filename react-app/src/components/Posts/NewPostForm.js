import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createPost, loadPosts } from "../../store/posts";

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImage] = useState('');
    const [postType, setPostType] = useState("text");
    // const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = () => history.replace(`/posts`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title
        }
        if (postType === "image") payload.image_url = image_url;
        else payload.description = description;

        console.log(payload);
        await dispatch(createPost(payload))
        await dispatch(loadPosts());
        redirect();
    }

    return (
        <>
            <span>
                <button onClick={() => setPostType("text")}>Text Post</button>
                <button onClick={() => setPostType("image")}>Image Post</button>
            </span>
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                    placeholder="Title"
                    rows="2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {postType === "text" &&
                    <textarea
                        placeholder="Description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                }
                {postType === "image" &&
                    <input
                        placeholder="Image URL"
                        value={image_url}
                        onChange={(e) => setImage(e.target.value)}
                    />
                }
                <button>Submit</button>
            </form>
        </>
    )
}

export default NewPostForm;
