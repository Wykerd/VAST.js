import { Type as CircularRegion } from "./CircularRegion.js";
import { Type as PolygonRegion } from "./PolygonRegion.js";
export declare namespace $ {
    type PubSubMessage = {
        payload: Uint8Array;
        channel?: string;
        aoi?: ({
            field: "circular";
            value: CircularRegion;
        } | {
            field: "polygon";
            value: PolygonRegion;
        });
    };
}
export type Type = $.PubSubMessage;
export declare function getDefaultValue(): $.PubSubMessage;
export declare function createValue(partialValue: Partial<$.PubSubMessage>): $.PubSubMessage;
export declare function encodeJson(value: $.PubSubMessage): unknown;
export declare function decodeJson(value: any): $.PubSubMessage;
export declare function encodeBinary(value: $.PubSubMessage): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.PubSubMessage;
