import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  isEdit?: boolean;
  styles?: {
    wrapper: string;
    label: string;
    field: string;
    error: string;
  };
};

const SelectInput = ({
  name,
  label,
  options,
  required,
  styles,
  isEdit = false,
}: Props) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  const currentValue = isEdit ? getValues(name) : '';

  useEffect(() => {
    if (isEdit && currentValue !== undefined) {
      setValue(name, currentValue);
    }
  }, [currentValue]);

  return (
    <div className={cn('relative', styles && styles.wrapper)}>
      <Label htmlFor={name} className={styles && styles.label}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        defaultValue={currentValue}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={cn('w-full mt-1', styles && styles.field)}
            >
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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

export default SelectInput;
