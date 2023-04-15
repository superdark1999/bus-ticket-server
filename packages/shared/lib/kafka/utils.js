export const KafkaHeaders = {
  REPLY_TOPIC: "kafka_replyTopic",
  CORRELATION_ID: "kafka_correlationId",
  REPLY_PARTITION: "kafka_replyPartition",
};

export const isUndefined = (obj) => typeof obj === "undefined";

export const isNil = (val) => isUndefined(val) || val === null;

export const isObject = (fn) => !isNil(fn) && typeof fn === "object";

export const isString = (val) => typeof val === "string";
