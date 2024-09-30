// @ts-nocheck
import {
  Type as PubSubMessage,
  encodeJson as encodeJson_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  decodeBinary as decodeBinary_1,
} from "./PubSubMessage.js";
import {
  Type as MatcherInfo,
  encodeJson as encodeJson_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  decodeBinary as decodeBinary_2,
} from "./MatcherInfo.js";
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
  export type VASTServerMessage = {
    message?: (
      | { field: "publication", value: PubSubMessage }
      | { field: "confirmMatcher", value: MatcherInfo }
      | { field: "assignMatcher", value: MatcherInfo }
      | { field: "unsubscribeResponse", value: string }
      | { field: "subscribeResponse", value: string }
  );
  }
}

export type Type = $.VASTServerMessage;

export function getDefaultValue(): $.VASTServerMessage {
  return {
    message: undefined,
  };
}

export function createValue(partialValue: Partial<$.VASTServerMessage>): $.VASTServerMessage {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.VASTServerMessage): unknown {
  const result: any = {};
  switch (value.message?.field) {
    case "publication": {
      result.publication = encodeJson_1(value.message.value);
      break;
    }
    case "confirmMatcher": {
      result.confirmMatcher = encodeJson_2(value.message.value);
      break;
    }
    case "assignMatcher": {
      result.assignMatcher = encodeJson_2(value.message.value);
      break;
    }
    case "unsubscribeResponse": {
      result.unsubscribeResponse = tsValueToJsonValueFns.string(value.message.value);
      break;
    }
    case "subscribeResponse": {
      result.subscribeResponse = tsValueToJsonValueFns.string(value.message.value);
      break;
    }
  }
  return result;
}

export function decodeJson(value: any): $.VASTServerMessage {
  const result = getDefaultValue();
  if (value.publication !== undefined) result.message = {field: "publication", value: decodeJson_1(value.publication)};
  if (value.confirmMatcher !== undefined) result.message = {field: "confirmMatcher", value: decodeJson_2(value.confirmMatcher)};
  if (value.assignMatcher !== undefined) result.message = {field: "assignMatcher", value: decodeJson_2(value.assignMatcher)};
  if (value.unsubscribeResponse !== undefined) result.message = {field: "unsubscribeResponse", value: jsonValueToTsValueFns.string(value.unsubscribeResponse)};
  if (value.subscribeResponse !== undefined) result.message = {field: "subscribeResponse", value: jsonValueToTsValueFns.string(value.subscribeResponse)};
  return result;
}

export function encodeBinary(value: $.VASTServerMessage): Uint8Array {
  const result: WireMessage = [];
  switch (value.message?.field) {
    case "publication": {
      const tsValue = value.message.value;
      result.push(
        [1, { type: WireType.LengthDelimited as const, value: encodeBinary_1(tsValue) }],
      );
      break;
    }
    case "confirmMatcher": {
      const tsValue = value.message.value;
      result.push(
        [2, { type: WireType.LengthDelimited as const, value: encodeBinary_2(tsValue) }],
      );
      break;
    }
    case "assignMatcher": {
      const tsValue = value.message.value;
      result.push(
        [3, { type: WireType.LengthDelimited as const, value: encodeBinary_2(tsValue) }],
      );
      break;
    }
    case "unsubscribeResponse": {
      const tsValue = value.message.value;
      result.push(
        [4, tsValueToWireValueFns.string(tsValue)],
      );
      break;
    }
    case "subscribeResponse": {
      const tsValue = value.message.value;
      result.push(
        [5, tsValueToWireValueFns.string(tsValue)],
      );
      break;
    }
  }
  return serialize(result);
}

const oneofFieldNumbersMap: { [oneof: string]: Set<number> } = {
  message: new Set([1, 2, 3, 4, 5]),
};

const oneofFieldNamesMap = {
  message: new Map([
    [1, "publication" as const],
    [2, "confirmMatcher" as const],
    [3, "assignMatcher" as const],
    [4, "unsubscribeResponse" as const],
    [5, "subscribeResponse" as const],
  ]),
};

export function decodeBinary(binary: Uint8Array): $.VASTServerMessage {
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
      [3](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_2(wireValue.value) : undefined; },
      [4](wireValue: Field) { return wireValueToTsValueFns.string(wireValue); },
      [5](wireValue: Field) { return wireValueToTsValueFns.string(wireValue); },
    };
    const value = (wireValueToTsValueMap[fieldNumber as keyof typeof wireValueToTsValueMap] as any)?.(wireValue!);
    if (value === undefined) break oneof;
    result.message = { field: oneofFieldNames.get(fieldNumber)!, value: value as any };
  }
  return result;
}
