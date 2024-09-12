const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    address: { type: String, unique: true },
    points: Number,
    refCode: String,
});

const WalletModel = mongoose.model("Wallet", walletSchema);
module.exports = { WalletModel };
