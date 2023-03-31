import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";
import routes from "./routes";
import { connectConsumer } from "./kafka/kafka";

const app = express();

const bootstrap = () => {
  const { PORT } = setup(app, routes);

  connectMongoDB();
  // connectConsumer();

  app.listen(PORT, () =>
    console.log(`Admin service listening on port ${PORT}!`)
  );
};

bootstrap();
