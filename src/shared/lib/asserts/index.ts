export function invariant(predicate: any, errorMessage: string = 'Assertion Failed'): asserts predicate {
	if (!predicate) throw new Error(errorMessage);
}