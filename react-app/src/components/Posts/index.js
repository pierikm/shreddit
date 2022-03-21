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
            <div className="posts-page">
                <ul className="post-preview-list">
                    {
                        isLoaded &&
                        posts.map(post => (
                            <li key={post.id}>
                                <PostPreview userId={user.id} post={post} />
                            </li>
                        ))
                    }
                </ul>
                <div className="sidebar">
                    <div className="create-post-container">
                        <NavLink
                            className="create-post-link button"
                            exact to='/posts/new'>
                            Create a Post
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts;
