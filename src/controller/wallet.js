const { WalletModel } = require("../schema/wallet");

exports.create = function (req, res) {
    try {
        const requestBody = req.body;
        if (!requestBody.address) {
            return res.status(400).json({ error: "Invalid request params" });
        }
        const walletData = new WalletModel({
            address: requestBody.address,
            points: 0,
        });

        walletData.save();

        return res.status(200).json({
            message: "Wallet created.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.addPoints = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!requestBody.address) {
            return res.status(400).json({ error: "Invalid request params" });
        }
        await WalletModel.findOneAndUpdate(
            { address: requestBody.address },
            { $inc: { points: requestBody.points } }
        );

        return res.status(200).json({
            message: "Wallet updated.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
