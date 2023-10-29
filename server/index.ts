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
app.post("/login", async (req, res) => {
    const { name, email, message } = req.body;
    const isVaild = name && email && message;
    console.log("name:", name, " message:", message);
    if (!isVaild) return res.send(400)
    await db.query("insert into users (name,email,message) values($1,$2,$3)",
        [name, email, message]);
    res.send(200);
})

app.listen(process.env.PROP, () => {
    console.log("Server started on port 5000")
});