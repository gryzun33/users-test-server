import { backendUrl } from './constants';

export const getPhotoUrl = (photo: string | null): string => {
  if (!photo) return '';

  const isExternalPhoto = photo.startsWith('http');
  return isExternalPhoto ? photo : `${backendUrl}${photo}`;
};
