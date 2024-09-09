require('dotenv').config();

const express = require("express");
const port = parseInt(process.env.PORT || "1998");
const tokenRouter = require("./router/TokenRoutes");

const app = express();

app.use(require("morgan")("combined"));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use('/tokens', tokenRouter);
app.listen(port, () => console.info("Server running on %d", port));
