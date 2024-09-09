const express = require("express");
const router = express.Router();
const QuestController = require("../controller/quest");

router.post("/create", QuestController.create);

module.exports = router;
