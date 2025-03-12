import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "./db";
import jwt from "jsonwebtoken";

// typescript does not know your types
interface JwtPayload {
  userid: string;
}

// overwrite the types of the global REQUEST given by express according to your needs.

// interface CustomRequest extends Request {
//   user: any; // or you can specify the type of user, e.g. UserModel
// }

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const {userid} = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  if (!userid) {
    res.status(401).send("Unauthorized");
    return;
  }

  // decodedToken.userid
  const user = UserModel.findById(userid);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }

  // @ts-ignore
  req.userid = userid;

  next();
};
