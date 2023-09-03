import express from "express";
import {
  createEntity,
  getAllEntityEmail,
  getOneEntity,
} from "../DB/db-utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userrouter = express.Router();

userrouter.post("/register", async (req, res) => {
  const obj = req.body;
  const check = await getAllEntityEmail("users", obj.email);
  console.log(obj, "chk", check);
  console.log(check[0]?.email);
  if (check[0]?.email !== undefined) {
    res.send({ msg: "Email already exists" });
  } else {
    await bcrypt.hash(obj.password, 10, async (err, hash) => {
      console.log(hash);
      obj.password = hash;
      const responses = await createEntity("users", obj);
      if (responses.acknowledged == true) {
        res.send({ msg: "Inserted Successfully" });
      } else {
        res.send({ msg: "Error During insertion" });
      }

      // if (err) {
      //   res.send({ msg: err });
      // }
    });
  }
});

userrouter.post("/login", async (req, res) => {
  const dataObj = req.body;
  const dbUser = await getOneEntity("users", dataObj.email);
  if (dbUser === null) {
    res.send({ msg: "User doesnt exist" });
  } else {
    await bcrypt.compare(
      dataObj.password,
      dbUser.password,
      async (err, result) => {
        let userToken = "";
        if (result) {
          delete dataObj.password;
          await jwt.sign(
            { ...dataObj },
            process.env.JWT_SECRET,
            (err, token) => {
              userToken = token;
            }
          );
          console.log(userToken);
          delete dbUser.password;
          res.send({ ...dbUser, accesstoken: userToken, msg: "Success" });
        } else {
          res.send({ msg: "Invalid Credentials", error: err });
        }
      }
    );
  }
});

export default userrouter;
