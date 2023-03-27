import { Link } from "react-router-dom"
import SearchName from "./SearchName";
import FilterTemperament from "./FilterTemperament";
import Orders from './Orders';
import FilterBreeds from './FilterBreeds'; //aqui crear componentes restantes
import style from "./NavBar.module.css"

const NavBar = ({ paginate }) => {
    return (
        <div className={style.mainContainer}>
            <Link to="/home">Home</Link>
            <SearchName
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