'use client'

import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { StoreApi, createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { invariant } from '~/shared/lib/asserts';
import { Rune } from '~/shared/api/indexer';

interface State {
	runeToMint: Rune | null
}

interface Actions {
	setRuneToMint: (ticker: Rune | null) => void
}

type Store = State & Actions;

function createRuneCrafterStore() {
	return createStore<Store>()((set) => ({
		runeToMint: null,
		setRuneToMint: runeToMint =>
			set(state => ({ ...state, runeToMint }))
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