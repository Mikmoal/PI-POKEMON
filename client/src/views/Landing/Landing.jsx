import { Link } from 'react-router-dom';
function Landing() {
    return (
        <div className="Landing">
            <h1>View of Landing page</h1>

            <div>
                <Link to="/home">
                    <button>Enter</button>
                </Link>
            </div>

        </div>

    );
}

export default Landing;