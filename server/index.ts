import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { db } from "./database";
const app = express();

app.use(express.json());
app.use(cors());
// send message
app.post("/message", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.send(400);
    const dataFromResponse = await db.query("insert into message (messages) values($1) returning *",
        [message]
    );
    if (!dataFromResponse.rows.length) return res.send(401);
    const dataFromMessage = dataFromResponse.rows
    res.send(dataFromMessage);
});

// reply data
app.get("/reply", async (req, res) => {
    const replyData = await db.query("select * from reply_message");
    if (!replyData.rows.length) return res.send(400);
    res.send(replyData.rows);
})

//from database message table
app.get("/showData", async (req, res) => {
    const fromData = await db.query("select messages from message");
    res.send(fromData.rows)
});

// users data
app.get("/userData", async (req, res) => {
    const fromData = await db.query("select * from users");
    res.send(fromData.rows)
})
// new users register
app.post("/userSendData", async (req, res) => {
    const { name, email, message } = req.body;
    const isVaild = name && email && message;
    if (!isVaild) return res.send(400)
    const responseData = await db.query("insert into users (name,email,message) values($1,$2,$3) returning *",
        [name, email, message]);
    if (!responseData.rows) return res.send(401);
    res.send(200);
});
// users login
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