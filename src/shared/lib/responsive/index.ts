import config from '../../../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useMediaQuery } from 'react-responsive';
import { useIsHydrated } from '../useHydrated';

const fullConfig = resolveConfig(config);
const theme = fullConfig.theme;
const breakpoints = theme.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
	const hydrated = useIsHydrated();
	const bool = useMediaQuery({
		query: `(min-width: ${breakpoints[breakpointKey]})`,
	});
	const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
	type Key = `is${Capitalize<K>}`;

	return { [`is${capitalizedKey}`]: hydrated ? bool : false  } as Record<Key, boolean>;
}