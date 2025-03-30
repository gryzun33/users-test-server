import { FieldError, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type Props = {
  name: string;
  label: string;
  required: boolean;
  type?: string;
};

const TextInput = ({ name, label, required, type }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className="relative">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        type={type}
        id={name}
        className="mt-1 bg-white"
      />
      {error && error.message && (
        <p className="absolute top-full left-0  text-[12px] text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
