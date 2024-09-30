"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultValue = getDefaultValue;
exports.createValue = createValue;
exports.encodeJson = encodeJson;
exports.decodeJson = decodeJson;
exports.encodeBinary = encodeBinary;
exports.decodeBinary = decodeBinary;
// @ts-nocheck
const CircularRegion_js_1 = require("./CircularRegion.js");
const PolygonRegion_js_1 = require("./PolygonRegion.js");
const scalar_js_1 = require("../runtime/json/scalar.js");
const index_js_1 = require("../runtime/wire/index.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const scalar_js_2 = require("../runtime/wire/scalar.js");
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        id: "",
        channel: "",
        follow: false,
        aoi: undefined,
    };
}
function createValue(partialValue) {
    return {
        ...getDefaultValue(),
        ...partialValue,
    };
}
function encodeJson(value) {
    const result = {};
    if (value.id !== undefined)
        result.id = scalar_js_1.tsValueToJsonValueFns.string(value.id);
    if (value.channel !== undefined)
        result.channel = scalar_js_1.tsValueToJsonValueFns.string(value.channel);
    if (value.follow !== undefined)
        result.follow = scalar_js_1.tsValueToJsonValueFns.bool(value.follow);
    switch (value.aoi?.field) {
        case "circular": {
            result.circular = (0, CircularRegion_js_1.encodeJson)(value.aoi.value);
            break;
        }
        case "polygon": {
            result.polygon = (0, PolygonRegion_js_1.encodeJson)(value.aoi.value);
            break;
        }
    }
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.id !== undefined)
        result.id = scalar_js_1.jsonValueToTsValueFns.string(value.id);
    if (value.channel !== undefined)
        result.channel = scalar_js_1.jsonValueToTsValueFns.string(value.channel);
    if (value.follow !== undefined)
        result.follow = scalar_js_1.jsonValueToTsValueFns.bool(value.follow);
    if (value.circular !== undefined)
        result.aoi = { field: "circular", value: (0, CircularRegion_js_1.decodeJson)(value.circular) };
    if (value.polygon !== undefined)
        result.aoi = { field: "polygon", value: (0, PolygonRegion_js_1.decodeJson)(value.polygon) };
    return result;
}
function encodeBinary(value) {
    const result = [];
    if (value.id !== undefined) {
        const tsValue = value.id;
        result.push([1, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.channel !== undefined) {
        const tsValue = value.channel;
        result.push([2, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.follow !== undefined) {
        const tsValue = value.follow;
        result.push([5, scalar_js_2.tsValueToWireValueFns.bool(tsValue)]);
    }
    switch (value.aoi?.field) {
        case "circular": {
            const tsValue = value.aoi.value;
            result.push([3, { type: index_js_1.WireType.LengthDelimited, value: (0, CircularRegion_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "polygon": {
            const tsValue = value.aoi.value;
            result.push([4, { type: index_js_1.WireType.LengthDelimited, value: (0, PolygonRegion_js_1.encodeBinary)(tsValue) }]);
            break;
        }
    }
    return (0, serialize_js_1.default)(result);
}
const oneofFieldNumbersMap = {
    aoi: new Set([3, 4]),
};
const oneofFieldNamesMap = {
    aoi: new Map([
        [3, "circular"],
        [4, "polygon"],
    ]),
};
function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = (0, deserialize_js_1.default)(binary);
    const wireFields = new Map(wireMessage);
    const wireFieldNumbers = Array.from(wireFields.keys()).reverse();
    field: {
        const wireValue = wireFields.get(1);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.id = value;
    }
    field: {
        const wireValue = wireFields.get(2);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.channel = value;
    }
    field: {
        const wireValue = wireFields.get(5);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.bool(wireValue);
        if (value === undefined)
            break field;
        result.follow = value;
    }
    oneof: {
        const oneofFieldNumbers = oneofFieldNumbersMap.aoi;
        const oneofFieldNames = oneofFieldNamesMap.aoi;
        const fieldNumber = wireFieldNumbers.find(v => oneofFieldNumbers.has(v));
        if (fieldNumber == null)
            break oneof;
        const wireValue = wireFields.get(fieldNumber);
        const wireValueToTsValueMap = {
            [3](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, CircularRegion_js_1.decodeBinary)(wireValue.value) : undefined; },
            [4](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, PolygonRegion_js_1.decodeBinary)(wireValue.value) : undefined; },
        };
        const value = wireValueToTsValueMap[fieldNumber]?.(wireValue);
        if (value === undefined)
            break oneof;
        result.aoi = { field: oneofFieldNames.get(fieldNumber), value: value };
    }
    return result;
}
