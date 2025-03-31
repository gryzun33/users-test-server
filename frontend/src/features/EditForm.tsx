import { useGetOneUserQuery } from '@/api/userApi';
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
import { RootState } from '@/store/store';
import { NewUser } from '@/types/user';
import { ReactNode, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

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
  const userId = useSelector((state: RootState) => state.user.id);

  // console.log('userId=', userId);
  const {
    data: user,
    isLoading,
    error,
  } = useGetOneUserQuery(userId, {
    skip: !userId,
  });

  const methods = useForm<NewUser>({
    defaultValues: user || {},
  });

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    console.log('Updated data:', data);
  };

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;
  if (!user) return <div>No user data available</div>;

  // console.log('dataUSER=', user);
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
