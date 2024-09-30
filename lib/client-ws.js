"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _VASTWebSocketClient_instances, _VASTWebSocketClient_matcherId, _VASTWebSocketClient_matcherAddr, _VASTWebSocketClient_matcherPos, _VASTWebSocketClient_pos, _VASTWebSocketClient_id, _VASTWebSocketClient_assigned, _VASTWebSocketClient_connected, _VASTWebSocketClient_subscriptions, _VASTWebSocketClient_pendingSubscriptions, _VASTWebSocketClient_bindListeners, _VASTWebSocketClient_handleMessage, _VASTWebSocketClient_handlePendingSubscription;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VASTWebSocketClient = void 0;
const ws_1 = __importDefault(require("ws"));
const VASTServerMessage_1 = require("./proto/generated/messages/VASTServerMessage");
const VASTClientMessage_1 = require("./proto/generated/messages/VASTClientMessage");
const events_1 = require("events");
function convertToArrayBuffer(data) {
    if (data instanceof ArrayBuffer) {
        return data;
    }
    else if (Array.isArray(data)) {
        // Concatenate multiple buffers
        const totalLength = data.reduce((acc, buf) => acc + buf.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buf of data) {
            result.set(new Uint8Array(buf), offset);
            offset += buf.length;
        }
        return result.buffer;
    }
    else if (data instanceof Buffer) {
        // Convert Buffer to ArrayBuffer
        return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    }
    else {
        throw new Error('Unsupported data type');
    }
}
class VASTWebSocketClient extends events_1.EventEmitter {
    constructor(ws, opts) {
        super();
        _VASTWebSocketClient_instances.add(this);
        this.ws = ws;
        this.opts = opts;
        _VASTWebSocketClient_matcherId.set(this, void 0);
        _VASTWebSocketClient_matcherAddr.set(this, void 0);
        _VASTWebSocketClient_matcherPos.set(this, void 0);
        _VASTWebSocketClient_pos.set(this, void 0);
        _VASTWebSocketClient_id.set(this, void 0);
        _VASTWebSocketClient_assigned.set(this, false);
        _VASTWebSocketClient_connected.set(this, false);
        _VASTWebSocketClient_subscriptions.set(this, new Set());
        _VASTWebSocketClient_pendingSubscriptions.set(this, []);
        __classPrivateFieldSet(this, _VASTWebSocketClient_pos, opts.pos, "f");
        __classPrivateFieldSet(this, _VASTWebSocketClient_id, opts.id, "f");
        __classPrivateFieldGet(this, _VASTWebSocketClient_instances, "m", _VASTWebSocketClient_bindListeners).call(this);
    }
    unsubscribe(id) {
        if (!(__classPrivateFieldGet(this, _VASTWebSocketClient_connected, "f") && __classPrivateFieldGet(this, _VASTWebSocketClient_assigned, "f")))
            throw new Error('Not connected to a matcher');
        this.ws.send((0, VASTClientMessage_1.encodeBinary)({
            message: {
                field: 'unsubscribe',
                value: id
            }
        }));
    }
    subscribe(sub) {
        if (!(__classPrivateFieldGet(this, _VASTWebSocketClient_connected, "f") && __classPrivateFieldGet(this, _VASTWebSocketClient_assigned, "f")))
            throw new Error('Not connected to a matcher');
        const subId = crypto.randomUUID();
        this.ws.send((0, VASTClientMessage_1.encodeBinary)({
            message: {
                field: 'subscribe',
                value: {
                    id: subId,
                    ...sub
                }
            }
        }));
        __classPrivateFieldGet(this, _VASTWebSocketClient_pendingSubscriptions, "f").push({ id: subId, markedForRemoval: false });
    }
    publish(publish) {
        if (!(__classPrivateFieldGet(this, _VASTWebSocketClient_connected, "f") && __classPrivateFieldGet(this, _VASTWebSocketClient_assigned, "f")))
            throw new Error('Not connected to a matcher');
        if (publish.aoi.field === 'polygon')
            throw TypeError('Polygon AOI not supported');
        this.ws.send((0, VASTClientMessage_1.encodeBinary)({
            message: {
                field: 'publish',
                value: publish
            }
        }));
    }
    waitUntilAssigned() {
        return new Promise(resolve => {
            if (__classPrivateFieldGet(this, _VASTWebSocketClient_assigned, "f"))
                resolve();
            else
                this.once('assigned', resolve);
        });
    }
    async connect() {
        if (!this.ws.CLOSED)
            this.ws.close();
        __classPrivateFieldSet(this, _VASTWebSocketClient_connected, false, "f");
        if (!__classPrivateFieldGet(this, _VASTWebSocketClient_matcherAddr, "f"))
            throw new Error('Matcher address not set');
        const url = new URL(`ws://${__classPrivateFieldGet(this, _VASTWebSocketClient_matcherAddr, "f").host}:${__classPrivateFieldGet(this, _VASTWebSocketClient_matcherAddr, "f").port}`);
        url.searchParams.set('id', __classPrivateFieldGet(this, _VASTWebSocketClient_id, "f"));
        url.searchParams.set('pos', __classPrivateFieldGet(this, _VASTWebSocketClient_pos, "f").join(','));
        if (this.opts.flags.length > 0) {
            url.searchParams.set('options', this.opts.flags.join(','));
        }
        this.ws = new ws_1.default(url.toString());
    }
    static async create(opts) {
        const url = new URL(opts.url);
        url.searchParams.set('id', opts.id);
        url.searchParams.set('pos', opts.pos.join(','));
        if (opts.flags.length > 0) {
            url.searchParams.set('options', opts.flags.join(','));
        }
        const ws = new ws_1.default(url.toString());
        return new VASTWebSocketClient(ws, opts);
    }
    get matcherId() {
        return __classPrivateFieldGet(this, _VASTWebSocketClient_matcherId, "f") ? BigInt(__classPrivateFieldGet(this, _VASTWebSocketClient_matcherId, "f")) : undefined;
    }
    get id() {
        return __classPrivateFieldGet(this, _VASTWebSocketClient_id, "f");
    }
}
exports.VASTWebSocketClient = VASTWebSocketClient;
_VASTWebSocketClient_matcherId = new WeakMap(), _VASTWebSocketClient_matcherAddr = new WeakMap(), _VASTWebSocketClient_matcherPos = new WeakMap(), _VASTWebSocketClient_pos = new WeakMap(), _VASTWebSocketClient_id = new WeakMap(), _VASTWebSocketClient_assigned = new WeakMap(), _VASTWebSocketClient_connected = new WeakMap(), _VASTWebSocketClient_subscriptions = new WeakMap(), _VASTWebSocketClient_pendingSubscriptions = new WeakMap(), _VASTWebSocketClient_instances = new WeakSet(), _VASTWebSocketClient_bindListeners = function _VASTWebSocketClient_bindListeners() {
    this.ws.on('open', () => {
        __classPrivateFieldSet(this, _VASTWebSocketClient_connected, true, "f");
    });
    this.ws.on('message', (data) => {
        const server_message = (0, VASTServerMessage_1.decodeBinary)(new Uint8Array(convertToArrayBuffer(data)));
        console.log('Received message:', server_message);
        __classPrivateFieldGet(this, _VASTWebSocketClient_instances, "m", _VASTWebSocketClient_handleMessage).call(this, server_message);
    });
    this.ws.on('close', () => {
        __classPrivateFieldSet(this, _VASTWebSocketClient_connected, false, "f");
    });
}, _VASTWebSocketClient_handleMessage = function _VASTWebSocketClient_handleMessage({ message }) {
    if (!message)
        return;
    switch (message.field) {
        case 'confirmMatcher':
            {
                __classPrivateFieldSet(this, _VASTWebSocketClient_id, message.value.clientId, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherAddr, message.value.matcherAddr, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherId, message.value.matcherId, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherPos, message.value.matcherPosition, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_assigned, true, "f");
                this.emit('assigned');
            }
            break;
        case 'assignMatcher':
            {
                if (!message.value.matcherAddr)
                    return;
                const isNewMatcher = __classPrivateFieldGet(this, _VASTWebSocketClient_matcherAddr, "f")?.host !== message.value.matcherAddr.host || __classPrivateFieldGet(this, _VASTWebSocketClient_matcherAddr, "f")?.port !== message.value.matcherAddr.port;
                __classPrivateFieldSet(this, _VASTWebSocketClient_id, message.value.clientId, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherAddr, message.value.matcherAddr, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherId, message.value.matcherId, "f");
                __classPrivateFieldSet(this, _VASTWebSocketClient_matcherPos, message.value.matcherPosition, "f");
                if (isNewMatcher) {
                    __classPrivateFieldSet(this, _VASTWebSocketClient_assigned, false, "f");
                    this.connect();
                }
            }
            break;
        case 'subscribeResponse':
            {
                __classPrivateFieldGet(this, _VASTWebSocketClient_subscriptions, "f").add(message.value);
                __classPrivateFieldGet(this, _VASTWebSocketClient_instances, "m", _VASTWebSocketClient_handlePendingSubscription).call(this, message.value);
                console.log(`VASTWebSocketClient: new subscription with id=${message.value}`);
                console.log(`VASTWebSocketClient: have ${__classPrivateFieldGet(this, _VASTWebSocketClient_subscriptions, "f").size} subscriptions`);
            }
            break;
        case 'unsubscribeResponse':
            {
                __classPrivateFieldGet(this, _VASTWebSocketClient_subscriptions, "f").delete(message.value);
                console.log(`VASTWebSocketClient: removed subscription with id=${message.value}`);
                console.log(`VASTWebSocketClient: have ${__classPrivateFieldGet(this, _VASTWebSocketClient_subscriptions, "f").size} subscriptions`);
            }
            break;
        case 'publication':
            {
                this.emit('publication', message.value);
            }
            break;
        default:
            break;
    }
}, _VASTWebSocketClient_handlePendingSubscription = function _VASTWebSocketClient_handlePendingSubscription(id) {
    const idx = __classPrivateFieldGet(this, _VASTWebSocketClient_pendingSubscriptions, "f").findIndex(sub => sub.id === id);
    if (idx === -1)
        return;
    if (__classPrivateFieldGet(this, _VASTWebSocketClient_pendingSubscriptions, "f")[idx].markedForRemoval) {
        this.unsubscribe(id);
        return;
    }
    __classPrivateFieldGet(this, _VASTWebSocketClient_pendingSubscriptions, "f").splice(idx, 1);
};
