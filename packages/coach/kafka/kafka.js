import { Kafka } from "kafkajs";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";

const brokers = ["0.0.0.0:9092"];

const kafka = new Kafka({
  brokers,
  clientId: "coach-service",
});

export const consumer = kafka.consumer({
  groupId: "coach-service",
});

const producer = kafka.producer();

function messageCreatedHandler(data) {
  console.log("coach got a new message", JSON.stringify(data, null, 2));

  const message = "data send back";
  sendMessage(TRIP_TOPICS.TEMP_BACK_TOPICS, JSON.stringify(message));
}

const topicToSubscribe = {
  [TRIP_TOPICS.TEMP_TOPICS]: messageCreatedHandler,
};

export async function connectConsumer() {
  await consumer.connect();
  await producer.connect();

  for (const topic in TRIP_TOPICS) {
    await consumer.subscribe({
      topic: TRIP_TOPICS[topic],
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message || !message.value) {
        return;
      }

      const data = JSON.parse(message.value.toString());

      const handler = topicToSubscribe[topic];

      if (handler) {
        handler(data);
      }
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}

export async function sendMessage(topic, message) {
  return producer.send({
    topic,
    messages: [{ value: message }],
  });
}
