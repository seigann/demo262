/**
 * Completion Record Specification Type
 * @author Seigann
 * @date 2023-06-27
 */

import { Assert } from '../notational-conventions/index.mjs';
import { Q } from '../notational-conventions/runtime-semantics.mjs';
import { CompletionType } from './completion-record.constant.mjs';
import type { tECMALanguageTypes } from '../types-language/value.type.mjs';
import type { ICompletion, INormalCompletion, IThrowCompletion } from './completion-record.type.mjs';

export class CompletionRecord<T = unknown> implements ICompletion<T> {
  constructor(init: ICompletion<T>) {
    const { Type, Value, Target } = init;
    this.Type = Type;
    this.Value = Value;
    this.Target = Target;
  }

  readonly Type: CompletionType;
  readonly Value: T;
  readonly Target: string | undefined;
}

/** https://tc39.es/ecma262/#sec-normalcompletion */
export function NormalCompletion<T>(value: T): INormalCompletion<T> {
  // 1. Return Completion { [[Type]]: normal, [[Value]]: argument, [[Target]]: empty }.
  return new CompletionRecord<T>({
    Type: CompletionType.NORMAL,
    Value: value,
    Target: undefined,
  }) as INormalCompletion<T>;
}

/** https://tc39.es/ecma262/#sec-throwcompletion */
export function ThrowCompletion<T extends tECMALanguageTypes>(argument: T): IThrowCompletion<T> {
  // 1. Return Completion { [[Type]]: throw, [[Value]]: argument, [[Target]]: empty }.
  return new CompletionRecord<T>({
    Type: CompletionType.THROW,
    Value: argument,
    Target: undefined,
  }) as IThrowCompletion<T>;
}

/** https://tc39.es/ecma262/#sec-updateempty */
export function UpdateEmpty<T, Q>(completionRecord: ICompletion<T>, value: Q): ICompletion<T | Q> {
  Assert(completionRecord instanceof CompletionRecord);
  // 1. Assert: If completionRecord.[[Type]] is either return or throw, then completionRecord.[[Value]] is not empty.
  Assert(
    !(completionRecord.Type === CompletionType.RETURN || completionRecord.Type === CompletionType.THROW) ||
      completionRecord.Value !== undefined
  );
  // 2. If completionRecord.[[Value]] is not empty, return ? completionRecord.
  if (completionRecord.Value !== undefined) {
    return Q(completionRecord);
  }
  // 3. Return Completion { [[Type]]: completionRecord.[[Type]], [[Value]]: value, [[Target]]: completionRecord.[[Target]] }.
  return new CompletionRecord({
    Type: completionRecord.Type,
    Value: value,
    Target: completionRecord.Target,
  });
}
