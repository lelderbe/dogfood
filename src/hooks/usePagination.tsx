import { useState } from 'react';

export default function usePagination<T>(items: T[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const countPages = Math.ceil(items.length / itemsPerPage);
	const MIN_PAGE = 1;

	function getCurrentData() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;

		return items.slice(start, end);
	}

	function nextPage() {
		setCurrentPage((prev) => Math.min(prev + 1, countPages));
	}

	function prevPage() {
		setCurrentPage((prev) => Math.max(prev - 1, MIN_PAGE));
	}

	function setPagePaginated(page: number) {
		const pageNumber = Math.max(MIN_PAGE, page);
		setCurrentPage(Math.min(pageNumber, countPages));
	}

	return { getCurrentData, countPages, currentPage, nextPage, prevPage, setPagePaginated };
}
