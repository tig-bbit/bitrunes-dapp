import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { Icons } from "../icons";
import { invariant } from "~/shared/lib/asserts";
import { useControllableState } from "~/shared/lib/useControllableState";
import { Button, ButtonProps } from "../common";
import { cn } from "~/shared/lib/utils";
import './style.css'

export interface SorterContextState<T extends string> {
	sortBy: T,
	sortDir: 'asc' | 'desc'
}

interface SorterContext<T extends string> {
	params: SorterContextState<T> | null
	setParams: (params: SorterContextState<T>) => void
}

const context = createContext<SorterContext<string> | null>(null);

function useSorterContext() {
	const value = useContext(context);
	invariant(value);
	return value;
}

interface SorterProps<T extends string> extends PropsWithChildren {
	onChange?: (value: SorterContextState<T>) => void
}

function Sorter<T extends string>({ children, onChange }: SorterProps<T>) {
	const [params, setParams] = useControllableState<SorterContextState<T> | null>({
		onChange(value) {
			if (value)
				onChange?.(value);
		}
	});

	const contextValue = useMemo(() => ({ params, setParams }), [params, setParams]);

	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<context.Provider value={contextValue as any}>
			{children}
		</context.Provider>
	);
}

interface SorterButtonProps<T extends string> extends ButtonProps {
	field: T
}

function SorterButton<T extends string>({ field, children, className, ...props }: SorterButtonProps<T>) {
	const { params, setParams } = useSorterContext();
	const currentSortDir = params?.sortBy == field && params?.sortDir;

	return (
		<Button
			variant='ghost'
			{...props}
			className={cn('sorter-button rounded-lg', currentSortDir, className)}
			onClick={() => {
				setParams({
					sortBy: field,
					sortDir: params?.sortDir == 'asc' ? 'desc' : 'asc'
				})
			}}
		>
			{children}
			<div className={cn('text-black-40 light:text-black-60')}>
				<Icons.Switch className='size-[1rem]' />
			</div>
		</Button>
	);
}

export function getSorterComponents<T extends string = string>() {
	return {
		Sorter: Sorter<T>,
		SorterButton: SorterButton<T>
	}
}