import { Type as Vec2d } from "./Vec2d.js";
import { Type as Addr } from "./Addr.js";
export declare namespace $ {
    type MatcherInfo = {
        clientId: string;
        matcherPosition?: Vec2d;
        matcherAddr?: Addr;
        matcherId: string;
    };
}
export type Type = $.MatcherInfo;
export declare function getDefaultValue(): $.MatcherInfo;
export declare function createValue(partialValue: Partial<$.MatcherInfo>): $.MatcherInfo;
export declare function encodeJson(value: $.MatcherInfo): unknown;
export declare function decodeJson(value: any): $.MatcherInfo;
export declare function encodeBinary(value: $.MatcherInfo): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.MatcherInfo;
