// @ts-nocheck
import {
  Type as Vec2d,
  encodeJson as encodeJson_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  decodeBinary as decodeBinary_1,
} from "./Vec2d.js";
import {
  Type as Addr,
  encodeJson as encodeJson_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  decodeBinary as decodeBinary_2,
} from "./Addr.js";
import {
  tsValueToJsonValueFns,
  jsonValueToTsValueFns,
} from "../runtime/json/scalar.js";
import {
  WireMessage,
  WireType,
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
  export type MatcherInfo = {
    clientId: string;
    matcherPosition?: Vec2d;
    matcherAddr?: Addr;
    matcherId: string;
  }
}

export type Type = $.MatcherInfo;

export function getDefaultValue(): $.MatcherInfo {
  return {
    clientId: "",
    matcherPosition: undefined,
    matcherAddr: undefined,
    matcherId: "0",
  };
}

export function createValue(partialValue: Partial<$.MatcherInfo>): $.MatcherInfo {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.MatcherInfo): unknown {
  const result: any = {};
  if (value.clientId !== undefined) result.clientId = tsValueToJsonValueFns.string(value.clientId);
  if (value.matcherPosition !== undefined) result.matcherPosition = encodeJson_1(value.matcherPosition);
  if (value.matcherAddr !== undefined) result.matcherAddr = encodeJson_2(value.matcherAddr);
  if (value.matcherId !== undefined) result.matcherId = tsValueToJsonValueFns.uint64(value.matcherId);
  return result;
}

export function decodeJson(value: any): $.MatcherInfo {
  const result = getDefaultValue();
  if (value.clientId !== undefined) result.clientId = jsonValueToTsValueFns.string(value.clientId);
  if (value.matcherPosition !== undefined) result.matcherPosition = decodeJson_1(value.matcherPosition);
  if (value.matcherAddr !== undefined) result.matcherAddr = decodeJson_2(value.matcherAddr);
  if (value.matcherId !== undefined) result.matcherId = jsonValueToTsValueFns.uint64(value.matcherId);
  return result;
}

export function encodeBinary(value: $.MatcherInfo): Uint8Array {
  const result: WireMessage = [];
  if (value.clientId !== undefined) {
    const tsValue = value.clientId;
    result.push(
      [1, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.matcherPosition !== undefined) {
    const tsValue = value.matcherPosition;
    result.push(
      [2, { type: WireType.LengthDelimited as const, value: encodeBinary_1(tsValue) }],
    );
  }
  if (value.matcherAddr !== undefined) {
    const tsValue = value.matcherAddr;
    result.push(
      [3, { type: WireType.LengthDelimited as const, value: encodeBinary_2(tsValue) }],
    );
  }
  if (value.matcherId !== undefined) {
    const tsValue = value.matcherId;
    result.push(
      [4, tsValueToWireValueFns.uint64(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.MatcherInfo {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.clientId = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited ? decodeBinary_1(wireValue.value) : undefined;
    if (value === undefined) break field;
    result.matcherPosition = value;
  }
  field: {
    const wireValue = wireFields.get(3);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited ? decodeBinary_2(wireValue.value) : undefined;
    if (value === undefined) break field;
    result.matcherAddr = value;
  }
  field: {
    const wireValue = wireFields.get(4);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.uint64(wireValue);
    if (value === undefined) break field;
    result.matcherId = value;
  }
  return result;
}
