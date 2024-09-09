const express = require("express");
const router = express.Router();
const WalletController = require("../controller/wallet");

router.get("/:address", WalletController.getWallet);
router.get("/rank/:address", WalletController.getWalletRank);
router.post("/create", WalletController.create);
router.post("/addPoints", WalletController.addPoints);

module.exports = router;
