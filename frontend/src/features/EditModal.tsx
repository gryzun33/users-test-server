import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';
import EditForm from './EditForm';

type Props = {
  children: ReactNode;
};

const EditModal = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to this user. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
