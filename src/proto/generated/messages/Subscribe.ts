// @ts-nocheck
import {
  Type as CircularRegion,
  encodeJson as encodeJson_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  decodeBinary as decodeBinary_1,
} from "./CircularRegion.js";
import {
  Type as PolygonRegion,
  encodeJson as encodeJson_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  decodeBinary as decodeBinary_2,
} from "./PolygonRegion.js";
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
  export type Subscribe = {
    id: string;
    channel: string;
    follow: boolean;
    aoi?: (
      | { field: "circular", value: CircularRegion }
      | { field: "polygon", value: PolygonRegion }
  );
  }
}

export type Type = $.Subscribe;

export function getDefaultValue(): $.Subscribe {
  return {
    id: "",
    channel: "",
    follow: false,
    aoi: undefined,
  };
}

export function createValue(partialValue: Partial<$.Subscribe>): $.Subscribe {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.Subscribe): unknown {
  const result: any = {};
  if (value.id !== undefined) result.id = tsValueToJsonValueFns.string(value.id);
  if (value.channel !== undefined) result.channel = tsValueToJsonValueFns.string(value.channel);
  if (value.follow !== undefined) result.follow = tsValueToJsonValueFns.bool(value.follow);
  switch (value.aoi?.field) {
    case "circular": {
      result.circular = encodeJson_1(value.aoi.value);
      break;
    }
    case "polygon": {
      result.polygon = encodeJson_2(value.aoi.value);
      break;
    }
  }
  return result;
}

export function decodeJson(value: any): $.Subscribe {
  const result = getDefaultValue();
  if (value.id !== undefined) result.id = jsonValueToTsValueFns.string(value.id);
  if (value.channel !== undefined) result.channel = jsonValueToTsValueFns.string(value.channel);
  if (value.follow !== undefined) result.follow = jsonValueToTsValueFns.bool(value.follow);
  if (value.circular !== undefined) result.aoi = {field: "circular", value: decodeJson_1(value.circular)};
  if (value.polygon !== undefined) result.aoi = {field: "polygon", value: decodeJson_2(value.polygon)};
  return result;
}

export function encodeBinary(value: $.Subscribe): Uint8Array {
  const result: WireMessage = [];
  if (value.id !== undefined) {
    const tsValue = value.id;
    result.push(
      [1, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.channel !== undefined) {
    const tsValue = value.channel;
    result.push(
      [2, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.follow !== undefined) {
    const tsValue = value.follow;
    result.push(
      [5, tsValueToWireValueFns.bool(tsValue)],
    );
  }
  switch (value.aoi?.field) {
    case "circular": {
      const tsValue = value.aoi.value;
      result.push(
        [3, { type: WireType.LengthDelimited as const, value: encodeBinary_1(tsValue) }],
      );
      break;
    }
    case "polygon": {
      const tsValue = value.aoi.value;
      result.push(
        [4, { type: WireType.LengthDelimited as const, value: encodeBinary_2(tsValue) }],
      );
      break;
    }
  }
  return serialize(result);
}

const oneofFieldNumbersMap: { [oneof: string]: Set<number> } = {
  aoi: new Set([3, 4]),
};

const oneofFieldNamesMap = {
  aoi: new Map([
    [3, "circular" as const],
    [4, "polygon" as const],
  ]),
};

export function decodeBinary(binary: Uint8Array): $.Subscribe {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  const wireFieldNumbers = Array.from(wireFields.keys()).reverse();
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.id = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.channel = value;
  }
  field: {
    const wireValue = wireFields.get(5);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.bool(wireValue);
    if (value === undefined) break field;
    result.follow = value;
  }
  oneof: {
    const oneofFieldNumbers = oneofFieldNumbersMap.aoi;
    const oneofFieldNames = oneofFieldNamesMap.aoi;
    const fieldNumber = wireFieldNumbers.find(v => oneofFieldNumbers.has(v));
    if (fieldNumber == null) break oneof;
    const wireValue = wireFields.get(fieldNumber);
    const wireValueToTsValueMap = {
      [3](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_1(wireValue.value) : undefined; },
      [4](wireValue: Field) { return wireValue.type === WireType.LengthDelimited ? decodeBinary_2(wireValue.value) : undefined; },
    };
    const value = (wireValueToTsValueMap[fieldNumber as keyof typeof wireValueToTsValueMap] as any)?.(wireValue!);
    if (value === undefined) break oneof;
    result.aoi = { field: oneofFieldNames.get(fieldNumber)!, value: value as any };
  }
  return result;
}
