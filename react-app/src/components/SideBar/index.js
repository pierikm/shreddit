import { NavLink } from "react-router-dom";

function SideBar({ user }) {
    return (
        <div className="sidebar">
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
        </div>
    )
}

export default SideBar;
