import { Type as Vec2d } from "./Vec2d.js";
export declare namespace $ {
    type PolygonRegion = {
        points: Vec2d[];
    };
}
export type Type = $.PolygonRegion;
export declare function getDefaultValue(): $.PolygonRegion;
export declare function createValue(partialValue: Partial<$.PolygonRegion>): $.PolygonRegion;
export declare function encodeJson(value: $.PolygonRegion): unknown;
export declare function decodeJson(value: any): $.PolygonRegion;
export declare function encodeBinary(value: $.PolygonRegion): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.PolygonRegion;
