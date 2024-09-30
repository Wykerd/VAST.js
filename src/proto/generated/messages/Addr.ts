// @ts-nocheck
import {
  tsValueToJsonValueFns,
  jsonValueToTsValueFns,
} from "../runtime/json/scalar.js";
import {
  WireMessage,
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
  export type Addr = {
    host: string;
    port: number;
  }
}

export type Type = $.Addr;

export function getDefaultValue(): $.Addr {
  return {
    host: "",
    port: 0,
  };
}

export function createValue(partialValue: Partial<$.Addr>): $.Addr {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.Addr): unknown {
  const result: any = {};
  if (value.host !== undefined) result.host = tsValueToJsonValueFns.string(value.host);
  if (value.port !== undefined) result.port = tsValueToJsonValueFns.uint32(value.port);
  return result;
}

export function decodeJson(value: any): $.Addr {
  const result = getDefaultValue();
  if (value.host !== undefined) result.host = jsonValueToTsValueFns.string(value.host);
  if (value.port !== undefined) result.port = jsonValueToTsValueFns.uint32(value.port);
  return result;
}

export function encodeBinary(value: $.Addr): Uint8Array {
  const result: WireMessage = [];
  if (value.host !== undefined) {
    const tsValue = value.host;
    result.push(
      [1, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.port !== undefined) {
    const tsValue = value.port;
    result.push(
      [2, tsValueToWireValueFns.uint32(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.Addr {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.host = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.uint32(wireValue);
    if (value === undefined) break field;
    result.port = value;
  }
  return result;
}
