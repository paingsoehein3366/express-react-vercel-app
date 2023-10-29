const { json } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runing.");
});
app.post("/login", (req, res) => {
    const data = [
        { name: "paing", email: "paing@email.com", password: "paing" },
        { name: "soe", email: "soe@email.com", password: "soe" },
        { name: "heing", email: "heing@email.com", password: "heing" },
    ];
    const { name, price } = req.body;
    const isVaild = name && price;
    console.log("name:", name, " price:", price);
    if (!isVaild) return res.send(400).sendStatus("not data");
    console.log("EmailTag", EmailTag);
    res.send(req.body);
})

app.listen(process.env.PORT, console.log("Server started on port 5000"));