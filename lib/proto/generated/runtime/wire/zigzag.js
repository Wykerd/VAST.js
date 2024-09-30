"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const Long_js_1 = __importDefault(require("../Long.js"));
function encode(value) {
    if (value instanceof Long_js_1.default) {
        const l = new Long_js_1.default(value[0] << 1, (value[1] << 1) | (value[0] >>> 31));
        const r = value[1] >>> 31 ? new Long_js_1.default(0xFFFFFFFF, 0xFFFFFFFF) : new Long_js_1.default();
        return new Long_js_1.default(l[0] ^ r[0], l[1] ^ r[1]);
    }
    return ((value * 2) ^ (value >> 31)) >>> 0;
}
function decode(value) {
    if (value instanceof Long_js_1.default) {
        const l = new Long_js_1.default((value[0] >>> 1) | (value[1] << 31), (value[1]) >>> 1);
        const r = value[0] & 1 ? new Long_js_1.default(0xFFFFFFFF, 0xFFFFFFFF) : new Long_js_1.default();
        return new Long_js_1.default(l[0] ^ r[0], l[1] ^ r[1]);
    }
    return ((value >>> 1) ^ -(value & 1));
}
