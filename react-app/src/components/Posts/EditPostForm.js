import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validatePost } from "./postValidations";
import { editPost, loadPosts } from "../../store/posts";

function EditPostForm({ post, setShowModal }) {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description ? post.description : "");
    const [image_url, setImage] = useState(post.image_url ? post.image_url : "");
    const [errors, setErrors] = useState([]);

    const postType = post.description ? "text" : "image";

    const dispatch = useDispatch();
    // const history = useHistory();
    // const redirect = () => history.replace(`/posts`);

    useEffect(() => {
        if (postType === "image") validatePost(postType, title, undefined, image_url, setErrors)
        else validatePost(postType, title, description, undefined, setErrors)
        console.log(image_url);
    }, [title, description, image_url])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title
        }
        if (postType === "image") payload.image_url = image_url;
        else payload.description = description;
        if (!errors.length) {
            await dispatch(editPost(payload, post.id))
            await dispatch(loadPosts());
            setShowModal(false);
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Title</label>
                <textarea
                    placeholder="Title"
                    rows="2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {postType === "text" &&
                    <>
                        <label>Description</label>
                        <textarea
                            placeholder="Description"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                }
                {postType === "image" &&
                    <>
                        <label>Image Link</label>
                        <input
                            placeholder="Image URL"
                            value={image_url}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </>
                }
                <button>Submit</button>
            </form>
            {errors.map(error => (
                <div key={error}>{error}</div>
            ))}
        </>
    )
}

export default EditPostForm;
