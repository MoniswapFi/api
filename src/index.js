require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const tokensRouter = require("./router/TokenRoutes");
const walletRouter = require("./router/WalletRoutes");

const port = parseInt(process.env.PORT || "1998");
const dbURI = process.env.MONGODB_URL;

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

try {
    mongoose.connect(dbURI);
    app.listen(port, () => console.info("Server running on %d", port));
} catch (error) {
    console.log("Can't connect MongoDB. Check connection string again!");
}
