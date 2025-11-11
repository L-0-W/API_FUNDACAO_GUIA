import express from "express";
import { AdminController } from "../controller/AdminController";

export const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.delete("/exame/:id", adminController.deletarExamePorId);
adminRouter.post("/exame", adminController.criarExame);
adminRouter.patch("/exame/:id", adminController.patchExame);

adminRouter.delete("/vagas/:id", adminController.deletarVagasPorId);
adminRouter.post("/vagas", adminController.criarVaga);
adminRouter.patch("/vagas/:id", adminController.patchExame);
