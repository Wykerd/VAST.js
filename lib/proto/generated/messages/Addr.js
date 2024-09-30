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
const scalar_js_1 = require("../runtime/json/scalar.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const scalar_js_2 = require("../runtime/wire/scalar.js");
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        host: "",
        port: 0,
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
    if (value.host !== undefined)
        result.host = scalar_js_1.tsValueToJsonValueFns.string(value.host);
    if (value.port !== undefined)
        result.port = scalar_js_1.tsValueToJsonValueFns.uint32(value.port);
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.host !== undefined)
        result.host = scalar_js_1.jsonValueToTsValueFns.string(value.host);
    if (value.port !== undefined)
        result.port = scalar_js_1.jsonValueToTsValueFns.uint32(value.port);
    return result;
}
function encodeBinary(value) {
    const result = [];
    if (value.host !== undefined) {
        const tsValue = value.host;
        result.push([1, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.port !== undefined) {
        const tsValue = value.port;
        result.push([2, scalar_js_2.tsValueToWireValueFns.uint32(tsValue)]);
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
        result.host = value;
    }
    field: {
        const wireValue = wireFields.get(2);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.uint32(wireValue);
        if (value === undefined)
            break field;
        result.port = value;
    }
    return result;
}
