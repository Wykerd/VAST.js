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
const MatcherInfo_js_1 = require("./MatcherInfo.js");
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
        case "publication": {
            result.publication = (0, PubSubMessage_js_1.encodeJson)(value.message.value);
            break;
        }
        case "confirmMatcher": {
            result.confirmMatcher = (0, MatcherInfo_js_1.encodeJson)(value.message.value);
            break;
        }
        case "assignMatcher": {
            result.assignMatcher = (0, MatcherInfo_js_1.encodeJson)(value.message.value);
            break;
        }
        case "unsubscribeResponse": {
            result.unsubscribeResponse = scalar_js_1.tsValueToJsonValueFns.string(value.message.value);
            break;
        }
        case "subscribeResponse": {
            result.subscribeResponse = scalar_js_1.tsValueToJsonValueFns.string(value.message.value);
            break;
        }
    }
    return result;
}
function decodeJson(value) {
    const result = getDefaultValue();
    if (value.publication !== undefined)
        result.message = { field: "publication", value: (0, PubSubMessage_js_1.decodeJson)(value.publication) };
    if (value.confirmMatcher !== undefined)
        result.message = { field: "confirmMatcher", value: (0, MatcherInfo_js_1.decodeJson)(value.confirmMatcher) };
    if (value.assignMatcher !== undefined)
        result.message = { field: "assignMatcher", value: (0, MatcherInfo_js_1.decodeJson)(value.assignMatcher) };
    if (value.unsubscribeResponse !== undefined)
        result.message = { field: "unsubscribeResponse", value: scalar_js_1.jsonValueToTsValueFns.string(value.unsubscribeResponse) };
    if (value.subscribeResponse !== undefined)
        result.message = { field: "subscribeResponse", value: scalar_js_1.jsonValueToTsValueFns.string(value.subscribeResponse) };
    return result;
}
function encodeBinary(value) {
    const result = [];
    switch (value.message?.field) {
        case "publication": {
            const tsValue = value.message.value;
            result.push([1, { type: index_js_1.WireType.LengthDelimited, value: (0, PubSubMessage_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "confirmMatcher": {
            const tsValue = value.message.value;
            result.push([2, { type: index_js_1.WireType.LengthDelimited, value: (0, MatcherInfo_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "assignMatcher": {
            const tsValue = value.message.value;
            result.push([3, { type: index_js_1.WireType.LengthDelimited, value: (0, MatcherInfo_js_1.encodeBinary)(tsValue) }]);
            break;
        }
        case "unsubscribeResponse": {
            const tsValue = value.message.value;
            result.push([4, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
            break;
        }
        case "subscribeResponse": {
            const tsValue = value.message.value;
            result.push([5, scalar_js_2.tsValueToWireValueFns.string(tsValue)]);
            break;
        }
    }
    return (0, serialize_js_1.default)(result);
}
const oneofFieldNumbersMap = {
    message: new Set([1, 2, 3, 4, 5]),
};
const oneofFieldNamesMap = {
    message: new Map([
        [1, "publication"],
        [2, "confirmMatcher"],
        [3, "assignMatcher"],
        [4, "unsubscribeResponse"],
        [5, "subscribeResponse"],
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
            [2](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, MatcherInfo_js_1.decodeBinary)(wireValue.value) : undefined; },
            [3](wireValue) { return wireValue.type === index_js_1.WireType.LengthDelimited ? (0, MatcherInfo_js_1.decodeBinary)(wireValue.value) : undefined; },
            [4](wireValue) { return scalar_js_2.wireValueToTsValueFns.string(wireValue); },
            [5](wireValue) { return scalar_js_2.wireValueToTsValueFns.string(wireValue); },
        };
        const value = wireValueToTsValueMap[fieldNumber]?.(wireValue);
        if (value === undefined)
            break oneof;
        result.message = { field: oneofFieldNames.get(fieldNumber), value: value };
    }
    return result;
}
