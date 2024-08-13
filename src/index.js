const express = require("express");
const port = parseInt(process.env.PORT || "1998");
const router = require("./router");

const app = express();

app.use(require("morgan")("combined"));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(router);
app.listen(port, () => console.info("Server running on %d", port));
