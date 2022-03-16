import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePost } from "../../store/posts"

function PostPreview({ post, userId }) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
    }

    return (
        <>
            <span>{post.score}</span>
            <h2>{post.title}</h2>
            <span>{post.username}</span>
            {userId === post.user_id &&
                <div>
                    <button>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            }
        </>
    )
}

export default PostPreview
