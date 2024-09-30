"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventEmitter = createEventEmitter;
function createEventEmitter() {
    const listeners = {};
    const eventEmitter = {
        emit(type, event) {
            listeners[type]?.forEach((listener) => listener(event, type));
            (type !== "*") && listeners["*"]?.forEach((listener) => listener(event, type));
        },
        on(type, listener) {
            (listeners[type] || (listeners[type] = new Set())).add(listener);
            return () => listeners[type]?.delete(listener);
        },
        off(type) {
            delete listeners[type];
        },
    };
    return eventEmitter;
}
