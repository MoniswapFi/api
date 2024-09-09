const { QuestModel } = require("../schema/quest");

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

        await QuestModel.findOneAndUpdate(
            { address: requestBody.address, reason: requestBody.reason },
            {
                address: requestBody.address,
                reason: requestBody.reason,
                points: requestBody.points,
            },
            { upsert: true }
        );

        return res.status(200).json({
            message: "Quest created.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
