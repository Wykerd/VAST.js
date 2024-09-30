"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = serialize;
exports.concat = concat;
const index_js_1 = require("./index.js");
const varint_js_1 = require("./varint.js");
function serialize(wireMessage) {
    const result = [];
    wireMessage.forEach(([fieldNumber, field]) => {
        result.push((0, varint_js_1.encode)((fieldNumber << 3) | field.type));
        switch (field.type) {
            case index_js_1.WireType.Varint:
                result.push((0, varint_js_1.encode)(field.value));
                break;
            case index_js_1.WireType.Fixed64: {
                const arr = new Uint8Array(8);
                const dataview = new DataView(arr.buffer);
                dataview.setUint32(0, field.value[0], true);
                dataview.setUint32(4, field.value[1], true);
                result.push(arr);
                break;
            }
            case index_js_1.WireType.LengthDelimited:
                result.push((0, varint_js_1.encode)(field.value.byteLength));
                result.push(field.value);
                break;
            case index_js_1.WireType.Fixed32: {
                const arr = new Uint8Array(4);
                const dataview = new DataView(arr.buffer);
                dataview.setUint32(0, field.value, true);
                result.push(arr);
                break;
            }
        }
    });
    return concat(result);
}
function concat(arrays) {
    const totalLength = arrays.reduce((acc, value) => {
        return acc + value.byteLength;
    }, 0);
    const result = new Uint8Array(totalLength);
    arrays.reduce((acc, array) => {
        result.set(array, acc);
        return acc + array.byteLength;
    }, 0);
    return result;
}
