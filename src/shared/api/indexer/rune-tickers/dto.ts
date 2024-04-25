function rune_spacers(runeName: string, spacersString: string) {
	let result = "";
	let index = 0;
	const bitmask = parseInt(spacersString, 10);
	for (const char of runeName) {
		result += char;
		if ((bitmask & (1 << index)) !== 0) {
			result += '•';
		}
		index++;
	}
	
	return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapRuneDto = (obj: any) => ({
	...obj,
	rune_name: rune_spacers(obj.rune_name, obj.spacers),
})