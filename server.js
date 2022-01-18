import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import {handleSignin} from "./controllers/signin.js";
import { handleRegister } from "./controllers/register.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "smarty",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send('success');
});

app.post("/signin", (req,res) => {
  handleSignin(req,res,db,bcrypt);
});

app.post('/register', (req,res) => {
  handleRegister(req,res,db,bcrypt);
});

app.get("/profile/:id", (req,res) => {
  handleProfileGet(req,res,db);
});

app.put("/image", (req,res) => {
  handleImage(req,res,db);
});

app.post("/imageurl", (req,res) => {
  handleApiCall(req,res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
