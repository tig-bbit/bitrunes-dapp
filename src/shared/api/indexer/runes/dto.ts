import { Rune, RuneDetails, RuneHolder } from "./model";

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
export const mapRuneDto = (obj: any): Rune => ({
	...obj,
	mints: Number(obj.mints) > 1e7 ? Infinity : Number(obj.mints),
	terms_cap: Number(obj.terms_cap),
	terms_amount: Number(obj.terms_amount),
	rune_name_wo_spacers: obj.rune_name,
	rune_name: rune_spacers(obj.rune_name, obj.spacers),

	get progress() {
		return !this.terms_cap ? 100 : ((this.mints / this.terms_cap) * 100)
	}
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapRuneDetailsDto = (obj: any): RuneDetails => ({
	...obj,
	...mapRuneDto(obj),
	supply: Number(obj.supply)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapRuneHolderDto = (obj: any): RuneHolder => ({
	...obj,
	total_balance: Number(obj.total_balance)
})