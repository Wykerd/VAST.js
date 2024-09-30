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
        x: 0,
        y: 0,
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
    if (value.x !== undefined)
        result.x = scalar_js_1.tsValueToJsonValueFns.double(value.x);
    if (value.y !== undefined)
        result.y = scalar_js_1.tsValueToJsonValueFns.double(value.y);
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.x !== undefined)
        result.x = scalar_js_1.jsonValueToTsValueFns.double(value.x);
    if (value.y !== undefined)
        result.y = scalar_js_1.jsonValueToTsValueFns.double(value.y);
    return result;
}
function encodeBinary(value) {
    const result = [];
    if (value.x !== undefined) {
        const tsValue = value.x;
        result.push([1, scalar_js_2.tsValueToWireValueFns.double(tsValue)]);
    }
    if (value.y !== undefined) {
        const tsValue = value.y;
        result.push([2, scalar_js_2.tsValueToWireValueFns.double(tsValue)]);
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
        const value = scalar_js_2.wireValueToTsValueFns.double(wireValue);
        if (value === undefined)
            break field;
        result.x = value;
    }
    field: {
        const wireValue = wireFields.get(2);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.double(wireValue);
        if (value === undefined)
            break field;
        result.y = value;
    }
    return result;
}
