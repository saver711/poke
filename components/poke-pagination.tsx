"use client";
import { cn } from "@/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

interface PokePaginationProps {
	totalPages: number;
	currentPage: number;
	setPage: (page: number) => void;
}

export const PokePagination = ({
	totalPages,
	currentPage,
	setPage,
}: PokePaginationProps) => {
	const MAX_PAGES_TO_SHOW = 5;
	const pages: (number | "ellipsis")[] = [];

	if (totalPages <= MAX_PAGES_TO_SHOW) {
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else {
		pages.push(1);

		if (currentPage > 3) pages.push("ellipsis");

		let start = Math.max(2, currentPage - 1);
		let end = Math.min(totalPages - 1, currentPage + 1);

		if (currentPage <= 3) start = 2;
		if (currentPage >= totalPages - 2) end = totalPages - 1;

		for (let i = start; i <= end; i++) pages.push(i);

		if (currentPage < totalPages - 2) pages.push("ellipsis");

		if (totalPages > 1) pages.push(totalPages);
	}

	const uniquePages = pages.filter(
		(value, index, self) => self.indexOf(value) === index,
	);

	return (
		<Pagination className="mt-10 mb-4">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (currentPage > 1) setPage(currentPage - 1);
						}}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : undefined
						}
					/>
				</PaginationItem>

				{uniquePages.map((pageNumber) => (
					<PaginationItem key={pageNumber}>
						{pageNumber === "ellipsis" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								className={cn({ "bg-red-400": pageNumber === currentPage })}
								isActive={pageNumber === currentPage}
								onClick={() => setPage(pageNumber as number)}
							>
								{pageNumber}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (currentPage < totalPages) setPage(currentPage + 1);
						}}
						aria-disabled={currentPage === totalPages}
						className={
							currentPage === totalPages
								? "pointer-events-none opacity-50"
								: undefined
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
