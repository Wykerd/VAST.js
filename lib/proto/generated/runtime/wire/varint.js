"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
const Long_js_1 = __importDefault(require("../Long.js"));
function encode(value) {
    const result = [];
    const mask = 0b1111111;
    const head = 1 << 7;
    let long = typeof value === "number" ? new Long_js_1.default(value) : value;
    while (long[0] || long[1]) {
        const [lo, hi] = long;
        const chunk = lo & mask;
        const nextHi = hi >>> 7;
        const nextLo = (lo >>> 7) | ((hi & mask) << (32 - 7));
        long = new Long_js_1.default(nextLo, nextHi);
        const resultChunk = !(long[0] || long[1]) ? chunk : chunk | head;
        result.push(resultChunk);
    }
    if (result.length < 1)
        return new Uint8Array(1);
    return Uint8Array.from(result);
}
function decode(dataview) {
    let result = new Long_js_1.default(0);
    let i = 0;
    while (true) {
        const curr = dataview.getUint8(i);
        result = or(result, leftshift(new Long_js_1.default(curr & 0b1111111), i * 7));
        ++i;
        if (curr >>> 7)
            continue;
        return [i, result];
    }
}
function or(a, b) {
    return new Long_js_1.default(a[0] | b[0], a[1] | b[1]);
}
function leftshift(a, count) {
    if (count === 0)
        return a;
    if (count >= 32)
        return new Long_js_1.default(0, a[0] << (count - 32));
    return new Long_js_1.default(a[0] << count, (a[1] << count) | (a[0] >>> (32 - count)));
}
