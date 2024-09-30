export declare namespace $ {
    type Addr = {
        host: string;
        port: number;
    };
}
export type Type = $.Addr;
export declare function getDefaultValue(): $.Addr;
export declare function createValue(partialValue: Partial<$.Addr>): $.Addr;
export declare function encodeJson(value: $.Addr): unknown;
export declare function decodeJson(value: any): $.Addr;
export declare function encodeBinary(value: $.Addr): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.Addr;
