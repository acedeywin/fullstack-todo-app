import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "./shared/helpers/ErrorHandler";
import routes from "./interfaces/routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL }));

// Software accessibility test
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Todo App!" });
  return;
});

//Expose routes
app.use("/api/v1", routes);

app.use(errorHandler);

export default app;
