import { useGetUsersQuery } from '@/api/userApi';
import DynamicPagination from '@/features/DynamicPagination';
import UserList from '@/features/UserList';
import { setPage } from '@/store/slices/paginationSlice';
import { RootState } from '@/store/store';
import { USERS_PER_PAGE } from '@/utils/constants';
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

  // console.log('currentpageList=', currentPage);

  const {
    data: { users = [], totalPages = 1 } = {},
    error,
    isLoading,
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

  useEffect(() => {
    if (users.length === 0 && currentPage > totalPages) {
      const newPage = totalPages > 1 ? totalPages : 1;
      dispatch(setPage(newPage));
      navigate(`?page=${newPage}&limit=${USERS_PER_PAGE}`, { replace: true });
    }
  }, [totalPages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }
  return (
    <div className="mx-auto xl:max-w-7xl flex flex-col flex-grow">
      <UserList users={users} />
      <DynamicPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default UserListPage;
