const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
    address: { type: String, unique: true },
    reason: String,
    points: Number
});

const QuestModel = mongoose.model("Quest", questSchema);
module.exports = { QuestModel };
