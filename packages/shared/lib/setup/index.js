import { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8081;

const setup = (app, routes) => {
  app.use(cors("*"));
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: false, limit: "50mb" }));
  app.use(routes);

  return { PORT };
};

export default setup;
