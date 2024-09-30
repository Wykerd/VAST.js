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
const index_js_1 = require("../runtime/wire/index.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        points: [],
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
    result.points = value.points.map(value => (0, Vec2d_js_1.encodeJson)(value));
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    result.points = value.points?.map((value) => (0, Vec2d_js_1.decodeJson)(value)) ?? [];
    return result;
}
function encodeBinary(value) {
    const result = [];
    for (const tsValue of value.points) {
        result.push([1, { type: index_js_1.WireType.LengthDelimited, value: (0, Vec2d_js_1.encodeBinary)(tsValue) }]);
    }
    return (0, serialize_js_1.default)(result);
}
function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = (0, deserialize_js_1.default)(binary);
    const wireFields = new Map(wireMessage);
    collection: {
        const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 1).map(([, wireValue]) => wireValue);
        const value = wireValues.map((wireValue) => wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Vec2d_js_1.decodeBinary)(wireValue.value) : undefined).filter(x => x !== undefined);
        if (!value.length)
            break collection;
        result.points = value;
    }
    return result;
}
