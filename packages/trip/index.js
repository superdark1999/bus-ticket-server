import express from "express";
import connectMongoDB from "shared/lib/db/mongodb";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";
import setup from "shared/lib/setup";

import { KafkaServer } from "shared/lib/kafka/kafkaServer";
import routes from "./routes";
import tripService from "./services/trip.service";
import tripSeed from "./utils/tripSeed";

//export const kafkaServer = new KafkaServer("trip-service", "trip-service");

// kafkaServer.addHandler(TRIP_TOPICS.TEMP_TOPICS, true, (data) => {
//   console.log("Get message with temp TEMP_TOPICS: ", data);
// });

// kafkaServer.addHandler(TRIP_TOPICS.GET_TRIP, false, async (data) => {
//   console.log("Get message with temp GET_TRIP: ", data);

//   const tripId = "6434150c132d883920ba9910";
//   const trip = await tripService.getTripById(tripId);
//   return trip;
// });

const app = express();

const bootstrap = async () => {
  const { PORT } = setup(app, routes);

  // connect db and seed data
  connectMongoDB();
  
  // use when you want to seed data, dont remove
  //tripSeed();

  //await kafkaServer.connect();

  app.listen(PORT, () =>
    console.log(`trip service listening on port ${PORT}!`)
  );
};

bootstrap();
