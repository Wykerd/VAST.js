"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromSingle = fromSingle;
exports.first = first;
async function* fromSingle(value) {
    yield value;
}
async function first(generator) {
    const { done, value } = await generator.next();
    if (done)
        throw Error("The generator should yield at least one value.");
    return value;
}
