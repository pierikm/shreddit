import { NavLink } from "react-router-dom";
import getRandomIntInclusive from "../utils/randomInt";
import { data } from './data';
import './splashpage.css';

function SplashPage() {

    const rand = getRandomIntInclusive(0, data.length - 1);

    return (
        <div className="splash-container">
            <h2 id="splash-title">Welcome to Shreddit!</h2>
            <img id="splash-gif" src={data[rand]} />
            <div>
                <NavLink
                    to='/posts'
                    className="button"
                    id="splash-btn">
                    Start Shredding
                </NavLink>
            </div>
        </div>
    )
}

export default SplashPage;
