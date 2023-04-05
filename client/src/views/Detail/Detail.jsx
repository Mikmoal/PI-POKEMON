import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonId } from "../../redux/actions";
import loading from "../../loading.gif";


export default function Detail(props) {
  //const types = props.types.join(', ');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonId(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const pokemonDetailed = useSelector((state) => state.pokemonsDetail)
  console.log(Array.isArray(pokemonDetailed))
  console.log("este es lo que trae del state: " + pokemonDetailed)

  const pokemon = []
  pokemon.push(pokemonDetailed);
  console.log(pokemon)
  return (
    <div className="Detail">
      <div >
        {pokemon.length === 0 ? (
          <div><img src={loading} width='120px' alt='loading' /> </div>) :
          (
            <div>
              {pokemon.map(el => {
                console.log(el.types)
                const types = el.types.map((element) => {
                  return element.type.name;
                });
            
                const hpIndex = pokemon.stats.findIndex(
                  (el) => el.stat.name === "hp"
                );
                const attackIndex = pokemon.stats.findIndex(
                  (el) => el.stat.name === "attack"
                );
                const defenseIndex = pokemon.stats.findIndex(
                  (el) => el.stat.name === "defense"
                );
                const speedIndex = pokemon.stats.findIndex(
                  (el) => el.stat.name === "speed"
                );

                return (
                  <div key={el.id}>
                    <img src={el.image} alt={el.name} />
                    <p>ID: {el.id}</p>
                    <p>Name: {el.name}</p>
                    <p>Life: {el.stats[hpIndex].base_stat}</p>
                    <p>Attack: {el.stats[attackIndex].base_stat}</p>
                    <p>Defense: {el.stats[defenseIndex].base_stat}</p>
                    <p>Speed: {el.stats[speedIndex].base_stat}</p>
                    <p>Height: {el.height}</p>
                    <p>Weight: {el.weight}</p>
                    <p>Types: {types.join(', ')}</p>
                  </div>
                )
              })}
            </div>
          )}
      </div>
    </div>
  );
}