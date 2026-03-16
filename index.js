import 'dotenv/config'
import express from 'express'
import * as db from './db.js';
import cors from 'cors'


const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors());

app.get("/", (req, res)=> {
    res.json({
        massage: "ola!"
    })
})

app.get("/func", async (req, res) => {
  const funcs = await db.listenFunc();
  res.json(funcs);
    
})

app.post("/func", async (req, res) => {
    await db.insereFunc(req.body);
    res.sendStatus(201);
})

app.patch("/func/:id", async (req, res) => {
    await db.alteraFunc(req.params.id, req.body);
    res.sendStatus(200);
})

app.listen(port);