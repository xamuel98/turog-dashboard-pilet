import React from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Logic to show a window of pages if too many
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) return [...pages.slice(0, 5), "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", ...pages.slice(totalPages - 5)];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="c-pagination">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="c-button c-button--icon-only c-button--tertiary"
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      <div className="c-pagination__pages">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <Button
                onClick={() => onPageChange(page as number)}
                className={clsx(
                  "c-button c-button--icon-only",
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                data-active-page={currentPage === page}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="c-button c-button--icon-only c-button--tertiary"
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
