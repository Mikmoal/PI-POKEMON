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
    include: [{
      model: Type,
      through: {
        attributes: [],
      },
    }]
  });
  

  const dbInfo = dbPokemons.map((e) => {
    const ptypes = e.dataValues.types.map((el) => el.dataValues.name)
    // console.log(ptypes);
    return {
      id: e.dataValues.id,
      name: e.dataValues.name,
      image: e.dataValues.image,
      life: e.dataValues.life,
      attack: e.dataValues.attack,
      defense: e.dataValues.defense,
      speed: e.dataValues.speed,
      height: e.dataValues.height,
      weight: e.dataValues.weight,
      types: ptypes
    };
  });

  return dbInfo;
};

const getAllPokemons = async () => {
  const dbPokemons = await getPokemonDbInfo();
  const apiPokemons = await getPokemonApiInfo();

  const allPokemons = dbPokemons.concat(apiPokemons);

  return allPokemons
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
  const newPokemon = (await Pokemon.create({
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  })).addType(types);
  // await newPokemon.addType(types);

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
