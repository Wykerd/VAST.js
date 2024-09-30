import { PubSubMessage, Subscribe } from './proto/generated/messages';
import { EventEmitter } from 'events';
export interface ClientConnectOptions {
    url: string;
    id: string;
    pos: [number, number];
    flags: ('nopubinfo' | 'nochannel')[];
}
export declare class VASTWebSocketClient extends EventEmitter {
    #private;
    private ws;
    private opts;
    private constructor();
    unsubscribe(id: string): void;
    subscribe(sub: Omit<Subscribe, "id">): void;
    publish(publish: Required<PubSubMessage>): void;
    waitUntilAssigned(): Promise<void>;
    connect(): Promise<void>;
    static create(opts: ClientConnectOptions): Promise<VASTWebSocketClient>;
    get matcherId(): bigint | undefined;
    get id(): string;
}
