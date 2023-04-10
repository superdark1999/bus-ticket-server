import { Kafka } from "kafkajs";
import { Observable, firstValueFrom } from "rxjs";
import { TRIP_TOPICS } from "shared/lib/kafka/topic";

const brokers = ["34.100.139.23:9092"];

const kafka = new Kafka({
  brokers,
  clientId: "booking-service",
});

export const consumer = kafka.consumer({
  groupId: "booking-service",
});

export const producer = kafka.producer();

let observable = new Observable();

function messageCreatedHandler(data) {
  // observable = new Observable((observer) => {
  //   console.log(observer);
  //   observer.next(observer);
  //   observer.complete();
  // });

  console.log("booking got a message", JSON.stringify(data, null, 2));
}

const topicToSubscribe = {
  [TRIP_TOPICS.TEMP_BACK_TOPICS]: messageCreatedHandler,
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
  producer.send({
    topic,
    messages: [{ value: message }],
  });

  // const value = await firstValueFrom(observable);
  // return value;
}
