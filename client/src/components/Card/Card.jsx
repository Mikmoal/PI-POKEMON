import { Link } from "react-router-dom"
import style from "./Card.module.css"

const Card = (props) => {
    const types = props.types.join(', ');
    return(
        <div className={style.imagenP}>
            <img src={props.image} alt="image" />
            <p>Name: {props.name}</p>
            <p>Types: {types}</p>
        </div>
    )
}

export default Card