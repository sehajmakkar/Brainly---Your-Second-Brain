import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";
import { connectDB } from "./db";
connectDB();

const app = express();

app.use(express.json());

// all routes

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Fields missing");
    return;
  }

  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // create user
  await UserModel.create({
    username: username,
    password: hashPassword,
  });

  res.status(200).send("User created");
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Fields missing");
    return;
  }

  const user = await UserModel.findOne({ username: username });

  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  // verify password
  // user.password did not work when i forgot to put await to find the user.
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).send("Incorrect Credentials");
    return;
  }

  // generate token

  // env variables are causing some issues if directly imported from dotenv, need to import them as string which does not occur in JS

  const token = jwt.sign(
    { userid: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    token,
    success: true,
    message: "Login successful",
  });
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
