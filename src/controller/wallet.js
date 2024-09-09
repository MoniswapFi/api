const { WalletModel } = require("../schema/wallet");

exports.create = function (req, res) {
    try {
        const requestBody = req.body;
        console.log(requestBody)
        const walletData = new WalletModel({
            address: requestBody.address,
            points: 0,
        });

        console.log(walletData)

        walletData.save();

        return res.status(200).json({
            message: "Wallet created.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
