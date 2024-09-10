const { WalletModel } = require("../schema/wallet");

exports.getWallet = async function (req, res) {
    try {
        const address = req.params.address;
        const result = await WalletModel.findOne({ address }).select("-_id -__v");

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getWalletRank = async function (req, res) {
    try {
        const address = req.params.address;
        const result = await WalletModel.aggregate([
            {
                $sort: { points: -1 },
            },
            {
                $group: {
                    _id: null,
                    users: { $push: "$$ROOT" },
                },
            },
            {
                $unwind: {
                    path: "$users",
                    includeArrayIndex: "rank",
                },
            },
            {
                $project: {
                    _id: "$users._id",
                    address: "$users.address",
                    rank: { $add: ["$rank", 1] },
                },
            },
            {
                $match: { address: address },
            },
        ]);
        const rank = result.length ? result[0].rank : null;

        return res.status(200).json({
            rank,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!requestBody.address) {
            return res.status(400).json({ error: "Invalid request params" });
        }
        await WalletModel.findOneAndUpdate(
            { address: requestBody.address },
            { $setOnInsert: { points: 0 } },
            { upsert: true }
        );

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
        if (!requestBody.address || !requestBody.points) {
            return res.status(400).json({ error: "Invalid request params" });
        }
        await WalletModel.findOneAndUpdate({ address: requestBody.address }, { $inc: { points: requestBody.points } });

        return res.status(200).json({
            message: "Wallet updated.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
