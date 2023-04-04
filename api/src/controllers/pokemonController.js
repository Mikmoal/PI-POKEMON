require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemonApiInfo = async () => {
  const apiPokemons = (
    await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
  ).data.results;

  const apiDetailed2 = [];

  for (let index = 0; index < apiPokemons.length; index++) {
    const pokemonDetailed = (await axios.get(apiPokemons[index].url)).data;
    
    const types = pokemonDetailed.types.map((el) => {
      return el.type.name;
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

    const pokemon = {
      id: pokemonDetailed.id,
      image: pokemonDetailed.sprites.other.home.front_default,
      name: pokemonDetailed.name,
      height: pokemonDetailed.height,
      weight: pokemonDetailed.weight,
      life: pokemonDetailed.stats[hpIndex].base_stat,
      attack: pokemonDetailed.stats[attackIndex].base_stat,
      defense: pokemonDetailed.stats[defenseIndex].base_stat,
      speed: pokemonDetailed.stats[speedIndex].base_stat,
      types: types,
    };
    apiDetailed2.push(pokemon);
  }

  return apiDetailed2;
};

const getPokemonDbInfo = async () => {
  const dbPokemons = await Pokemon.findAll({
    include: {
      attributes: ["name"],
      model: Type,
      through: {
        attributes: [],
      },
    },
  });

  const dbInfo = dbPokemons.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      life: e.life,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      height: e.height,
      weight: e.weight,
      types: e.types.map((el) => el.type.name).join(", "),
    };
  });

  return dbInfo;
};

const getAllPokemons = async () => {
  const dbPokemons = getPokemonDbInfo();
  const apiPokemons = getPokemonApiInfo();

  return apiPokemons;
};

const searchPokemonByName = async (name) => {
  const dbPokemons = await Pokemon.findAll({
    where: { name },
  });

  const apiPokemons = await getPokemonApiInfo();

  const filteredApi = apiPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteredApi, ...dbPokemons];
};

const getPokemonById = async (id, source) => {
  const pokemon =
    source === "db"
      ? await Pokemon.findByPk(id, {
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        })
      : (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
  return pokemon;
};

const createPokemonController = async (
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  });
  await newPokemon.addType(types);

  return newPokemon;
};

module.exports = {
  getPokemonApiInfo,
  getPokemonDbInfo,
  getAllPokemons,
  searchPokemonByName,
  getPokemonById,
  createPokemonController,
};
