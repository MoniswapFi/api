const express = require("express");
const port = parseInt(process.env.PORT || "1998");

const app = express();

app.listen(port, () => console.info("Server running on %d", port));
