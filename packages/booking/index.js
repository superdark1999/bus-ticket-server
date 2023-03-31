import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";
// import { connectConsumer } from "./kafka/kafka";

import routes from "./routes";

const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  connectMongoDB();

  // connectConsumer();
  // await connectProducer();

  app.listen(PORT, () =>
    console.log(`Booking service listening on port ${PORT}!`)
  );
};

bootstrap();
