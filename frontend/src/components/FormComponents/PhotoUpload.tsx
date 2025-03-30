import { useDropzone } from 'react-dropzone';
import { FieldError, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { useState } from 'react';
import { Label } from '../ui/label';

type Props = {
  name: string;
};

const PhotoUpload = ({ name }: Props) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const [photo, setPhoto] = useState<File | null>(null);

  const error = errors[name] as FieldError | undefined;

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPhoto(acceptedFiles[0]);
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
  };

  return (
    <div className="relative">
      <Label htmlFor={name}>Upload Photo</Label>
      <div
        {...getRootProps()}
        className="border p-4 mt-2 cursor-pointer rounded-sm bg-white shadow text-center text-sm"
      >
        <input {...getInputProps()} id={name} style={{ display: 'none' }} />
        {photo ? (
          <p className="text-green-600 truncate"> {photo.name} uploaded</p>
        ) : (
          <p> Click or drag file here to upload</p>
        )}
      </div>
      {photo && (
        <div className="mt-2">
          <Button
            type="button"
            onClick={handleRemovePhoto}
            className=" text-xs cursor-pointer"
            size="sm"
            variant="outline"
          >
            Remove Photo
          </Button>
        </div>
      )}
      {fileRejections.length > 0 && (
        <p className="absolute top-full left-0  text-[12px] text-red-500">
          {fileRejections[0].errors[0].message}
        </p>
      )}
      {error && error.message && (
        <p className="absolute top-full left-0  text-[12px] text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PhotoUpload;
