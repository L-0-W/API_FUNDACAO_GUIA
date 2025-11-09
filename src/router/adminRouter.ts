import express from "express";
import { AdminController } from "../controller/AdminController";

export const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.delete("/exame/:id", adminController.deletarExamePorId);
adminRouter.post("/exame", adminController.criarExame);
