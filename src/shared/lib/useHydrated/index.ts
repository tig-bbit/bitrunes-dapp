import { useEffect, useState } from "react";

export function useIsMounted() {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => setIsMounted(true), []);

	return isMounted;
}

let hydrating = true;

export function useIsHydrated() {
	const [hydrated, setHydrated] = useState(() => !hydrating);

	useEffect(function hydrate() {
		hydrating = false;
		setHydrated(true);
	}, []);

	return hydrated;
}