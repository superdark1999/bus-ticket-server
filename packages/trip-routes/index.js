import express from "express";
import connectMongoDB from "shared/lib/db/mongodb";
import setup from "shared/lib/setup";
import routes from "./routes";

const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  // connect and seed sample data
  connectMongoDB();

  // use when you want to seed data, dont remove
  //tripRoutesSeed();

  //await kafkaServer.connect();

  app.listen(PORT, () =>
    console.log(`tripRoute service listening on port ${PORT}!`)
  );
};

bootstrap();
