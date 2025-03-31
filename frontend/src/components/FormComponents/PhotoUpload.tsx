import { useDropzone } from 'react-dropzone';
import { FieldError, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  existingPath?: string | null;
  isEdit?: boolean;
  styles?: {
    wrapper: string;
    label: string;
    field: string;
    error: string;
  };
};

const PhotoUpload = ({ name, existingPath, styles, isEdit }: Props) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [photo, setPhoto] = useState<null | string>(null);

  useEffect(() => {
    if (existingPath && !photo) {
      setPhoto(existingPath);
    }
  }, []);

  const error = errors[name] as FieldError | undefined;

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPhoto(acceptedFiles[0].name);
      setValue(name, acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });

  const handleRemovePhoto = () => {
    setPhoto(null);
    setValue(name, null);
    if (isEdit) {
      setValue('photoDeleted', true);
    }
  };

  return (
    <div className={cn('relative', styles && styles.wrapper)}>
      <Label htmlFor={name} className={styles && styles.label}>
        Photo
      </Label>
      <div
        {...getRootProps()}
        className={cn(
          'border p-4 mt-2 cursor-pointer rounded-sm bg-white shadow text-center text-sm',
          styles && styles.field
        )}
      >
        <input {...getInputProps()} id={name} style={{ display: 'none' }} />

        {photo ? (
          <p className="text-green-600 truncate ">{`${
            isEdit ? 'uploaded photo' : photo
          }`}</p>
        ) : (
          <p>Click or drag file here to upload</p>
        )}
      </div>
      {photo ? (
        <div
          className={cn(
            'mt-2',
            isEdit && 'xs:col-span-full xs:flex xs:justify-end'
          )}
        >
          <Button
            type="button"
            onClick={handleRemovePhoto}
            className="text-xs cursor-pointer"
            size="sm"
            variant="outline"
          >
            Remove Photo
          </Button>
        </div>
      ) : null}
      {fileRejections.length > 0 && (
        <p
          className={cn(
            'absolute top-full left-0  text-[12px] text-red-500',
            styles && styles.error
          )}
        >
          {fileRejections[0].errors[0].message}
        </p>
      )}
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

export default PhotoUpload;
