const express = require("express");
const router = express.Router();
const LeaderboardController = require("../controller/leaderboard");

router.get("/getRefferedCount/:address", LeaderboardController.getRefferedCount);
router.get("/getVerifiedCount/:address", LeaderboardController.getVerifiedCount);
router.get("/getAllLists", LeaderboardController.getAllLists);

module.exports = router;
