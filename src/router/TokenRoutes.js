const express = require("express");
const router = express.Router();
const TokenController = require("../controller/token");

router.get("/:chainIdOrName", TokenController.getById);
router.get("/:chainIdOrName/:addressOrSymbol", TokenController.getBySymbol);

module.exports = router;
