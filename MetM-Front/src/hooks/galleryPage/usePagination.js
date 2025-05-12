import { useCallback } from "react";

export function usePagination(currentPage, totalItems, itemsPerPage) {
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const goToPage = useCallback(
    (setPage, newPage) => {
      setPage((old) => {
        if (newPage < 1) return 1;
        if (newPage > totalPages) return totalPages;
        return newPage;
      });
    },
    [totalPages]
  );

  const prev = useCallback(
    (setPage) => goToPage(setPage, currentPage - 1),
    [currentPage, goToPage]
  );
  const next = useCallback(
    (setPage) => goToPage(setPage, currentPage + 1),
    [currentPage, goToPage]
  );

  return { totalPages, canPrev, canNext, goToPage, prev, next };
}
