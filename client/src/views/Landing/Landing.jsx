import { Link } from 'react-router-dom';
import ash from "../../ash.jpg";
import style from "./Landing.module.css";
function Landing() {
    return (
        <div className="Landing">
            <h1>Pokemon PI</h1>

            <div className={style.main}>
                <img src= {ash} alt="logo pokemon" />
                <Link to="/home">
                    <button>Enter</button>
                </Link>
            </div>

        </div>

    );
}

export default Landing;