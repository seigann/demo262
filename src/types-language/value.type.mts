export type tUndefined = unknown;
export type tNull = unknown;
export type tBoolean = unknown;
export type tString = unknown;
export type tSymbol = unknown;
export type tNumber = number;
export type tBigInt = unknown;
export type tObject = unknown;

/** https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types */
export type tECMALanguageTypes =
  | tUndefined
  | tNull
  | tBoolean
  | tString
  | tSymbol
  | tNumber
  | tBigInt
  | tObject;
