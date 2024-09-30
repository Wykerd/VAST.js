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
const scalar_js_1 = require("../runtime/json/scalar.js");
const index_js_1 = require("../runtime/wire/index.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const scalar_js_2 = require("../runtime/wire/scalar.js");
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        center: undefined,
        radius: 0,
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
    if (value.center !== undefined)
        result.center = (0, Vec2d_js_1.encodeJson)(value.center);
    if (value.radius !== undefined)
        result.radius = scalar_js_1.tsValueToJsonValueFns.double(value.radius);
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.center !== undefined)
        result.center = (0, Vec2d_js_1.decodeJson)(value.center);
    if (value.radius !== undefined)
        result.radius = scalar_js_1.jsonValueToTsValueFns.double(value.radius);
    return result;
}
function encodeBinary(value) {
    const result = [];
    if (value.center !== undefined) {
        const tsValue = value.center;
        result.push([1, { type: index_js_1.WireType.LengthDelimited, value: (0, Vec2d_js_1.encodeBinary)(tsValue) }]);
    }
    if (value.radius !== undefined) {
        const tsValue = value.radius;
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
        const value = wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Vec2d_js_1.decodeBinary)(wireValue.value) : undefined;
        if (value === undefined)
            break field;
        result.center = value;
    }
    field: {
        const wireValue = wireFields.get(2);
        if (wireValue === undefined)
            break field;
        const value = scalar_js_2.wireValueToTsValueFns.double(wireValue);
        if (value === undefined)
            break field;
        result.radius = value;
    }
    return result;
}
