import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { validatePost } from "./postValidations";
import { createPost, loadPosts } from "../../store/posts";
import { createVote, loadVotes } from "../../store/votes";
import './newpostform.css';

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImage] = useState('');
    const [postType, setPostType] = useState("text");
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

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

        setShowErrors(true);

        if (!errors.length) {
            const newPost = await dispatch(createPost(payload))
            await dispatch(createVote({ vote: "true" }, newPost.id));
            await dispatch(loadPosts());
            await dispatch(loadVotes());
            redirect();
        }
    }

    useEffect(() => {
        if (postType === "image") validatePost(postType, title, undefined, image_url, setErrors)
        else validatePost(postType, title, description, undefined, setErrors)
    }, [title, description, image_url])

    return (
        <div className="create-container">
            <div className="create-btns">
                <button
                    className={"button" + `${postType === "text" ? " selected" : ''}`}
                    onClick={() => {
                        if (postType === "image") setShowErrors(false);
                        setPostType("text");
                    }}>
                    Text Post
                </button>
                <button
                    className={"button" + `${postType === "image" ? " selected" : ''}`}
                    onClick={() => {
                        if (postType === "text") setShowErrors(false);
                        setPostType("image");
                    }}>
                    Image Post
                </button>
            </div>
            {showErrors && <div className="create-errors">
                {errors.map(error => (
                    <div id="error" key={error}>{error}</div>
                ))}
            </div>}
            <form
                className="create-form"
                onSubmit={(e) => handleSubmit(e)}>
                <label className="create-label">Title</label>
                <textarea
                    className="input"
                    placeholder="Title"
                    rows="2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {postType === "text" &&
                    <>
                        <label className="create-label">Description</label>
                        <textarea
                            className="input"
                            placeholder="Description"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                }
                {postType === "image" &&
                    <>
                        <label className="create-label">Image URL</label>
                        <input
                            className="input"
                            placeholder="Image URL"
                            value={image_url}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </>
                }
                <button className="create-form-btn button">Submit</button>
            </form>
            {image_url &&
                <div className="img-preview-container">
                    <h3>Image Preview</h3>
                    <img
                        src={image_url}
                        onError={(e) => (e.target.src = "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")} />
                </div>
            }
        </ div>
    )
}

export default NewPostForm;
