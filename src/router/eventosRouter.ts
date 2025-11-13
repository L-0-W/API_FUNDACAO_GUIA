import express from "express";
import { EventosController } from "../controller/EventosController";

export const eventosRouter = express.Router();
const eventosController = new EventosController();

eventosRouter.get("/", eventosController.buscarTodosEventos);
eventosRouter.get("/filtrar", eventosController.buscarEventosPorQuery);
eventosRouter.get("/:id", eventosController.pegarEventoPorId);
