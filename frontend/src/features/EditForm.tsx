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

const defaultUser: NewUser = {
  firstName: 'fff',
  lastName: 'fff',
  height: 0,
  weight: 0,
  gender: 'other',
  address: '',
  photoFile: null,
};

const STYLES = {
  wrapper: `grid grid-cols-4 items-center gap-4`,
  label: 'text-right',
  field: 'col-span-3',
  error: 'left-[27%]',
};

const EditForm = () => {
  const methods = useForm<NewUser>({
    defaultValues: defaultUser,
  });

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    console.log('Updated data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4 text-slate-700">
          <TextInput
            name="firstName"
            label="First Name"
            required={true}
            styles={STYLES}
            isEdit={true}
          />
          <TextInput
            name="lastName"
            label="Last Name"
            required={true}
            styles={STYLES}
            isEdit={true}
          />
        </div>
        <DialogFooter className="mt-3">
          <Button type="submit" className="cursor-pointer">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default EditForm;
