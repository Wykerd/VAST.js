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
const PubSubMessage_js_1 = require("./PubSubMessage.js");
const Subscribe_js_1 = require("./Subscribe.js");
const Vec2d_js_1 = require("./Vec2d.js");
const scalar_js_1 = require("../runtime/json/scalar.js");
const index_js_1 = require("../runtime/wire/index.js");
const serialize_js_1 = __importDefault(require("../runtime/wire/serialize.js"));
const scalar_js_2 = require("../runtime/wire/scalar.js");
const deserialize_js_1 = __importDefault(require("../runtime/wire/deserialize.js"));
function getDefaultValue() {
    return {
        message: undefined,
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
    switch (value.message?.field) {
        case "publish": {
            result.publish = (0, PubSubMessage_js_1.encodeJson)(value.message.value);
            break;
        }
        case "subscribe": {
            result.subscribe = (0, Subscribe_js_1.encodeJson)(value.message.value);
            break;
        }
        case "unsubscribe": {
            result.unsubscribe = scalar_js_1.tsValueToJsonValueFns.string(value.message.value);
            break;
        }
        case "move": {
            result.move = (0, Vec2d_js_1.encodeJson)(value.message.value);
            break;
        }
    }
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.publish !== undefined)
        result.message = { field: "publish", value: (0, PubSubMessage_js_1.decodeJson)(value.publish) };
    if (value.subscribe !== undefined)
        result.message = { field: "subscribe", value: (0, Subscribe_js_1.decodeJson)(value.subscribe) };
    if (value.unsubscribe !== undefined)
        result.message = { field: "unsubscribe", value: scalar_js_1.jsonValueToTsValueFns.string(value.unsubscribe) };
    if (value.move !== undefined)
        result.message = { field: "move", value: (0, Vec2d_js_1.decodeJson)(value.move) };
    return result;
}
function encodeBinary(value) {
    const result = [];
    switch (value.message?.field) {
        case "publish": {
            const tsValue = value.message.value;
            result.push([1, { type: index_js_1.WireType.LengthDelimited, value: (0, PubSubMessage_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "subscribe": {
            const tsValue = value.message.value;
            result.push([2, { type: index_js_1.WireType.LengthDelimited, value: (0, Subscribe_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "unsubscribe": {
            const tsValue = value.message.value;
            result.push([3, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
            break;
        }
        case "move": {
            const tsValue = value.message.value;
            result.push([4, { type: index_js_1.WireType.LengthDelimited, value: (0, Vec2d_js_1.encodeBinary)(tsValue) }]);
            break;
        }
    }
    return (0, serialize_js_1.default)(result);
}
const oneofFieldNumbersMap = {
    message: new Set([1, 2, 3, 4]),
};
const oneofFieldNamesMap = {
    message: new Map([
        [1, "publish"],
        [2, "subscribe"],
        [3, "unsubscribe"],
        [4, "move"],
    ]),
};
function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = (0, deserialize_js_1.default)(binary);
    const wireFields = new Map(wireMessage);
    const wireFieldNumbers = Array.from(wireFields.keys()).reverse();
    oneof: {
        const oneofFieldNumbers = oneofFieldNumbersMap.message;
        const oneofFieldNames = oneofFieldNamesMap.message;
        const fieldNumber = wireFieldNumbers.find(v => oneofFieldNumbers.has(v));
        if (fieldNumber == null)
            break oneof;
        const wireValue = wireFields.get(fieldNumber);
        const wireValueToTsValueMap = {
            [1](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, PubSubMessage_js_1.decodeBinary)(wireValue.value) : undefined; },
            [2](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Subscribe_js_1.decodeBinary)(wireValue.value) : undefined; },
            [3](wireValue) { return scalar_js_2.wireValueToTsValueFns.string(wireValue); },
            [4](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, Vec2d_js_1.decodeBinary)(wireValue.value) : undefined; },
        };
        const value = wireValueToTsValueMap[fieldNumber]?.(wireValue);
        if (value === undefined)
            break oneof;
        result.message = { field: oneofFieldNames.get(fieldNumber), value: value };
    }
    return result;
}
