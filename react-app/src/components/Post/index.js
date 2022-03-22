import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Modal2 } from '../Modal';
import { deletePost } from "../../store/posts"
import EditPostForm from "../Posts/EditPostForm";
import CommentForm from "../Comments/CommentForm";
import Comment from "../Comments";
import { postLoadComments } from "../../store/comments";

function Post() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { postId } = useParams("postId");
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts[postId]);
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.session.user);

    const history = useHistory();
    const redirect = () => history.replace(`/posts`);

    const handleDelete = async () => {
        redirect();
        await dispatch(deletePost(post.id));
    };

    useEffect(() => {
        (async () => {
            await dispatch(postLoadComments(postId));
            setIsLoaded(true);
        })();
    }, [dispatch, postId]);

    if (!isLoaded) return null;

    return (
        <>
            <h2 className="post-title">{post.title}</h2>
            {
                post.description &&
                <p>{post.description}</p>
            }
            {
                post.image_url &&
                <img src={post.image_url} alt={post.title} />
            }
            {user.id === post.user_id &&
                <span className="preview-user-btns">
                    <button
                        className="button"
                        onClick={() => !showModal && setShowModal(true)}>
                        Edit
                    </button>
                    <button
                        className="button"
                        onClick={() => setShowDelete(true)}>
                        Delete
                    </button>
                </span>
            }
            <CommentForm postId={postId} />
            <ul>
                {
                    Object.values(comments).map(comment => (
                        <Comment key={comment.id} post_id={postId} comment={comment} />
                    ))
                }
            </ul>
            <div className="edit">
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
                {
                    showDelete && <Modal2
                        title="Delete Post?"
                        onClose={() => setShowDelete(false)}
                        show={showDelete}
                    >
                        <button
                            id="confirm-delete-btn"
                            className="button"
                            onClick={handleDelete}>
                            Confirm Delete
                        </button>
                    </Modal2>
                }
            </div>
        </>
    )
}

export default Post;
