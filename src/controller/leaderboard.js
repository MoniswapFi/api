const { LeaderboardModel } = require("../schema/leaderboard");
const { WalletModel } = require("../schema/wallet");

exports.getRefferedCount = async function (req, res) {
    try {
        const address = req.params.address;

        const result = await WalletModel.countDocuments({ referrer: address });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getVerifiedCount = async function (req, res) {
    try {
        const address = req.params.address;

        const result = await LeaderboardModel.countDocuments({ referrer: address });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllLists = async function (req, res) {
    try {
        const wallets = await WalletModel.find({}).select("-_id -__v").sort("-points");

        const results = await Promise.all(
            wallets.map(async (wallet) => {
                const leaderboardCount = await LeaderboardModel.countDocuments({ referrer: wallet.address });
                return {
                    ...wallet.toObject(),
                    leaderboardCount: leaderboardCount,
                };
            })
        );

        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
