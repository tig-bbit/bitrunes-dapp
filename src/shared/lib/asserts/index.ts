export function invariant(predicate: unknown, errorMessage: string = 'Assertion Failed'): asserts predicate {
	if (!predicate) throw new Error(errorMessage);
}