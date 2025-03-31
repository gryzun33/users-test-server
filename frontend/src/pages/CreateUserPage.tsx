import { useCreateUserMutation } from '@/api/userApi';
import PhotoUpload from '@/components/FormComponents/PhotoUpload';
import SelectInput from '@/components/FormComponents/SelectInput';
import TextInput from '@/components/FormComponents/TextInput';
import FormWrapper from '@/components/FormWrapper';
import { Button } from '@/components/ui/button/button';
import { NewUser } from '@/types/user';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const CreateUserPage = () => {
  const methods = useForm<NewUser>();
  const navigate = useNavigate();

  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    console.log('Submitted data:', data);

    try {
      const formData = new FormData();

      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('address', data.address);
      formData.append('weight', String(data.weight));
      formData.append('height', String(data.height));
      formData.append('gender', String(data.gender));

      if (data.photoFile) {
        formData.append('photoFile', data.photoFile);
      }
      await createUser(formData).unwrap();
      navigate('/users');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  if (isError) {
    return <div>Something went wrong. Try again later</div>;
  }

  return (
    <FormProvider {...methods}>
      <FormWrapper title="Add new user">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <TextInput name="firstName" label="First Name" required={true} />
          <TextInput name="lastName" label="Last Name" required={true} />
          <SelectInput
            name="gender"
            label="Gender"
            options={['male', 'female', 'other']}
            required
          />
          <TextInput
            name="weight"
            label="Weight"
            required={true}
            type="number"
          />
          <TextInput
            name="height"
            label="Height"
            required={true}
            type="number"
          />
          <TextInput name="address" label="Location" required={true} />
          <PhotoUpload name="photoFile" />

          <Button
            type="submit"
            className="w-full mt-4 bg-slate-700 cursor-pointer hover:bg-slate-800"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};

export default CreateUserPage;
