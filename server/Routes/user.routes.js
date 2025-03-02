import express from "express";
import userAuth from "../Middleware/userAuth.js";
import jwt from "jsonwebtoken";
import { storage } from "../Middleware/Multer.js";
import multer from "multer";
import {
  userSignup,
  userMailVerification,
  userpasswordreset,
  userLogin,
  userRole,
  getData,
  profileUpdate,
} from "../Controllers/user.conntroller.js";
import { createJob } from "../Controllers/jobs.controller.js";
import asyncHandler from "../Utils/asyncHandler.js";

export const routes = express.Router();
const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });
//api endpoints for users===================

routes.post("/signup", asyncHandler(userSignup));
routes.get(
  "/mail-verification/:id/:emailtoken",
  asyncHandler(userMailVerification)
);
routes.post("/reset-password", asyncHandler(userpasswordreset));
routes.post("/login", asyncHandler(userLogin));
routes.post("/role", userAuth, asyncHandler(userRole));
routes.get("/getData", userAuth, asyncHandler(getData));
routes.post(
  "/profileUpdate",
  userAuth,
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  asyncHandler(profileUpdate)
);
routes.post("/createJob", userAuth, asyncHandler(createJob));
routes.post("/testing", (req, res) => {
  const token = jwt.sign({ email: "itsmedev03@gmail.com" }, "dev1234", {
    expiresIn: "1d",
  });
  res.set("Authorization", `Bearer ${token}`);
  res.send(`Auth set successfully`);
});
routes.post("/test", userAuth, (req, res) => {
  // const { email } = req.user;
  // res.send(`welcome${email}`);
  res.send("welcome");
});

// --------------------------------------

routes.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("file upload");
});
