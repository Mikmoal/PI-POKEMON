const { Router } = require('express');
const { getByNamePokemon, getByIdPokemon, createPokemon } = require("../handlers/pokemonHandlers");

const router = Router();

router.get("/", getByNamePokemon);
router.get("/:id", getByIdPokemon);
router.post("/", createPokemon);

module.exports = router;