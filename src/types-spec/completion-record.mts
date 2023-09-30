/**
 * Completion Record Specification Type
 * @author Seigann
 * @date 2023-06-27
 */

import { Assert } from '../notational-conventions.mjs';
import { Q } from '../notational-conventions/runtime-semantics.mjs';
import type { Value } from '../types-language/value.mjs';

/** https://tc39.es/ecma262/#sec-completion-record-specification-type */
export enum CompletionType {
  NORMAL = 'normal',
  BREAK = 'break',
  CONTINUE = 'continue',
  RETURN = 'return',
  THROW = 'throw',
}

export class CompletionRecord<T> {
  constructor(init: CompletionRecord<T>) {
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
export interface NormalCompletionRecord<T> extends CompletionRecord<T> {
  readonly Type: CompletionType.NORMAL;
  readonly Target: undefined;
}
export function NormalCompletion<T>(value: T): NormalCompletionRecord<T> {
  // 1. Return Completion { [[Type]]: normal, [[Value]]: argument, [[Target]]: empty }.
  return new CompletionRecord<T>({
    Type: CompletionType.NORMAL,
    Value: value,
    Target: undefined,
  }) as NormalCompletionRecord<T>;
}

/** https://tc39.es/ecma262/#sec-throwcompletion */
export interface ThrowCompletionRecord<T extends Value = any> extends CompletionRecord<T> {
  readonly Type: CompletionType.THROW;
  readonly Target: undefined;
}
export function ThrowCompletion<T extends Value>(argument: T): ThrowCompletionRecord<T> {
  // 1. Return Completion { [[Type]]: throw, [[Value]]: argument, [[Target]]: empty }.
  return new CompletionRecord<T>({
    Type: CompletionType.THROW,
    Value: argument,
    Target: undefined,
  }) as ThrowCompletionRecord<T>;
}

/** https://tc39.es/ecma262/#sec-updateempty */
export function UpdateEmpty<T, Q>(completionRecord: CompletionRecord<T>, value: Q): CompletionRecord<T | Q> {
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
