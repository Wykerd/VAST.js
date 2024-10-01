import WebSocket, { CLOSED, RawData } from 'ws';
import { decodeBinary as decodeServerProto } from './proto/generated/messages/VASTServerMessage';
import { encodeBinary as encodeClientProto } from './proto/generated/messages/VASTClientMessage';
import { Addr, PubSubMessage, Subscribe, VASTServerMessage, Vec2d } from './proto/generated/messages';
import { EventEmitter } from 'events';

function convertToArrayBuffer(data: RawData): ArrayBuffer {
    if (data instanceof ArrayBuffer) {
        return data;
    } else if (Array.isArray(data)) {
        // Concatenate multiple buffers
        const totalLength = data.reduce((acc, buf) => acc + buf.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buf of data) {
        result.set(new Uint8Array(buf), offset);
        offset += buf.length;
        }
        return result.buffer;
    } else if (data instanceof Buffer) {
        // Convert Buffer to ArrayBuffer
        return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    } else {
        throw new Error('Unsupported data type');
    }
}

export interface ClientConnectOptions {
    url: string;
    id: string;
    pos: [number, number];
    flags: ('nopubinfo' | 'nochannel')[];
}

export class VASTWebSocketClient extends EventEmitter {
    #matcherId?: string;
    #matcherAddr?: Addr;
    #matcherPos?: Vec2d;
    #pos: [number, number];
    #id: string;
    #assigned = false;
    #connected = false;
    #subscriptions: Set<string> = new Set();
    #pendingSubscriptions: { id: string, markedForRemoval: boolean }[] = [];

    private constructor(private ws: WebSocket, private opts: ClientConnectOptions) {
        super();

        this.#pos = opts.pos;
        this.#id = opts.id;

        this.#bindListeners();
    }

    #bindListeners() {
        this.ws.on('open', () => {
            this.#connected = true;
        });

        this.ws.on('message', (data) => {
            const server_message = decodeServerProto(new Uint8Array(convertToArrayBuffer(data)));

            console.log('Received message:', server_message);

            this.#handleMessage(server_message);
        });

        this.ws.on('close', () => {
            this.#connected = false;
        });
    }

    #handleMessage({ message }: VASTServerMessage) {
        if (!message) return;

        switch (message.field) {
            case 'confirmMatcher':
                {
                    this.#id = message.value.clientId;
                    this.#matcherAddr = message.value.matcherAddr;
                    this.#matcherId = message.value.matcherId;
                    this.#matcherPos = message.value.matcherPosition;
                    this.#assigned = true;
                    this.emit('assigned');
                }
                break;

            case 'assignMatcher':
                {
                    if (!message.value.matcherAddr) return;

                    const isNewMatcher = this.#matcherAddr?.host !== message.value.matcherAddr.host || this.#matcherAddr?.port !== message.value.matcherAddr.port;

                    this.#id = message.value.clientId;
                    this.#matcherAddr = message.value.matcherAddr;
                    this.#matcherId = message.value.matcherId;
                    this.#matcherPos = message.value.matcherPosition;

                    if (isNewMatcher) {
                        this.#assigned = false;
                        this.connect();
                    }
                }
                break;

            case 'subscribeResponse':
                {
                    this.#subscriptions.add(message.value);
                    this.#handlePendingSubscription(message.value);
                    console.log(`VASTWebSocketClient: new subscription with id=${message.value}`);
                    console.log(`VASTWebSocketClient: have ${this.#subscriptions.size} subscriptions`);
                }
                break;

            case 'unsubscribeResponse':
                {
                    this.#subscriptions.delete(message.value);
                    console.log(`VASTWebSocketClient: removed subscription with id=${message.value}`);
                    console.log(`VASTWebSocketClient: have ${this.#subscriptions.size} subscriptions`);
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
    }

    #handlePendingSubscription(id: string) {
        const idx = this.#pendingSubscriptions.findIndex(sub => sub.id === id);
        if (idx === -1) return;

        if (this.#pendingSubscriptions[idx].markedForRemoval) {
            this.unsubscribe(id);
            return;
        }

        this.#pendingSubscriptions.splice(idx, 1);
    }

    unsubscribe(id: string) {
        if (!(this.#connected && this.#assigned))
            throw new Error('Not connected to a matcher');

        this.ws.send(encodeClientProto({
            message: {
                field: 'unsubscribe',
                value: id
            }
        }));
    }

    subscribe(sub: Omit<Subscribe, "id">) {
        if (!(this.#connected && this.#assigned))
            throw new Error('Not connected to a matcher');

        const subId = crypto.randomUUID();

        this.ws.send(encodeClientProto({
            message: {
                field: 'subscribe',
                value: {
                    id: subId,
                    ...sub
                }
            }
        }));

        this.#pendingSubscriptions.push({ id: subId, markedForRemoval: false });
    }

    publish(publish: Required<PubSubMessage>) {
        if (!(this.#connected && this.#assigned))
            throw new Error('Not connected to a matcher');

        if (publish.aoi.field === 'polygon')
            throw TypeError('Polygon AOI not supported');

        this.ws.send(encodeClientProto({
            message: {
                field: 'publish',
                value: publish
            }
        }));
    }

    waitUntilAssigned() {
        return new Promise<void>(resolve => {
            if (this.#assigned) resolve();
            else this.once('assigned', resolve);
        });
    }

    async connect() {
        if (this.ws.readyState != CLOSED) this.ws.close();

        this.#connected = false;

        if (!this.#matcherAddr)
            throw new Error('Matcher address not set');

        const url = new URL(`ws://${this.#matcherAddr.host}:${this.#matcherAddr.port}`);
        url.searchParams.set('id', this.#id);
        url.searchParams.set('pos', this.#pos.join(','));
        if (this.opts.flags.length > 0) {
            url.searchParams.set('options', this.opts.flags.join(','));
        }

        this.ws = new WebSocket(url.toString());
    }

    static async create(opts: ClientConnectOptions) {
        const url = new URL(opts.url);
        url.searchParams.set('id', opts.id);
        url.searchParams.set('pos', opts.pos.join(','));
        if (opts.flags.length > 0) {
            url.searchParams.set('options', opts.flags.join(','));
        }

        const ws = new WebSocket(url.toString());

        return new VASTWebSocketClient(ws, opts);
    }

    get matcherId() {
        return this.#matcherId ? BigInt(this.#matcherId) : undefined;
    }

    get id() {
        return this.#id;
    }
}
