import getRandomIntInclusive from "../utils/randomInt";
import { data } from './data';


function NotFound() {

    const rand = getRandomIntInclusive(0, data.length - 1);

    return (
        <>
            <h2>404 Out of Bounds</h2>
            <img src={data[rand]} />
        </>
    )
}

export default NotFound;
