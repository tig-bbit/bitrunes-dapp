'use client'

import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { StoreApi, createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { invariant } from '~/shared/lib/asserts';

interface State {
	runeTickerToMint: string | null
}

interface Actions {
	setRuneToMint: (ticker: string) => void
}

type Store = State & Actions;

function createRuneCrafterStore() {
	return createStore<Store>()((set) => ({
		runeTickerToMint: null,
		setRuneToMint: runeTickerToMint =>
			set(state => ({ ...state, runeTickerToMint }))
	}))
}

const context = createContext<StoreApi<Store> | null>(null);

export function RuneCrafterStoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef(createRuneCrafterStore());

	return (
		<context.Provider value={storeRef.current}>
			{children}
		</context.Provider>
	);
}

export function useRuneCrafterStoreApi() {
	const value = useContext(context);
	invariant(value);
	return value;
}

export function useRuneCrafterStore<T>(selector: (store: Store) => T) {
	const storeApi = useRuneCrafterStoreApi();
	return useStore(storeApi, selector);
}