import type { tECMALanguageTypes } from '../types-language/value.type.mjs';
import type { CompletionType } from './completion-record.constant.mjs';

export interface ICompletion<T> {
  readonly Type: CompletionType;
  readonly Value: T;
  readonly Target: string | undefined;
}

export interface INormalCompletion<T> extends ICompletion<T> {
  readonly Type: CompletionType.NORMAL;
  readonly Target: undefined;
}

export interface IThrowCompletion<T extends tECMALanguageTypes = unknown> extends ICompletion<T> {
  readonly Type: CompletionType.THROW;
  readonly Target: undefined;
}

export type tNormalCompletion<T> = INormalCompletion<T>;
export type tAbruptCompletion<T> = IThrowCompletion<T>;
