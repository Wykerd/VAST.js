import { Type as PubSubMessage } from "./PubSubMessage.js";
import { Type as MatcherInfo } from "./MatcherInfo.js";
export declare namespace $ {
    type VASTServerMessage = {
        message?: ({
            field: "publication";
            value: PubSubMessage;
        } | {
            field: "confirmMatcher";
            value: MatcherInfo;
        } | {
            field: "assignMatcher";
            value: MatcherInfo;
        } | {
            field: "unsubscribeResponse";
            value: string;
        } | {
            field: "subscribeResponse";
            value: string;
        });
    };
}
export type Type = $.VASTServerMessage;
export declare function getDefaultValue(): $.VASTServerMessage;
export declare function createValue(partialValue: Partial<$.VASTServerMessage>): $.VASTServerMessage;
export declare function encodeJson(value: $.VASTServerMessage): unknown;
export declare function decodeJson(value: any): $.VASTServerMessage;
export declare function encodeBinary(value: $.VASTServerMessage): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.VASTServerMessage;
