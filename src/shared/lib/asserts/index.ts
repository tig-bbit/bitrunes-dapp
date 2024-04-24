// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function invariant(predicate: any, errorMessage: string = 'Assertion Failed'): asserts predicate {
	if (!predicate) throw new Error(errorMessage);
}