import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';

type Props = {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
};

const SelectInput = ({ name, label, options, required }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div className="relative">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full mt-1">
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
        <p className="absolute top-full left-0 text-[12px] text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
