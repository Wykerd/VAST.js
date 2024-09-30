"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPojoSet = toPojoSet;
exports.removeItem = removeItem;
exports.groupBy = groupBy;
function toPojoSet(arr) {
    const result = {};
    for (const item of arr)
        result[item] = item;
    return result;
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    arr.splice(index, 1);
    return arr;
}
function groupBy(arr, by) {
    const result = new Map();
    for (const item of arr) {
        const key = item[by];
        if (result.has(key))
            result.get(key).push(item);
        else
            result.set(key, [item]);
    }
    return result;
}
