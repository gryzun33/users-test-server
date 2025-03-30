import PhotoUpload from '@/components/FormComponents/PhotoUpload';
import SelectInput from '@/components/FormComponents/SelectInput';
import TextInput from '@/components/FormComponents/TextInput';
import FormWrapper from '@/components/FormWrapper';
import { Button } from '@/components/ui/button/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  firstname: string;
  lastname: string;
  location: string;
  weight: number;
  height: number;
  gender: string;
  photoFile: File | null;
};

const CreateUserPage = () => {
  const methods = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper title="Add new user">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <TextInput name="firstname" label="First Name" required={true} />
          <TextInput name="lastname" label="Last Name" required={true} />
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
          <TextInput name="location" label="Location" required={true} />
          <PhotoUpload name="photoFile" />

          <Button
            type="submit"
            className="w-full mt-4 bg-slate-700 cursor-pointer hover:bg-slate-800"
          >
            Submit
          </Button>
        </form>
      </FormWrapper>
    </FormProvider>
  );
};

export default CreateUserPage;
