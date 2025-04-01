import { useDeleteUserMutation } from '@/api/userApi';
import { ErrorAlert } from '@/components/ErrorAlert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  userId: string;
};

const DeleteUserModal = ({ children, userId }: Props) => {
  const [deleteUser, { isLoading, isError }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (isError)
    return (
      <ErrorAlert>Error during removing user. Try again later.</ErrorAlert>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-700">
            Are you sure you want to delete this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserModal;
