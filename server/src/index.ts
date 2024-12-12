import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const APP_PORT = process.env.PORT;

app.listen(APP_PORT, () => {
  console.log(`Server is running on PORT ${APP_PORT}`);
});
