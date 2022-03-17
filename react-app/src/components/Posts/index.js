import { useEffect, useDispatch, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PostPreview from "./PostsPreview";
// import { loadPosts } from "../../store/posts";

function Posts() {
    const [isLoaded, setIsLoaded] = useState(false);
    // const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    return (
        <>
            <NavLink exact to='/posts/new'>
                Create a Post
            </NavLink>
            <ul>
                {
                    isLoaded &&
                    posts.map(post => (
                        <li key={post.id}>
                            <PostPreview userId={user.id} post={post} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Posts;
