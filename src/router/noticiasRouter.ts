import express, { Request, Response } from "express";
import { NoticiaisController } from "../controller/NoticiasController";

const noticiasController = new NoticiaisController();
export const noticiasRouter = express.Router();

noticiasRouter.get("/", noticiasController.buscarNoticias);
