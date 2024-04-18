import { useEffect, useState } from "react";

interface Props {
	defaultValue?: boolean,
	threshold?: number
}

export function useWindowScroll({ defaultValue = false, threshold = 100 }: Props = {}) {
	const [isScrolled, setIsScrolled] = useState(defaultValue);

	useEffect(() => {
		const listener = () => setIsScrolled(window.scrollY > threshold);
		listener();

		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('scroll', listener);
		}
	}, [threshold]);

	return isScrolled;
}