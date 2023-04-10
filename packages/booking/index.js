import express from "express";
import setup from "shared/lib/setup";
import connectMongoDB from "shared/lib/db/mongodb";
import { connectConsumer } from "./kafka/kafka";

import routes from "./routes";
import seed from "./utils/seed";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const app = express();

// server apollo
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
await server.start();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  connectMongoDB();

  // seed data for database
  seed();

  //connectConsumer();

  // use graphql with apollo server
  app.use("/graphql", expressMiddleware(server));

  // start server
  app.listen(PORT, () => console.log(`Booking service listening on port ${PORT}!`));
};

bootstrap();
