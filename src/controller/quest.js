const { LeaderboardModel } = require("../schema/leaderboard");
const { QuestModel } = require("../schema/quest");
const { WalletModel } = require("../schema/wallet");

exports.getLists = async function (req, res) {
    try {
        const address = req.params.address;

        const result = await QuestModel.find({ address }).select("-_id -__v");
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!requestBody.address || !requestBody.reason || !requestBody.points) {
            return res.status(400).json({ error: "Invalid request params" });
        }

        const result = await QuestModel.findOneAndUpdate(
            { address: requestBody.address, reason: requestBody.reason },
            {
                address: requestBody.address,
                reason: requestBody.reason,
                points: requestBody.points,
            },
            { upsert: true, includeResultMetadata: true }
        );

        const count = await QuestModel.countDocuments({ address: requestBody.address });
        if (count === 23 && result && !result.value) {
            const wallet = await WalletModel.findOne(
                {
                    address: requestBody.address,
                },
                "referrer"
            );

            if (wallet && wallet.referrer) {
                await LeaderboardModel.findOneAndUpdate(
                    { address: requestBody.address, referrer: wallet.referrer },
                    {
                        address: requestBody.address,
                        referrer: wallet.referrer,
                    },
                    { upsert: true }
                );

                const result = await LeaderboardModel.countDocuments({ referrer: wallet.referrer });
                if (result === 1) {
                    await WalletModel.findOneAndUpdate({ address: wallet.referrer }, { $inc: { points: 200 } });
                } else if (result > 1) {
                    await WalletModel.findOneAndUpdate({ address: wallet.referrer }, { $inc: { points: 400 } });
                }
            }
        }

        return res.status(200).json({
            message: "Quest created.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
