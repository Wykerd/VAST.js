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
const Vec2d_js_1 = require("./Vec2d.js");
const Addr_js_1 = require("./Addr.js");
const scalar_js_1 = require("../runtime/json/scalar.js");
const index_js_1 = require("../runtime/wire/index.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const scalar_js_2 = require("../runtime/wire/scalar.js");
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        clientId: "",
        matcherPosition: undefined,
        matcherAddr: undefined,
        matcherId: "0",
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
    if (value.clientId !== undefined)
        result.clientId = scalar_js_1.tsValueToJsonValueFns.string(value.clientId);
    if (value.matcherPosition !== undefined)
        result.matcherPosition = (0, Vec2d_js_1.encodeJson)(value.matcherPosition);
    if (value.matcherAddr !== undefined)
        result.matcherAddr = (0, Addr_js_1.encodeJson)(value.matcherAddr);
    if (value.matcherId !== undefined)
        result.matcherId = scalar_js_1.tsValueToJsonValueFns.uint64(value.matcherId);
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.clientId !== undefined)
        result.clientId = scalar_js_1.jsonValueToTsValueFns.string(value.clientId);
    if (value.matcherPosition !== undefined)
        result.matcherPosition = (0, Vec2d_js_1.decodeJson)(value.matcherPosition);
    if (value.matcherAddr !== undefined)
        result.matcherAddr = (0, Addr_js_1.decodeJson)(value.matcherAddr);
    if (value.matcherId !== undefined)
        result.matcherId = scalar_js_1.jsonValueToTsValueFns.uint64(value.matcherId);
    return result;
}
function encodeBinary(value) {
    const result = [];
    if (value.clientId !== undefined) {
        const tsValue = value.clientId;
        result.push([1, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.matcherPosition !== undefined) {
        const tsValue = value.matcherPosition;
        result.push([2, { type: index_js_1.WireType.LengthDelimited, value: (0, Vec2d_js_1.encodeBinary)(tsValue) }]);
    }
    if (value.matcherAddr !== undefined) {
        const tsValue = value.matcherAddr;
        result.push([3, { type: index_js_1.WireType.LengthDelimited, value: (0, Addr_js_1.encodeBinary)(tsValue) }]);
    }
    if (value.matcherId !== undefined) {
        const tsValue = value.matcherId;
        result.push([4, scalar_js_2.tsValueToWireValueFns.uint64(tsValue)]);
    }
    return (0, serialize_js_1.default)(result);
}
function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = (0, deserialize_js_1.default)(binary);
    const wireFields = new Map(wireMessage);
    field: {
        const wireValue = wireFields.get(1);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.clientId = value;
    }
    field: {
        const wireValue = wireFields.get(2);
        if (wireValue === undefined)
            break field;
        const value = wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Vec2d_js_1.decodeBinary)(wireValue.value) : undefined;
        if (value === undefined)
            break field;
        result.matcherPosition = value;
    }
    field: {
        const wireValue = wireFields.get(3);
        if (wireValue === undefined)
            break field;
        const value = wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Addr_js_1.decodeBinary)(wireValue.value) : undefined;
        if (value === undefined)
            break field;
        result.matcherAddr = value;
    }
    field: {
        const wireValue = wireFields.get(4);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.uint64(wireValue);
        if (value === undefined)
            break field;
        result.matcherId = value;
    }
    return result;
}
