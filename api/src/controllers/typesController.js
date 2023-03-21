require("dotenv").config();
const { Type } = require("../db");
const axios = require("axios");

const getTypesController = async () => {
  // Primero busca la info en la DB
  const dbInfo = await Type.findAll();

  //Si no hay datos, trae la info de la api y guarda en la DB
  if (!dbInfo.length) {
    const apiData = await axios.get(`https://pokeapi.co/api/v2/type`);

    const types = apiData.data.results.map((t) => t.name); //array de names de types ["normal","fire"]

    types
      .filter((t) => t !== "")
      .forEach((el) => {
        let i = el.trim();
        Type.findOrCreate({
          where: { name: i },
        });
      });
  }

  return await Type.findAll();
};

module.exports = { getTypesController };
