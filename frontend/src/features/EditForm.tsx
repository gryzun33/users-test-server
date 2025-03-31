import { useGetOneUserQuery } from '@/api/userApi';
import SelectInput from '@/components/FormComponents/SelectInput';
import TextInput from '@/components/FormComponents/TextInput';
import { Button } from '@/components/ui/button/button';
import { DialogFooter } from '@/components/ui/dialog';
import { RootState } from '@/store/store';
import { EditableUser } from '@/types/user';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const STYLES = {
  wrapper: `xs:grid xs:grid-cols-4 xs:items-center xs:gap-4`,
  label: '',
  field: 'xs:col-span-3',
  error: 'xs:left-[27%]',
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

  const methods = useForm<EditableUser>({
    defaultValues: user || {},
  });

  const onSubmit: SubmitHandler<EditableUser> = async (data) => {
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
          <SelectInput
            name="gender"
            label="Gender"
            options={['male', 'female', 'other']}
            required
            styles={STYLES}
            isEdit={true}
          />
          <TextInput
            name="weight"
            label="Weight"
            required={true}
            type="number"
            styles={STYLES}
            isEdit={true}
          />
          <TextInput
            name="height"
            label="Height"
            required={true}
            type="number"
            styles={STYLES}
            isEdit={true}
          />
          <TextInput
            name="address"
            label="Location"
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
