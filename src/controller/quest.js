const { QuestModel } = require("../schema/quest");

exports.create = function (req, res) {
    try {
        const requestBody = req.body;
        if (!requestBody.address || !requestBody.reason || !requestBody.points) {
            return res.status(400).json({ error: "Invalid request params" });
        }
        const questData = new QuestModel({
            address: requestBody.address,
            reason: requestBody.reason,
            points: requestBody.points,
        });

        questData.save();

        return res.status(200).json({
            message: "Quest created.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
