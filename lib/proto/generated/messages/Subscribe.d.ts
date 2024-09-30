import { Type as CircularRegion } from "./CircularRegion.js";
import { Type as PolygonRegion } from "./PolygonRegion.js";
export declare namespace $ {
    type Subscribe = {
        id: string;
        channel: string;
        follow: boolean;
        aoi?: ({
            field: "circular";
            value: CircularRegion;
        } | {
            field: "polygon";
            value: PolygonRegion;
        });
    };
}
export type Type = $.Subscribe;
export declare function getDefaultValue(): $.Subscribe;
export declare function createValue(partialValue: Partial<$.Subscribe>): $.Subscribe;
export declare function encodeJson(value: $.Subscribe): unknown;
export declare function decodeJson(value: any): $.Subscribe;
export declare function encodeBinary(value: $.Subscribe): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.Subscribe;
