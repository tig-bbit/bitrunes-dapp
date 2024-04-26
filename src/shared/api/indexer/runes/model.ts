export interface Rune {
	id: string,
	rune_id: string,
	rune_block: number,
	burned: string,
	divisibility: number,
	etching: string,
	terms_amount: number,
	terms_cap: number,
	terms_height_l: string | null,
	terms_height_h: string | null,
	terms_offset_l: string | null,
	terms_offset_h: string | null,
	mints: number,
	number: string,
	premine: string,
	rune_name: string,
	rune_name_wo_spacers: string,
	spacers: string,
	symbol: string,
	timestamp: string,
	turbo: boolean,
	genesis_height: number,
	last_updated_block_height: number,

	progress: number
}

export interface RuneDetails extends Rune {
	supply: number,
	mint_start_block: number,
	mint_end_block: number
}	

export interface RuneHolder {
	pkscript: string
	rune_id: string
	total_balance: number
	wallet_addr: string
}