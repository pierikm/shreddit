import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Modal2 } from '../Modal';
import { deletePost, loadSinglePost } from "../../store/posts"
import { createVote, deleteVote } from "../../store/votes";
import EditPostForm from "../Posts/EditPostForm";
import CommentForm from "../Comments/CommentForm";
import Comment from "../Comments";
import SideBar from "../SideBar";
import { postLoadComments } from "../../store/comments";
import "./Post.css";

function Post() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { postId } = useParams("postId");
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts[postId]);
    const comments = useSelector(state => state.comments);
    const user = useSelector(state => state.session.user);
    const votes = useSelector(state => state.posts[postId]?.votes);

    const history = useHistory();
    const redirect = () => history.replace(`/posts`);

    const handleDelete = async () => {
        redirect();
        await dispatch(deletePost(post.id));
    };

    const handleVote = async (strVote) => {
        console.log(votes);
        const payload = {
            vote: strVote
        };
        if (votes[user.id] === undefined) {
            await dispatch(createVote(payload, post.id));
        }
        else if (votes[user.id].vote) {
            await dispatch(deleteVote(votes[user.id].id))
            if (strVote === 'false') {
                console.log("create downvote");
                await dispatch(createVote(payload, post.id));
            }
        }
        else if (!votes[user.id].vote) {
            await dispatch(deleteVote(votes[user.id].id))
            if (strVote === 'true') {
                await dispatch(createVote(payload, postId));
            }
        }
        await dispatch(loadSinglePost(postId));
        // await dispatch(loadVotes());
    };

    useEffect(() => {
        (async () => {
            await dispatch(postLoadComments(postId));
            setIsLoaded(true);
        })();
    }, [dispatch, postId]);

    if (!isLoaded) return null;

    else if (!post) return null;

    return (
        <>
            <div className="post-page">
                <div>
                    <div className="post-details-container">
                        <div className="score-container">
                            <img
                                alt="upvote"
                                className={'vote-icon upvote-icon' + `${votes && votes[user.id]?.vote === true ? ' selected' : ''}`}
                                src="/static/snowboard_icon.png"
                                onClick={() => handleVote('true')} />
                            <div>
                                {post?.score}
                            </div>
                            <img
                                alt="downvote"
                                className={'vote-icon downvote-icon' + `${votes && votes[user.id]?.vote === false ? ' selected' : ''}`}
                                src="/static/ski_icon.png"
                                onClick={() => handleVote('false')} />
                        </div>
                        <div className="post-details">
                            <h2 className="post-title-post">{post?.title}</h2>
                            {
                                post?.description &&
                                <p className="post-description">{post?.description}</p>
                            }
                            {
                                post?.image_url &&
                                <a href={post?.image_url} target="_blank">
                                    <img className="post-image" src={post?.image_url} alt={post?.title} />
                                </a>
                            }
                            <span className="preview-user-btns">
                                {user?.id === post?.user_id &&
                                    <>
                                        <button
                                            id="post-edit-btn"
                                            className="button"
                                            onClick={() => !showModal && setShowModal(true)}>
                                            Edit
                                        </button>
                                        <button
                                            className="button"
                                            onClick={() => setShowDelete(true)}>
                                            Delete
                                        </button>
                                    </>
                                }
                            </span>
                        </div>
                    </div>
                    <h2 className="comments-title">Comments</h2>
                    <CommentForm postId={postId} />
                    <ul className="comment-section">
                        {
                            Object.values(comments).map(comment => (
                                <Comment key={comment.id} post_id={postId} comment={comment} />
                            ))
                        }
                    </ul>
                </div>
                <SideBar user={user} />
            </div>
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
