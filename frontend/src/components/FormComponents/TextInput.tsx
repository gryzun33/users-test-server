import { FieldError, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label: string;
  required: boolean;
  type?: string;
  isEdit?: boolean;
  styles?: {
    wrapper: string;
    label: string;
    field: string;
    error: string;
  };
};

const TextInput = ({
  name,
  label,
  required,
  type,
  styles,
  isEdit = false,
}: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className={cn('relative', styles && styles.wrapper)}>
      <Label htmlFor={name} className={styles && styles.label}>
        {label}
      </Label>
      <Input
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        type={type}
        id={name}
        defaultValue={isEdit && getValues(name)}
        className={cn('mt-1 bg-white', styles && styles.field)}
      />
      {error && error.message && (
        <p
          className={cn(
            'absolute top-full left-0  text-[12px] text-red-500',
            styles && styles.error
          )}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
