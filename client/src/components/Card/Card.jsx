import { Link } from "react-router-dom"
import style from "./Card.module.css"

const Card = (props) => {
    return(
        <div className={style.mainContainer}>
            <img src={props.image} alt="image" />
            <p>Name:{props.name}</p>
            <p>Types:{props.types}</p>
        </div>
    )
}

export default Card