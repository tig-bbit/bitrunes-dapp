import { invariant } from "../asserts";
import { clamp } from "../clamp";

type PageItem = number | "...";

export const getRange = (start: number, end: number): PageItem[] => {
	invariant(end >= start, `End number must be higher then start number: start ${start}, end ${start}`);

	const rangeLength = end - start + 1;
	return Array(rangeLength)
		.fill(0)
		.map((_, i) => i + start);
};

export const generatePaginationSequence = (currentPage: number, pageCount: number, size: number = 8): PageItem[] => {
	if (pageCount < 1)
		return [];

	if (currentPage < 1) 
		currentPage = 1;

	if (currentPage > pageCount)
		currentPage = pageCount;

	if (size % 2 === 0)
		size += 1;

	if (size < 7)
		size = 7;

	const offset = (size - 1) / 2;
	const shouldAddDots = pageCount > size;

	const rangeConfig = {
		start: clamp(currentPage - offset, 1, shouldAddDots ? pageCount - size + 1 : 1),
		end: clamp(currentPage + offset, size, pageCount),
	};

	const pages = getRange(rangeConfig.start, rangeConfig.end);

	if (shouldAddDots && pages[0] !== 1) {
		pages[0] = 1;
		pages[1] = "...";
	}
	if (shouldAddDots && pages[pages.length - 1] !== pageCount) {
		pages[pages.length - 1] = pageCount;
		pages[pages.length - 2] = "...";
	}
	return pages;
};