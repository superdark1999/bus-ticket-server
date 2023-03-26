import { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8081;

const setup = (app) => {
  app.use(cors("*"));
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: false, limit: "50mb" }));
  // app.use(customLogger);
  // app.get("/", (req, res) => {
  //   res.sendFile(__dirname + "/index.html");
  // });
  // app.use(express.static(__dirname + "/public"));
  // app.use(errorHandler);
  return { PORT };
};

export default setup;
