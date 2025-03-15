import dotenv from "dotenv";
dotenv.config();
import { Request } from "express";
import cors from "cors";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { random } from "./utils";
import { connectDB } from "./db";
connectDB();
import { userAuth } from "./middleware";

const app = express();

app.use(express.json());
app.use(cors<Request>());

// all routes

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
  
    if (!username || !password) {
      res.status(400).send("Fields missing");
      return;
    }

    // check if user already exists
    const user = await UserModel.findOne({ username: username });
  
    if (user) {
      res.status(400).send("Choose another username");
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
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
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
      userid: req.userid,
    });

    res.status(200).json({
      success: true,
      message: "Content created",
      content,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e,
    });
  }
});

app.get("/api/v1/content", userAuth, async (req, res) => {
  try {
    // @ts-ignore
    const userid = req.userid;

    // console.log(userid);

    // populate
    // suppose on the frontend you want to show the username of the user who created the content, so populating the user id with the username so both come along.
    const contents = await ContentModel.find({ userid }).populate(
      "userid",
      "username"
    );

    // console.log(contents);
    if (!contents) {
      res.status(400).send("No contents found");
      return;
    }

    res.status(200).json({
      success: true,
      message: "Contents fetched",
      contents,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e,
    });
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
      userid: req.userid,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Cant delete, something went wrong",
      error: e,
    });
  }
});

// logic
// if the person sets share as true then only the share link is accessible otherwise its off.
// if the person sets it as true we will generate a shareUrl
app.post("/api/v1/brain/share", userAuth, async (req, res) => {
  try {
    const share = req.body.share;

    if (share) {
      // console.log(req.userid);

      // check if the share is already set
      const presentLink = await LinkModel.findOne({ 
        // @ts-ignore
        userid: req.userid 
      });

      if (presentLink) {
        res.status(200).json({
          success: true,
          message: "Link updated",
          link: "/share/" + presentLink.hash,
        });
        return;
      }

      const hash = random(16);
      const link = await LinkModel.create({
        hash: hash, // brain/share/hash
        // @ts-ignore
        userid: req.userid,
      });

      res.status(200).json({
        success: true,
        message: "Link updated",
        link: "/share/" + hash,
      });
      
    } else {
      await LinkModel.deleteOne({
        // @ts-ignore
        userid: req.userid,
      });

      res.status(200).json({
        success: true,
        message: "Link deleted",
        link: "",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "cant generate link, Something went wrong",
      error: e,
    });
  }
});

// access another person content / second brain
// brain/share/kjsbouwh9832h332
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
      res.status(400).send("Link not found");
      return;
    }

    // fetch content from that link -> userid
    const contents = await ContentModel.find({ userid: link.userid });

    if (!contents) {
      res.status(400).send("No contents found");
      return;
    }

    // username 
    const user = await UserModel.findById(link.userid);

    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    res.status(200).json({
      success: true,
      message: "Contents fetched",
      username: user.username,
      contents,
    });

  } catch (e) {
    res.status(500).json({  
      success: false, 
      message: "Something went wrong", 
      error: e 
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
