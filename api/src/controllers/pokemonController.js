require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemonApiInfo = async () => {
  const apiPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const apiInfo = await apiPokemons.data.results;
 
  return apiInfo;
};

const getPokemonDbInfo = async () => {
  const dbPokemons = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
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

  return [...dbPokemons, ...apiPokemons];
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
  })
  await newPokemon.addType(types)

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
