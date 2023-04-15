import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { KafkaClient } from "shared/lib/kafka/kafkaClient";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";

import routes from "./routes";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const app = express();

export const kafkaClient = new KafkaClient(
  "booking-service",
  "booking-service"
);

kafkaClient.subscribeOfMessage(TRIP_TOPICS.TEMP_TOPICS);
kafkaClient.subscribeOfMessage(TRIP_TOPICS.MESSAGE_TOPICS);

// server apollo
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
await server.start();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  connectMongoDB();

  await kafkaClient.connect();

  // use graphql with apollo server
  app.use("/graphql", expressMiddleware(server));

  // start server
  app.listen(PORT, () =>
    console.log(`Booking service listening on port ${PORT}!`)
  );
};

bootstrap();
