const { json } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runing.");
});
app.get("/login", (req, res) => {
    const data = [
        { name: "paing", email: "paing@email.com", password: "paing" },
        { name: "soe", email: "soe@email.com", password: "soe" },
        { name: "heing", email: "heing@email.com", password: "heing" },
    ];
    const { email, password } = req.body;
    const isVaild = email && password;
    console.log("email:", email, " password:", password);
    if (!isVaild) return res.send(400).sendStatus("no data");
    const EmailTag = data.map(item => item.email);
    console.log("EmailTag", EmailTag);
    res.send("login");
})

app.listen(5000, console.log("Server started on port 5000"));