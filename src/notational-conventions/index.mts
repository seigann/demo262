class AssertError extends Error {}

export function Assert(invariant: boolean, source?: string): asserts invariant {
  if (!invariant) {
    throw new AssertError(source);
  }
}
