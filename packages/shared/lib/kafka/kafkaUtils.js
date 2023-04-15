import { isNil, isString, isObject, KafkaHeaders } from "./utils";

export class kafkaUtils {
  parse(data) {
    // Clone object to as modifying the original one would break KafkaJS retries
    const result = {
      ...data,
      headers: { ...data.headers },
    };

    if (!this.keepBinary) {
      result.value = this.decode(data.value);
    }

    if (!isNil(data.key)) {
      result.key = this.decode(data.key);
    }
    if (!isNil(data.headers)) {
      const decodeHeaderByKey = (key) => {
        result.headers[key] = this.decode(data.headers[key]);
      };
      Object.keys(data.headers).forEach(decodeHeaderByKey);
    } else {
      result.headers = {};
    }
    return result;
  }

  serialize(value) {
    const isNotKafkaMessage =
      isNil(value) ||
      !isObject(value) ||
      (!("key" in value) && !("value" in value));

    if (isNotKafkaMessage) {
      value = { value };
    }
    value.value = this.encode(value.value);
    if (!isNil(value.key)) {
      value.key = this.encode(value.key);
    }
    if (isNil(value.headers)) {
      value.headers = {};
    }
    return value;
  }

  deserialize(message, options) {
    const id = message.value.headers[KafkaHeaders.CORRELATION_ID]?.toString();
    // if (!isUndefined(message.headers[KafkaHeaders.NEST_ERR])) {
    //   return {
    //     id,
    //     err: message.headers[KafkaHeaders.NEST_ERR],
    //     isDisposed: true,
    //   };
    // }
    // if (!isUndefined(message.headers[KafkaHeaders.NEST_IS_DISPOSED])) {
    //   return {
    //     id,
    //     response: message.value,
    //     isDisposed: true,
    //   };
    // }
    return {
      id,
      response: message.value.value,
      isDisposed: false,
    };
  }

  encode(value) {
    // const isObjectOrArray = !isNil(value) && !isString(value);

    // if (isObjectOrArray) {
    //   return isPlainObject(value) || Array.isArray(value)
    //     ? JSON.stringify(value)
    //     : value.toString();
    // } else if (isUndefined(value)) {
    //   return null;
    // }
    return value;
  }

  decode(value) {
    if (isNil(value)) {
      return null;
    }
    // A value with the "leading zero byte" indicates the schema payload.
    // The "content" is possibly binary and should not be touched & parsed.
    if (value.length > 0 && value.readUInt8(0) === 0) {
      return value;
    }

    let result = value.toString();
    const startChar = result.charAt(0);

    // only try to parse objects and arrays
    if (startChar === "{" || startChar === "[") {
      try {
        result = JSON.parse(value.toString());
      } catch (e) {}
    }
    return result;
  }

  randomStringGenerator(length = 5) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
