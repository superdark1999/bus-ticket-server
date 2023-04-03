import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";
import { connectConsumer } from "./kafka/kafka";

import routes from "./routes";
import seed from "./utils/seed";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './utils/schema';

const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  connectMongoDB();
  
  // seed data for database
  seed();

  //connectConsumer();

  // use graphql
  app.all('/graphql', createHandler({ schema }));

  // start server
  app.listen(PORT, () =>
    console.log(`Booking service listening on port ${PORT}!`)
  );
};

bootstrap();
