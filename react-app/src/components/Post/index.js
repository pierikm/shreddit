import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Post() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { postId } = useParams("postId")
    console.log(postId);

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
        </>
    )
}

export default Post;
