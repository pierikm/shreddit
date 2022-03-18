import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Modal2 } from '../Modal';
import { deletePost, loadPosts } from "../../store/posts"
import { createVote, deleteVote, loadVotes } from "../../store/votes";
import EditPostForm from "./EditPostForm";
import "./posts.css";

function PostPreview({ post, userId }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const votes = useSelector(state => state.votes[post.id]);

    const handleDelete = async () => {
        await dispatch(deletePost(post.id))
    };

    const handleVote = async (strVote) => {
        console.log("vote", votes[userId]);
        console.log("strVote", strVote);
        const payload = {
            vote: strVote
        };
        if (votes[userId] === undefined) {
            console.log("No vote -> create vote");
            await dispatch(createVote(payload, post.id));
        }
        else if (votes[userId].vote) {
            console.log("Upvote -> delete vote");
            await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'false') {
                console.log("create downvote");
                await dispatch(createVote(payload, post.id));
            }
        }
        else if (!votes[userId].vote) {
            console.log("Downvote -> delete vote");
            await dispatch(deleteVote(votes[userId].id))
            if (strVote === 'true') {
                console.log("create upvote");
                await dispatch(createVote(payload, post.id));
            }
        }
        await dispatch(loadPosts())
        await dispatch(loadVotes());
    };

    return (
        <>
            <span>
                <button onClick={() => handleVote('true')}>upvote</button>
                <div>
                    {post.score}
                </div>
                <button onClick={() => handleVote('false')}>downvote</button>
            </span>
            <NavLink exact to={`/ posts / ${post.id}`}>
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
