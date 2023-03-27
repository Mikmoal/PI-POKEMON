import { Link } from "react-router-dom"
import Card from "../Card/Card.jsx"
import style from "./Cards.module.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getTypes, createPokemon, getPokemons, clean } from "../../redux/actions";

const Cards = () => {
    const pokemonsArr = useSelector(state => state.pokemons)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(clean())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(8);


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = pokemonsArr.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className={style.mainContainer}>
            {pokemonsArr.map(pokemon => {
                return <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    life={pokemon.life}
                    attack={pokemon.attack}
                    defense={pokemon.defense}
                    speed={pokemon.speed}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    types={pokemon.types}
                />
            })}
        </div>
    )
}

export default Cards