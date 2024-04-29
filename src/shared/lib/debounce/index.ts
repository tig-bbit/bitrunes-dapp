import { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any) => void>(func: T, delayMs: number) {
	const intervalRef = useRef<NodeJS.Timeout>();

	return function (...args: Parameters<T>) {
		if (intervalRef.current)
			clearTimeout(intervalRef.current);
		intervalRef.current = setTimeout(() => func.apply(null, [...args]), delayMs);
	};
}

export function useDebouncedState<S = undefined>(delay: number, initialState: S) {
	const [state, setState] = useState(initialState);
	const debouncedSetState = useDebounce(setState, delay);

	return [state, debouncedSetState, setState] as const;
}