const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());
server.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
server.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});