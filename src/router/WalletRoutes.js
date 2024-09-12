const express = require("express");
const router = express.Router();
const WalletController = require("../controller/wallet");

router.get("/getAll", WalletController.getAllWallets);
router.get("/rank/:address", WalletController.getWalletRank);
router.get("/:address", WalletController.getWallet);
router.post("/create", WalletController.create);
router.post("/addPoints", WalletController.addPoints);

module.exports = router;
