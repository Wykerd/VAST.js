"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventBuffer = createEventBuffer;
const observer_js_1 = require("./observer.js");
function createEventBuffer(config) {
    const queue = [];
    let _error;
    let deferred;
    let finished = false;
    return {
        push(value) {
            if (finished)
                throw new Error("can't push after finish");
            if (deferred) {
                deferred.resolve({ value, done: false });
                deferred = undefined;
            }
            else {
                queue.push(value);
            }
        },
        error(error) {
            if (deferred)
                deferred.reject(error);
            else
                _error = error;
            finished = true;
        },
        finish() {
            deferred?.resolve({ value: undefined, done: true });
            finished = true;
        },
        drain() {
            config?.onDrainStart?.();
            const result = {
                [Symbol.asyncIterator]: () => result,
                next() {
                    if (queue.length > 0) {
                        return Promise.resolve({
                            value: queue.shift(),
                            done: false,
                        });
                    }
                    else {
                        if (_error)
                            return Promise.reject(_error);
                        if (finished) {
                            return Promise.resolve({ value: undefined, done: true });
                        }
                        else {
                            return deferred = (0, observer_js_1.defer)();
                        }
                    }
                },
                return(value) {
                    config?.onDrainEnd?.();
                    return Promise.resolve({ value, done: true });
                },
                throw(error) {
                    config?.onDrainEnd?.();
                    return Promise.reject(error);
                },
            };
            return result;
        },
    };
}
