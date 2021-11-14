type Primitive = string | number | boolean | symbol | undefined | null;

type PathImpl<K extends string | number, V> = V extends Primitive
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`;

type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;
type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

export type Path<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
      }[TupleKey<T>]
    : PathImpl<ArrayKey, V>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K]>;
    }[keyof T];

export type KeysPaths<T, Keys extends keyof T = keyof T> = {
  [key in Keys]: T[key] extends Primitive
    ? key
    : PathImpl<`${string & key}`, T[key]>;
}[Keys];
