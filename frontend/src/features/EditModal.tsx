import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import EditForm from './EditForm';

type Props = {
  children: ReactNode;
};

const EditModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to this user. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
