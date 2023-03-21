import { Link } from "react-router-dom"
import { Card } from "../Card"
import style from "./Cards.module.css"
import { useSelector } from "react-redux"

const Cards = () => {
    const pokemonsArr = useSelector(state=>state.pokemons)
    return(
        <div className={style.mainContainer}>
            {pokemonsArr.map(pokemon=>{
                return <Card
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