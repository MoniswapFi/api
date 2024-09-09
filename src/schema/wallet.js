const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    address: String,
    points: Number,
});

const WalletModel = mongoose.model("Wallet", walletSchema);
module.exports = { WalletModel };
