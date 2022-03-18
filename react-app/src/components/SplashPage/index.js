import getRandomIntInclusive from "../utils/randomInt";
import { data } from './data';

function SplashPage() {

    const rand = getRandomIntInclusive(0, data.length - 1);

    return (
        <img src={data[rand]} />
    )
}

export default SplashPage;
