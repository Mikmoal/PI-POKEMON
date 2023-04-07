import { useDispatch } from "react-redux";
import { filterPokemon } from "../../redux/actions";
import style from "../Orders/Orders.module.css";

export default function FilterPokemons() {
    const dispatch = useDispatch();

    function onFilterPokemons(e) {
        e.preventDefault();
        dispatch(filterPokemon(e.target.value))
    }

    return (
        <div className={style.select}>
            <select onChange={onFilterPokemons} >
                <option value='All Pokemons' key='All Pokemons'>All Pokemons</option>
                <option value='Pokemons' key='Pokemons of API'>Pokemons</option>
                <option value='New Pokemons' key='New Pokemons'>New Pokemons</option>
            </select>
            <ul>
                <li value='All Pokemons'>All Pokemons</li>
                <li value='Pokemons'>Pokemons</li>
                <li value='New Pokemons'>New Pokemons</li>
            </ul>
        </div>
    )
}