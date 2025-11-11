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

adminRouter.delete("/noticias/:id", adminController.deletarNoticiaPorId);
adminRouter.post("/noticias/", adminController.criarNoticia);
adminRouter.patch("/noticias/:id", adminController.patchNoticia);

adminRouter.delete("/eventos/:id", adminController.deletarEventosPorId);
adminRouter.post("/eventos/", adminController.criarEvento);
adminRouter.patch("/eventos/:id", adminController.patchEvento);
