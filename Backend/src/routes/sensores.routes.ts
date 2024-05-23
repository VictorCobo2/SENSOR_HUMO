import { Router } from "express";
import {enviarAlertas} from "../controllers/sensores.controller";

export const sensores_routes = Router();

sensores_routes.get("/alerta/:sensor", enviarAlertas);
