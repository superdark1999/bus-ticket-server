import { Kafka } from "kafkajs";
import { kafkaUtils } from "shared/lib/kafka/kafkaUtils";
import { KafkaHeaders } from "shared/lib/kafka/utils";

const brokers = ["0.0.0.0:9092"];

export class KafkaServer {
  consumer = null;
  producer = null;
  utils = new kafkaUtils();

  messageHandlers = new Map();

  constructor(groupId, clientId) {
    const kafka = new Kafka({
      brokers,
      clientId,
    });

    this.consumer = kafka.consumer({
      groupId,
    });

    this.producer = kafka.producer();
  }

  async connect() {
    await this.consumer.connect();
    await this.producer.connect();

    await this.bindEvents(this.consumer);
  }

  async bindEvents(consumer) {
    const registeredPatterns = [...this.messageHandlers.keys()];
    const subscribeToPattern = async (pattern) =>
      consumer.subscribe({
        topic: pattern,
      });
    await Promise.all(registeredPatterns.map(subscribeToPattern));

    const consumerRunOptions = {
      eachMessage: this.getMessageHandler(),
    };
    await consumer.run(consumerRunOptions);
  }

  addHandler(message, isEvent, callback) {
    const handler = {
      isEvent,
      callback,
    };
    this.messageHandlers.set(message, handler);
  }

  getMessageHandler() {
    return async ({ topic, message }) => {
      const handler = this.getHandlerByPattern(topic);
      const data = JSON.parse(message.value.toString());
      const rawMessage = this.utils.parse(
        Object.assign(message, {
          topic: topic,
        })
      );

      const headers = rawMessage.headers;

      const correlationId = headers[KafkaHeaders.CORRELATION_ID];

      if (handler.isEvent) return handler.callback(data);

      const response = await handler.callback(data);

      this.sendMessage(response, this.getResponseTopic(topic), correlationId);
    };
  }

  getHandlerByPattern(topic) {
    return this.messageHandlers.has(topic)
      ? this.messageHandlers.get(topic)
      : null;
  }

  async sendMessage(
    message,
    replyTopic,
    // replyPartition: string,
    correlationId
  ) {
    const outgoingMessage = this.utils.serialize(message);

    this.assignCorrelationIdHeader(correlationId, outgoingMessage);

    const replyMessage = {
      topic: replyTopic,
      messages: [{ value: JSON.stringify(outgoingMessage) }],
    };

    return this.producer.send(replyMessage);
  }

  assignCorrelationIdHeader(correlationId, outgoingMessage) {
    outgoingMessage.headers[KafkaHeaders.CORRELATION_ID] = correlationId;
  }

  serializer(response) {
    return JSON.parse(response);
  }

  messageSerializer(message) {
    return JSON.parse(message.value.toString());
  }

  getResponseTopic(message) {
    return `${message}.reply`;
  }

  async close() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}
