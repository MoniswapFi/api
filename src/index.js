require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const tokensRouter = require("./router/TokenRoutes");
const walletRouter = require("./router/WalletRoutes");
const questRouter = require("./router/QuestRoutes");
const leaderboardRouter = require("./router/LeaderboardRoutes");

const port = parseInt(process.env.PORT || "1998");
const dbURI = process.env.MONGODB_URL || "mongodb://db:27017/__moniswap__";

const app = express();
app.use(bodyParser.json());
app.use(require("morgan")("combined"));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/tokens", tokensRouter);
app.use("/wallet", walletRouter);
app.use("/quest", questRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, () => {
    console.info("Server running on %d", port);
    mongoose
        .connect(dbURI)
        .then(() => console.info("Mongoose connected"))
        .catch(console.debug);
});
