import { useGetUsersQuery } from '@/api/userApi';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Loader } from '@/components/Loader';
import DynamicPagination from '@/features/DynamicPagination';
import UserList from '@/features/UserList';
import { setPage } from '@/store/slices/paginationSlice';
import { RootState } from '@/store/store';
import { USERS_PER_PAGE } from '@/utils/constants';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const UserListPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const {
    data: { users = [], totalPages = 1 } = {},
    error,
    isLoading,
    isFetching,
  } = useGetUsersQuery({ page: currentPage, limit: USERS_PER_PAGE });

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${USERS_PER_PAGE}`, { replace: true });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = Number(urlParams.get('page')) || 1;

    if (pageFromUrl !== currentPage) {
      dispatch(setPage(pageFromUrl));
    }
  }, [location.search]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert>{getErrorMessage(error)}</ErrorAlert>;
  }

  return (
    <div className="mx-auto xl:max-w-7xl flex flex-col flex-grow w-full ">
      <UserList users={users} />
      <DynamicPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default UserListPage;
