const { Router } = require('express');
const { getTypes } = require("../handlers/typesHandler");

const router = Router();

router.get("/", getTypes);

module.exports = router;