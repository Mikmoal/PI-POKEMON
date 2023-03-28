import { useDispatch } from "react-redux";
import { filterPokemon } from "../../redux/actions";
import style from "./FilterPokemons.module.css";

export default function FilterPokemons(){
    const dispatch = useDispatch();

    function onFilterPokemons(e){
        e.preventDefault();
        dispatch(filterPokemon(e.target.value))
    }
    
    return(
        <div>
            <select onChange={onFilterPokemons} className={style.select}>
                <option value='All Pokemons' key='All Pokemons'>All Pokemons</option>
                <option value='Pokemons' key='Pokemons of API'>Pokemons</option>
                <option value='New Pokemons' key='New Pokemons'>New Pokemons</option>
            </select>
        </div>
    )
}