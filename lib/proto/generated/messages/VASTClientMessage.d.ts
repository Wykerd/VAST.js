import { Type as PubSubMessage } from "./PubSubMessage.js";
import { Type as Subscribe } from "./Subscribe.js";
import { Type as Vec2d } from "./Vec2d.js";
export declare namespace $ {
    type VASTClientMessage = {
        message?: ({
            field: "publish";
            value: PubSubMessage;
        } | {
            field: "subscribe";
            value: Subscribe;
        } | {
            field: "unsubscribe";
            value: string;
        } | {
            field: "move";
            value: Vec2d;
        });
    };
}
export type Type = $.VASTClientMessage;
export declare function getDefaultValue(): $.VASTClientMessage;
export declare function createValue(partialValue: Partial<$.VASTClientMessage>): $.VASTClientMessage;
export declare function encodeJson(value: $.VASTClientMessage): unknown;
export declare function decodeJson(value: any): $.VASTClientMessage;
export declare function encodeBinary(value: $.VASTClientMessage): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.VASTClientMessage;
