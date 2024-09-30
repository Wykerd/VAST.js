// @ts-nocheck
import {
  Type as PubSubMessage,
  encodeJson as encodeJson_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  decodeBinary as decodeBinary_1,
} from "./PubSubMessage.js";
import {
  Type as Subscribe,
  encodeJson as encodeJson_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  decodeBinary as decodeBinary_2,
} from "./Subscribe.js";
import {
  Type as Vec2d,
  encodeJson as encodeJson_3,
  decodeJson as decodeJson_3,
  encodeBinary as encodeBinary_3,
  decodeBinary as decodeBinary_3,
} from "./Vec2d.js";
import {
  tsValueToJsonValueFns,
  jsonValueToTsValueFns,
} from "../runtime/json/scalar.js";
import {
  WireMessage,
  WireType,
  Field,
} from "../runtime/wire/index.js";
import {
  default as serialize,
} from "../runtime/wire/serialize.js";
import {
  tsValueToWireValueFns,
  wireValueToTsValueFns,
} from "../runtime/wire/scalar.js";
import {
  default as deserialize,
} from "../runtime/wire/deserialize.js";

export declare namespace $ {
  export type VASTClientMessage = {
    message?: (
      | { field: "publish", value: PubSubMessage }
      | { field: "subscribe", value: Subscribe }
      | { field: "unsubscribe", value: string }
      | { field: "move", value: Vec2d }
  );
  }
}

export type Type = $.VASTClientMessage;

export function getDefaultValue(): $.VASTClientMessage {
  return {
    message: undefined,
  };
}

export function createValue(partialValue: Partial<$.VASTClientMessage>): $.VASTClientMessage {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.VASTClientMessage): unknown {
  const result: any = {};
  switch (value.message?.field) {
    case "publish": {
      result.publish = encodeJson_1(value.message.value);
      break;
    }
    case "subscribe": {
      result.subscribe = encodeJson_2(value.message.value);
      break;
    }
    case "unsubscribe": {
      result.unsubscribe = tsValueToJsonValueFns.string(value.message.value);
      break;
    }
    case "move": {
      result.move = encodeJson_3(value.message.value);
      break;
    }
  }
  return result;
}

export function decodeJson(value: any): $.VASTClientMessage {
  const result = getDefaultValue();
  if (value.publish !== undefined) result.message = {field: "publish", value: decodeJson_1(value.publish)};
  if (value.subscribe !== undefined) result.message = {field: "subscribe", value: decodeJson_2(value.subscribe)};
  if (value.unsubscribe !== undefined) result.message = {field: "unsubscribe", value: jsonValueToTsValueFns.string(value.unsubscribe)};
  if (value.move !== undefined) result.message = {field: "move", value: decodeJson_3(value.move)};
  return result;
}

export function encodeBinary(value: $.VASTClientMessage): Uint8Array {
  const result: WireMessage = [];
  switch (value.message?.field) {
    case "publish": {
      const tsValue = value.message.value;
      result.push(
        [1, { type: WireType.LengthDelimited as const, value: encodeBinary_1(tsValue) }],
      );
      break;
    }
    case "subscribe": {
      const tsValue = value.message.value;
      result.push(
        [2, { type: WireType.LengthDelimited as const, value: encodeBinary_2(tsValue) }],
      );
      break;
    }
    case "unsubscribe": {
      const tsValue = value.message.value;
      result.push(
        [3, tsValueToWireValueFns.string(tsValue)],
      );
      break;
    }
    case "move": {
      const tsValue = value.message.value;
      result.push(
        [4, { type: WireType.LengthDelimited as const, value: encodeBinary_3(tsValue) }],
      );
      break;
    }
  }
  return serialize(result);
}

const oneofFieldNumbersMap: { [oneof: string]: Set<number> } = {
  message: new Set([1, 2, 3, 4]),
};

const oneofFieldNamesMap = {
  message: new Map([
    [1, "publish" as const],
    [2, "subscribe" as const],
    [3, "unsubscribe" as const],
    [4, "move" as const],
  ]),
};

export function decodeBinary(binary: Uint8Array): $.VASTClientMessage {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  const wireFieldNumbers = Array.from(wireFields.keys()).reverse();
  oneof: {
    const oneofFieldNumbers = oneofFieldNumbersMap.message;
    const oneofFieldNames = oneofFieldNamesMap.message;
    const fieldNumber = wireFieldNumbers.find(v => oneofFieldNumbers.has(v));
    if (fieldNumber == null) break oneof;
    const wireValue = wireFields.get(fieldNumber);
    const wireValueToTsValueMap = {
      [1](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_1(wireValue.value) : undefined; },
      [2](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_2(wireValue.value) : undefined; },
      [3](wireValue: Field) { return wireValueToTsValueFns.string(wireValue); },
      [4](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_3(wireValue.value) : undefined; },
    };
    const value = (wireValueToTsValueMap[fieldNumber as keyof typeof wireValueToTsValueMap] as any)?.(wireValue!);
    if (value === undefined) break oneof;
    result.message = { field: oneofFieldNames.get(fieldNumber)!, value: value as any };
  }
  return result;
}
