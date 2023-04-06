import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonId } from "../../redux/actions";
import loading from "../../loading.gif";

function renderizarDetail(pokemonDetailed) {
  // console.log("se ejecuta renderizarDetail");
  const types = pokemonDetailed.types.map((element) => {
    return element.type.name;
  });
  const hpIndex = pokemonDetailed.stats.findIndex(
    (el) => el.stat.name === "hp"
  );
  const attackIndex = pokemonDetailed.stats.findIndex(
    (el) => el.stat.name === "attack"
  );
  const defenseIndex = pokemonDetailed.stats.findIndex(
    (el) => el.stat.name === "defense"
  );
  const speedIndex = pokemonDetailed.stats.findIndex(
    (el) => el.stat.name === "speed"
  );

  return (
    <div key={pokemonDetailed.id}>
      <img src={pokemonDetailed.sprites.other.home.front_default} alt={pokemonDetailed.name} />
      <p>ID: {pokemonDetailed.id}</p>
      <p>Name: {pokemonDetailed.name}</p>
      <p>Life: {pokemonDetailed.stats[hpIndex].base_stat}</p>
      <p>Attack: {pokemonDetailed.stats[attackIndex].base_stat}</p>
      <p>Defense: {pokemonDetailed.stats[defenseIndex].base_stat}</p>
      <p>Speed: {pokemonDetailed.stats[speedIndex].base_stat}</p>
      <p>Height: {pokemonDetailed.height}</p>
      <p>Weight: {pokemonDetailed.weight}</p>
      <p>Types: {types.join(', ')}</p>
    </div>
  )
}

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonId(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const pokemonDetailed = useSelector((state) => state.pokemonsDetail)
  // console.log(Array.isArray(pokemonDetailed))
  // console.log("este es lo que trae del state: " + pokemonDetailed)



  return (

    <div className="Detail">
      <div >
        {!pokemonDetailed.id ? (
          <div><img src={loading} width='120px' alt='loading' /> </div>) : renderizarDetail(pokemonDetailed)
        }
      </div>
    </div>
    
  );
}