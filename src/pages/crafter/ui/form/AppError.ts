export type AppError = {
	type: string;
	message: string;
};

export function isAppError(value: unknown): value is AppError {
	return typeof value == 'object' && value !== null && 'type' in value && 'message' in value;
}
