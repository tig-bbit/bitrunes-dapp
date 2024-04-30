export const ApiOkResponse = <TName extends string, TData>
	(type: TName, data: TData) => ({
		data: { type, ...data },
		error: null
	});

export const ApiErrorResponse = <TName extends string, TData = undefined>
	(type: TName, data: TData) => ({
		data: null,
		error: { type, ...data }
	});

export const UnknownApiError = ApiErrorResponse('unknown', { message: 'Unknown error' as const });