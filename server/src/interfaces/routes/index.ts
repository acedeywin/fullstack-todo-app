import { Router } from "express";
import todoRoutes from "./TodoRoutes";

const routes = Router();

routes.use("/todo", todoRoutes);

export default routes;
