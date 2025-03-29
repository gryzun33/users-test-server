import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useDispatch } from 'react-redux';
import { setPage } from '@/store/slices/paginationSlice';
import { MAX_PAGES_SHOW, USERS_PER_PAGE } from '@/utils/constants';
import { memo } from 'react';
import { useNavigate } from 'react-router';

const DynamicPagination = memo(
  ({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handlePageChange = (page: number) => {
      dispatch(setPage(page));
      navigate(`?page=${page}&limit=${USERS_PER_PAGE}`);
    };

    const pages = [];

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage <= 2) {
      endPage = Math.min(MAX_PAGES_SHOW, totalPages);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(totalPages - MAX_PAGES_SHOW + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const leftEllipsis = startPage > 1;
    const rightEllipsis = endPage < totalPages;

    return (
      <Pagination className="mb-0 mt-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {leftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map((page) =>
            currentPage === page ? (
              <PaginationItem key={page}>
                <PaginationLink isActive onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {rightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
);

export default DynamicPagination;
