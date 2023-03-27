import { Link } from "react-router-dom"
import SearchBar from "../SearchBar";
import FilterTypes from "../FilterTypes.css/FilterTypes";
import Orders from '..Orders';
import FilterPokemons from '../FilterPokemons/FilterPokemons'; //aqui crear componentes restantes
import style from "./NavBar.module.css"

const NavBar = ({ paginate }) => {
    return (
        <div className={style.mainContainer}>
            <Link to="/home">Home</Link>
            <SearchBar
                paginate={paginate} />

            <Orders
                paginate={paginate} />

            <FilterBreeds
                paginate={paginate} />

            <FilterTemperament
                paginate={paginate}
            />
            <Link to="/newPokemon">New Pokemon</Link>
        </div>
    )
}

export default NavBar