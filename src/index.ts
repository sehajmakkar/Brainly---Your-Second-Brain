import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import { connectDB } from "./db";
connectDB();
import { userAuth } from "./middleware";

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


app.post("/api/v1/content", userAuth, async (req, res) => {

  try {

    const { title, link, type, tags } = req.body;

    if (!title || !link) {
      res.status(400).send("Fill title and link");
      return;
    }

    const content = await ContentModel.create({
      title,
      link,
      type,
      tags,
      // @ts-ignore
      userid: req.userid
    })

    res.status(200).json({
      success: true,
      message: "Content created",
      content
    })

  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e
    })

  }

});

app.get("/api/v1/content", userAuth, async (req, res) => {

  try {

    // @ts-ignore
    const userid = req.userid;
  
    // console.log(userid);

    // populate
    // suppose on the frontend you want to show the username of the user who created the content, so populating the user id with the username so both come along.
    const contents = await ContentModel.find({userid}).populate("userid", "username");

    // console.log(contents);
    if (!contents) {
      res.status(400).send("No contents found");
      return;
    }

    res.status(200).json({
      success: true,
      message: "Contents fetched",
      contents
    })

  } catch (e){
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e
    })
  }

});

app.delete("/api/v1/content", userAuth, async (req, res) => {
  try {

    const contentId = req.body.contentId;

    if (!contentId) {
      res.status(400).send("Content id missing");
      return;
    }

    // the person should own the content they want to delete
    await ContentModel.deleteMany({
      contentId,
      // @ts-ignore
      userid: req.userid
    })

  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Cant delete, something went wrong",
      error: e
    })
  }
});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
