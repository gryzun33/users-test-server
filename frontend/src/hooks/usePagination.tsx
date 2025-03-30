import { MAX_PAGES_SHOW } from '@/utils/constants';
import { useMemo } from 'react';

export const usePagination = (totalPages: number, currentPage: number) => {
  const pages = useMemo(() => {
    const result: number[] = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage <= 2) {
      endPage = Math.min(MAX_PAGES_SHOW, totalPages);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(totalPages - MAX_PAGES_SHOW + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    return result;
  }, [currentPage, totalPages]);

  const leftEllipsis = currentPage > 2 && totalPages > 3;
  const rightEllipsis = currentPage < totalPages - 1 && totalPages > 3;

  return {
    pages,
    leftEllipsis,
    rightEllipsis,
  };
};
