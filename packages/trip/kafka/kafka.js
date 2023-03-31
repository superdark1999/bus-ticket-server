import { Kafka } from "kafkajs";
import { ADMIN_TOPICS } from "shared/lib/kafka/topic";

const brokers = ["0.0.0.0:9092"];

const kafka = new Kafka({
  brokers,
  clientId: "admin-service",
});

export const consumer = kafka.consumer({
  groupId: "admin-service",
});

const producer = kafka.producer();

function messageCreatedHandler(data) {
  console.log("admin Got a new message", JSON.stringify(data, null, 2));

  const message = "data send back";
  sendMessage(ADMIN_TOPICS.TEMP_BACK_TOPICS, JSON.stringify(message));
}

const topicToSubscribe = {
  [ADMIN_TOPICS.TEMP_TOPICS]: messageCreatedHandler,
};

export async function connectConsumer() {
  await consumer.connect();
  await producer.connect();

  for (const topic in ADMIN_TOPICS) {
    await consumer.subscribe({
      topic: ADMIN_TOPICS[topic],
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
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
