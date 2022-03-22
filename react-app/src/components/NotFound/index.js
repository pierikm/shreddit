import getRandomIntInclusive from "../utils/randomInt";
import { data } from './data';


function NotFound() {

    const rand = getRandomIntInclusive(0, data.length - 1);

    return (
        <div className="not-found-container">
            <h2>404 Out of Bounds</h2>
            <img alt="not found" src={data[rand]} />
        </ div>
    )
}

export default NotFound;
