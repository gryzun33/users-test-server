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
import { USERS_PER_PAGE } from '@/utils/constants';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { usePagination } from '@/hooks/usePagination';

type Props = {
  totalPages: number;
  currentPage: number;
};

const DynamicPagination = memo(({ totalPages, currentPage }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pages, leftEllipsis, rightEllipsis } = usePagination(
    totalPages,
    currentPage
  );

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    navigate(`?page=${page}&limit=${USERS_PER_PAGE}`);
  };

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
});

export default DynamicPagination;
