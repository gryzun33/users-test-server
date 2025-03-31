import TextInput from '@/components/FormComponents/TextInput';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NewUser } from '@/types/user';
import { ReactNode } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import EditForm from './EditForm';

const defaultUser: NewUser = {
  firstName: 'fff',
  lastName: 'fff',
  height: 0,
  weight: 0,
  gender: 'other',
  address: '',
  photoFile: null,
};

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
