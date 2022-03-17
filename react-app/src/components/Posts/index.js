import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PostPreview from "./PostsPreview";

function Posts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            setIsLoaded(true);
        })();
    }, [dispatch]);

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
