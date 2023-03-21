require("dotenv").config();
const { getTypesController } = require("../controllers/typesController");

const getTypes = async (req, res) => {
  try {
    const allTypes = await getTypesController();
    res.status(201).json(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypes };
