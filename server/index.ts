import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { db } from "./database";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is runing.");
});
app.post("/userSendData", async (req, res) => {
    const { name, email, message } = req.body;
    const isVaild = name && email && message;
    console.log("name:", name, " message:", message);
    if (!isVaild) return res.send(400)
    const responseData = await db.query("insert into users (name,email,message) values($1,$2,$3) returning *",
        [name, email, message]);
    console.log("responseData :", responseData.rows);
    if (!responseData.rows) return res.send(401);
    res.send(200);
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const isVaild = email && password;
    if (!isVaild) return res.send(400);
    const EmailTag = await db.query(`select * from loginusers where email=$1 `, [email]);
    if (!EmailTag.rows.length) return res.send(401);
    const checkedEmail = EmailTag.rows;
    const hasPassword = checkedEmail.filter(item => item.password === password);
    if (!hasPassword) return res.send(402);
    console.log("seccfully");

    res.send(200);
})

app.listen(5000, () => {
    console.log("Server started on port 5000")
});