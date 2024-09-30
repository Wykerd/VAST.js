import Long from "../Long.js";
import { Field, LengthDelimited } from "./index.js";
type WireValueToTsValue<T> = (wireValue: Field) => T | undefined;
type TsValueToWireValue<T> = (tsValue: T) => Field;
type Unpack<T> = (wireValues: Iterable<Field>) => Generator<T>;
type Pack<T> = (values: T[]) => LengthDelimited;
interface WireValueToTsValueFns extends NumericWireValueToTsValueFns {
    string: WireValueToTsValue<string>;
    bytes: WireValueToTsValue<Uint8Array>;
}
interface TsValueToWireValueFns extends TsValueToNumericWireValueFns {
    string: TsValueToWireValue<string>;
    bytes: TsValueToWireValue<Uint8Array>;
}
interface NumericWireValueToTsValueFns extends VarintFieldToTsValueFns {
    double: WireValueToTsValue<number>;
    float: WireValueToTsValue<number>;
    fixed32: WireValueToTsValue<number>;
    fixed64: WireValueToTsValue<string>;
    sfixed32: WireValueToTsValue<number>;
    sfixed64: WireValueToTsValue<string>;
}
interface TsValueToNumericWireValueFns extends TsValueToVarintFieldFns {
    double: TsValueToWireValue<number>;
    float: TsValueToWireValue<number>;
    fixed32: TsValueToWireValue<number>;
    fixed64: TsValueToWireValue<string>;
    sfixed32: TsValueToWireValue<number>;
    sfixed64: TsValueToWireValue<string>;
}
type DecodeVarintFns = typeof decodeVarintFns;
declare const decodeVarintFns: {
    int32: (long: Long) => number;
    int64: (long: Long) => string;
    uint32: (long: Long) => number;
    uint64: (long: Long) => string;
    sint32: (long: Long) => number;
    sint64: (long: Long) => string;
    bool: (long: Long) => boolean;
};
type VarintFieldToTsValueFns = typeof varintFieldToTsValueFns;
declare const varintFieldToTsValueFns: { [type in keyof DecodeVarintFns]: WireValueToTsValue<ReturnType<DecodeVarintFns[type]>>; };
type TsValueToVarintFieldFns = typeof tsValueToVarintFieldFns;
declare const tsValueToVarintFieldFns: { [type in keyof DecodeVarintFns]: TsValueToWireValue<ReturnType<DecodeVarintFns[type]>>; };
export declare const wireValueToTsValueFns: WireValueToTsValueFns;
export declare const tsValueToWireValueFns: TsValueToWireValueFns;
type UnpackFns = {
    [type in keyof NumericWireValueToTsValueFns]: Unpack<NonNullable<ReturnType<NumericWireValueToTsValueFns[type]>>>;
};
export declare const unpackFns: UnpackFns;
type PackFns = {
    [type in keyof NumericWireValueToTsValueFns]: Pack<NonNullable<ReturnType<NumericWireValueToTsValueFns[type]>>>;
};
export declare const packFns: PackFns;
export {};
