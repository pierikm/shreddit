import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../Comments/CommentForm";
import Comment from "../Comments";

function Post() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { postId } = useParams("postId")

    const post = useSelector(state => state.posts[postId]);

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    if (!isLoaded) return null;

    return (
        <>
            <h2>{post.title}</h2>
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
                    Object.values(post.comments).map(comment => (
                        <Comment key={comment.id} post_id={postId} comment={comment} />
                    ))
                }
            </ul>
        </>
    )
}

export default Post;
