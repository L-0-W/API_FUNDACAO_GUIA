import express from "express";
import { LoginController } from "../controller/LoginController";

export const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post("/", loginController.fazerLogin);
