const express = require("express");
const router = express.Router();
const WalletController = require("../controller/wallet");

router.post("/create", WalletController.create);

module.exports = router;
