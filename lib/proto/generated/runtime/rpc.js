"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethodImpl = getMethodImpl;
exports.createServerImplBuilder = createServerImplBuilder;
const event_buffer_js_1 = require("./async/event-buffer.js");
const observer_js_1 = require("./async/observer.js");
function getMethodImpl(handler) {
    return (messages, metadata) => {
        const headerPromise = (0, observer_js_1.defer)();
        const trailerPromise = (0, observer_js_1.defer)();
        const drainEnd = (0, observer_js_1.defer)();
        const eventBuffer = (0, event_buffer_js_1.createEventBuffer)({
            onDrainEnd: drainEnd.resolve,
        });
        const header = headerPromise.resolve;
        const send = eventBuffer.push;
        const end = (value) => {
            eventBuffer.finish();
            trailerPromise.resolve(value);
        };
        handler({ metadata, messages, drainEnd }, { header, send, end });
        return [eventBuffer.drain(), headerPromise, trailerPromise];
    };
}
function createServerImplBuilder() {
    const buffer = (0, event_buffer_js_1.createEventBuffer)();
    return {
        register(methodDescriptor, handler) {
            buffer.push([methodDescriptor, getMethodImpl(handler)]);
        },
        finish: buffer.finish,
        drain: buffer.drain,
    };
}
