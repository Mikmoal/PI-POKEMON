import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import FilterTypes from "../FilterTypes/FilterTypes";
import Orders from '../Orders/Orders';
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

            <FilterPokemons
                paginate={paginate} />

            <FilterTypes
                paginate={paginate}
            />
            <Link to="/newPokemon">New Pokemon</Link>
        </div>
    )
}

export default NavBar