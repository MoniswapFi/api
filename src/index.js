const express = require("express");
const port = parseInt(process.env.PORT || "1998");
const router = require("./router");

const app = express();

app.use(router);
app.listen(port, () => console.info("Server running on %d", port));
