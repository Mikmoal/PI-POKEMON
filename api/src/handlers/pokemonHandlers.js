const {
    getAllPokemons,
    searchPokemonByName,
    getPokemonById,
    createPokemonController,
  } = require("../controllers/pokemonController");

const getByNamePokemon = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await searchPokemonByName(name)
      : await getAllPokemons();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByIdPokemon = async (req, res) => {
  const { id } = req.params;
  // console.log(typeof id);
  const source = (typeof id === "string") ? "api" : "db";
  try {
    const pokemon = await getPokemonById(id, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemon = async (req, res) => {
  try {
    const { name, image, life, attack, defense, speed, height, weight, types } =
      req.body;
    const newPokemon = await createPokemonController(
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getByNamePokemon,
    getByIdPokemon,
    createPokemon
}