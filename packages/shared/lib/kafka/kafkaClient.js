import { Kafka } from "kafkajs";
import { throwError as _throw, defer, mergeMap, Observable } from "rxjs";
import { kafkaUtils } from "shared/lib/kafka/kafkaUtils";
import { isNil, KafkaHeaders } from "shared/lib/kafka/utils";

const brokers = ["0.0.0.0:9092"];

export class KafkaClient {
  consumer = null;
  producer = null;
  utils = new kafkaUtils();
  routingMap = new Map();
  responsePatterns = [];

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
    if (this.initialized) {
      return this.initialized.then(() => this.producer);
    }

    this.initialized = new Promise(async (resolve, reject) => {
      try {
        await this.consumer.connect();
        await this.bindTopics();

        // this.producer = this.client.producer();
        await this.producer.connect();

        resolve();
      } catch (err) {
        reject(err);
      }
    });
    return this.initialized.then(() => this.producer);
  }

  async bindTopics() {
    if (!this.consumer) throw Error("Not consumer initialized");

    const subscribeTo = async (responsePattern) => {
      this.consumer.subscribe({
        topic: responsePattern,
      });
    };
    await Promise.all(this.responsePatterns.map(subscribeTo));

    await this.consumer.run({
      eachMessage: this.createResponseCallback(),
    });
  }

  subscribeOfMessage(message) {
    this.responsePatterns.push(this.getResponseMessage(message));
  }

  getResponseMessage(message) {
    return `${message}.reply`;
  }

  createResponseCallback() {
    return async (payload) => {
      const rawMessage = this.utils.parse(
        Object.assign(payload.message, {
          topic: payload.topic,
          partition: payload.partition,
        })
      );
      const { err, response, isDisposed, id } = await this.utils.deserialize(
        rawMessage
      );
      const callback = this.routingMap.get(id);
      if (!callback) {
        return;
      }
      if (err || isDisposed) {
        return callback({
          err,
          response,
          isDisposed,
        });
      }
      callback({
        err,
        response,
      });
    };
  }

  sendMessage(pattern, data) {
    if (isNil(pattern) || isNil(data)) {
      return _throw(
        () => new Error("pattern or data send message function error")
      );
    }

    return defer(async () => this.connect()).pipe(
      mergeMap(
        () =>
          new Observable((observer) => {
            const callback = this.createObserver(observer);
            return this.publish({ pattern, data }, callback);
          })
      )
    );
  }

  publish(partialPacket, callback) {
    const packet = this.assignPacketId(partialPacket);
    this.routingMap.set(packet.id, callback);

    const cleanup = () => this.routingMap.delete(packet.id);
    const errorCallback = (err) => {
      cleanup();
      callback({ err });
    };

    try {
      const pattern = this.normalizePattern(partialPacket.pattern);
      const replyTopic = this.getResponseMessage(pattern);

      Promise.resolve(this.utils.serialize(packet.data, { pattern }))
        .then((serializedPacket) => {
          serializedPacket.headers[KafkaHeaders.CORRELATION_ID] = packet.id;
          serializedPacket.headers[KafkaHeaders.REPLY_TOPIC] = replyTopic;
          // serializedPacket.headers[KafkaHeaders.REPLY_PARTITION] =
          //   replyPartition;

          const message = Object.assign({
            topic: pattern,
            messages: [serializedPacket],
          });

          return this.producer.send(message);
        })
        .catch((err) => errorCallback(err));

      return cleanup;
    } catch (err) {
      errorCallback(err);
    }
  }

  createObserver(observer) {
    return ({ err, response, isDisposed }) => {
      if (err) {
        return observer.error(err);
      } else if (response !== undefined && isDisposed) {
        observer.next(this.serializeResponse(response));
        return observer.complete();
      } else if (isDisposed) {
        return observer.complete();
      }
      observer.next(this.serializeResponse(response));
    };
  }

  messageSerializer(message) {
    return JSON.parse(message.value.toString());
  }

  serializeResponse(response) {
    return response;
  }
  normalizePattern(pattern) {
    return pattern;
  }

  assignPacketId(packet) {
    const id = this.utils.randomStringGenerator();
    return Object.assign(packet, { id });
  }

  async close() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}
