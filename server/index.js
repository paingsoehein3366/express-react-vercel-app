const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
    res.send("Server is runing.");
});

app.listen(5000, console.log("Server started on port 5000"));