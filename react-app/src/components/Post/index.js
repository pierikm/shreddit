import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../Comments/CommentForm";
import Comment from "../Comments";
import { postLoadComments } from "../../store/comments";

function Post() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { postId } = useParams("postId");
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts[postId]);
    const comments = useSelector(state => state.comments);

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
            <CommentForm postId={postId} />
            <ul>
                {
                    Object.values(comments).map(comment => (
                        <Comment key={comment.id} post_id={postId} comment={comment} />
                    ))
                }
            </ul>
        </>
    )
}

export default Post;
