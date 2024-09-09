const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
    address: String,
    reason: String,
    points: Number,
});

const QuestModel = mongoose.model("Quest", questSchema);
module.exports = { QuestModel };
