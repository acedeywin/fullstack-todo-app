import { Router } from "express";
import todoRoutes from "./TodoRoutes";

const routes = Router();

routes.use("/todos", todoRoutes);

export default routes;
