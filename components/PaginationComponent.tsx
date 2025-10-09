import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "./ui/button";

const PaginationComponent = ({ pageNumber }: { pageNumber: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > pageNumber) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (pageNumber <= 5) {
      return Array.from({ length: pageNumber }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", pageNumber];
    }

    if (currentPage >= pageNumber - 2) {
      return [1, "...", pageNumber - 1, pageNumber - 1, pageNumber];
    }

    return [
      1,
      "...",
      pageNumber - 1,
      currentPage,
      currentPage + 1,
      "...",
      pageNumber,
    ];
  };

  return (
    <Pagination>
      {pageNumber !== 1 && (
        <PaginationContent>
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <PaginationItem key={idx}>
                <PaginationLink
                  href={`/politics?page=${currentPage + 1}`}
                  isActive={currentPage === idx + 1}
                >
                  <Button
                    onClick={() => handlePageClick(page as number)}
                    disabled={currentPage === 1}
                  >
                    {page}
                  </Button>
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
