import { useGetOneUserQuery, useUpdateUserMutation } from '@/api/userApi';
import { ErrorAlert } from '@/components/ErrorAlert';
import PhotoUpload from '@/components/FormComponents/PhotoUpload';
import SelectInput from '@/components/FormComponents/SelectInput';
import TextInput from '@/components/FormComponents/TextInput';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button/button';
import { DialogFooter } from '@/components/ui/dialog';
import { RootState } from '@/store/store';
import { EditableUser } from '@/types/user';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const STYLES = {
  wrapper: `xs:grid xs:grid-cols-4 xs:items-center xs:gap-4`,
  label: '',
  field: 'xs:col-span-3',
  error: 'xs:left-[27%]',
};

const EditForm = ({ setOpen }: Props) => {
  const userId = useSelector((state: RootState) => state.user.id);

  const {
    data: user,
    isLoading,
    error,
  } = useGetOneUserQuery(userId, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isLoadingUpdate, error: updateError }] =
    useUpdateUserMutation();

  const methods = useForm<EditableUser>({
    defaultValues: user || {},
  });

  const onSubmit: SubmitHandler<EditableUser> = async (data) => {
    try {
      const formData = new FormData();

      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('address', data.address);
      formData.append('weight', String(data.weight));
      formData.append('height', String(data.height));
      formData.append('gender', String(data.gender));
      if (data.photoDeleted) {
        formData.append('photoDeleted', 'true');
      }
      if (data.photoFile) {
        formData.append('photoFile', data.photoFile);
      }

      await updateUser({
        id: userId,
        formData,
      }).unwrap();
      setOpen(false);
      toast.success('User was updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorAlert>{getErrorMessage(error)}</ErrorAlert>;
  if (updateError)
    return (
      <ErrorAlert>Error during updating user. Try again later.</ErrorAlert>
    );
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
          <PhotoUpload
            name="photoFile"
            existingPath={user.photo}
            styles={STYLES}
            isEdit={true}
          />
        </div>

        <DialogFooter className="mt-3">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isLoadingUpdate}
          >
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default EditForm;
