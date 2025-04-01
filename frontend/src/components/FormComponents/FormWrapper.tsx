import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: Props) => {
  return (
    <div className="mx-auto p-5 border bg-slate-100 text-slate-700 w-full xs:max-w-[400px] rounded-sm shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;
