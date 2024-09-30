export declare namespace $ {
    type Vec2d = {
        x: number;
        y: number;
    };
}
export type Type = $.Vec2d;
export declare function getDefaultValue(): $.Vec2d;
export declare function createValue(partialValue: Partial<$.Vec2d>): $.Vec2d;
export declare function encodeJson(value: $.Vec2d): unknown;
export declare function decodeJson(value: any): $.Vec2d;
export declare function encodeBinary(value: $.Vec2d): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.Vec2d;
