import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostPreview from "./PostsPreview";
import SideBar from "../SideBar";
// import { loadPosts } from "../../store/posts";

function Posts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sortBy, setSortBy] = useState(window.sessionStorage.getItem("sortBy") ?
        window.sessionStorage.getItem("sortBy") : "new");
    const [sortedPosts, setSortedPosts] = useState([])
    const dispatch = useDispatch();
    const posts = useSelector(state => {
        // const arr = Object.values(state.posts)
        // if (sortBy === 'top') arr.sort((a, b) => b.score - a.score);
        // else if (sortBy === 'new') arr.sort((a, b) => b.id - a.id);
        // else if (sortBy === 'old') arr.sort((a, b) => a.id - b.id);
        return state.posts;
    });
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        changeSort(sortBy);
        // setSortedPosts(posts);
        setIsLoaded(true);
    }, []);

    const changeSort = async (sort) => {
        const postsArr = Object.values(posts);
        if (sort === 'top') {
            window.sessionStorage.setItem("sortBy", "top");
            setSortedPosts(postsArr.sort((a, b) => b.score - a.score));
        }
        else if (sort === 'new') {
            window.sessionStorage.setItem("sortBy", "new");
            setSortedPosts(postsArr.sort((a, b) => b.id - a.id));
        }
        else if (sort === 'old') {
            window.sessionStorage.setItem("sortBy", "old");
            setSortedPosts(postsArr.sort((a, b) => a.id - b.id));
        }
        setSortBy(sort);
        // await dispatch(loadPosts());
    }

    if (!isLoaded) return null;

    return (
        <>
            <div className="sort-btn-container">
                <div>Sort by</div>
                <button
                    className={"button" + `${sortBy === "top" ? ' sort' : ''}`}
                    onClick={() => changeSort("top")}>
                    Top
                </button>
                <button
                    className={"button" + `${sortBy === "new" ? ' sort' : ''}`}
                    onClick={() => changeSort("new")}>
                    New
                </button>
                <button
                    className={"button" + `${sortBy === "old" ? ' sort' : ''}`}
                    onClick={() => changeSort("old")}>
                    Old
                </button>
            </div>
            <div className="posts-page">
                <ul className="post-preview-list">
                    {
                        isLoaded && sortedPosts &&
                        sortedPosts.map(post => (
                            <li key={post.id}>
                                <PostPreview userId={user.id} post={posts[post.id]} />
                            </li>
                        ))
                    }
                </ul>
                <SideBar user={user} />
                {/* <div className="sidebar">
                    <div className="create-post-link-container">
                        <NavLink
                            className="create-post-link button"
                            exact to='/posts/new'>
                            Create a Post
                        </NavLink>
                        <div className="posting-as-container">
                            <span className="posting-as">posting as </span>
                            <span className="posting-as-username">{user.username}</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Posts;
