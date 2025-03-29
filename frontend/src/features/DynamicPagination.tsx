import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setPage } from '@/store/slices/paginationSlice';

type Props = {
  totalPages: number;
};

export function DynamicPagination({ totalPages }: Props) {
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const dispatch = useDispatch();

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };
  console.log('currentpage=', currentPage);

  const maxPagesToShow = 3;
  const pages = [];

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPages);

  if (currentPage <= 2) {
    endPage = Math.min(maxPagesToShow, totalPages);
  } else if (currentPage >= totalPages - 1) {
    startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const leftEllipsis = startPage > 1;
  const rightEllipsis = endPage < totalPages;

  return (
    <Pagination>
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

export default DynamicPagination;
