import { NavLink } from "react-router-dom";
import getRandomIntInclusive from "../utils/randomInt";
import { data } from './data';
import './NotFound.css';

function NotFound() {

    const rand = getRandomIntInclusive(0, data.length - 1);

    return (
        <div className="not-found-container">
            <h2 className="not-found-title">404 Out of Bounds</h2>
            <img
                alt="not found"
                src={data[rand]}
                className="not-found-img"
            />
            <div>
                <NavLink
                    to='/posts'
                    className="button not-found-btn">
                    Get Back on the Trail
                </NavLink>
            </div>
        </ div>
    )
}

export default NotFound;
