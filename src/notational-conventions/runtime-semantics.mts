import { Assert } from './index.mjs';
import { CompletionRecord, NormalCompletion } from '../types-spec/completion-record.mjs';
import { CompletionType } from '../types-spec/completion-record.constant.mjs';
import type { ICompletion } from '../types-spec/completion-record.type.mjs';

/** https://tc39.es/ecma262/multipage/notational-conventions.html#sec-completion-ao */
export function Completion<T = unknown>(argument: ICompletion<T>) {
  Assert(argument instanceof CompletionRecord);
  return argument;
}

/** https://tc39.es/ecma262/multipage/notational-conventions.html#sec-returnifabrupt */
export function ReturnIfAbrupt<T = unknown>(argument: ICompletion<T>) {
  // 1. Assert: argument is a Completion Record.
  Assert(argument instanceof CompletionRecord);
  // 2. If argument is an abrupt completion, return Completion(argument).
  if (argument.Type !== CompletionType.NORMAL) {
    return Completion(argument);
  }

  // 3. Else, set argument to argument.[[Value]].
  // TODO
  return NormalCompletion(argument.Value);
}

/** https://tc39.es/ecma262/multipage/notational-conventions.html#sec-returnifabrupt-shorthands */
export const Q = ReturnIfAbrupt;
