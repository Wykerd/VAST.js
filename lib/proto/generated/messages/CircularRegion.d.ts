import { Type as Vec2d } from "./Vec2d.js";
export declare namespace $ {
    type CircularRegion = {
        center?: Vec2d;
        radius: number;
    };
}
export type Type = $.CircularRegion;
export declare function getDefaultValue(): $.CircularRegion;
export declare function createValue(partialValue: Partial<$.CircularRegion>): $.CircularRegion;
export declare function encodeJson(value: $.CircularRegion): unknown;
export declare function decodeJson(value: any): $.CircularRegion;
export declare function encodeBinary(value: $.CircularRegion): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.CircularRegion;
