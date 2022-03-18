import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal2 } from '../Modal';
import { deletePost } from "../../store/posts"
import EditPostForm from "./EditPostForm";
import "./posts.css";

function PostPreview({ post, userId }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
    }

    return (
        <>
            <span>{post.score}</span>
            <NavLink exact to={`/posts/${post.id}`}>
                <h2 className="post-title">{post.title}</h2>
            </NavLink>
            <span>{post.username}</span>
            {userId === post.user_id &&
                <span>
                    <button onClick={() => !showModal && setShowModal(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </span>
            }
            {
                showModal &&
                <Modal2
                    title="Edit Post"
                    onClose={() => setShowModal(false)}
                    show={showModal}
                >
                    <EditPostForm
                        post={post}
                        setShowModal={setShowModal}
                    />
                </Modal2>
            }
        </>
    )
}

export default PostPreview
