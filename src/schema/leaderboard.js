const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
    address: String,
    referrer: String,
});

const LeaderboardModel = mongoose.model("Leaderboard", leaderboardSchema);
module.exports = { LeaderboardModel };
