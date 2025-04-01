import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ('status' in error) {
    if (error.data && typeof error.data === 'object') {
      if ('message' in error.data && typeof error.data.message === 'string') {
        return error.data.message;
      }
    }

    if (error.status === 'FETCH_ERROR') {
      return 'No connection to the server. Please check your internet connection or try again later.';
    }

    return 'error' in error
      ? error.error
      : JSON.stringify(error.data) || 'An unknown error occurred';
  }

  if ('message' in error) {
    return error.message || 'An unknown error occurred';
  }

  return 'An unknown error occurred';
};
