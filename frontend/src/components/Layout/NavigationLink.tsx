import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

type Props = {
  Icon: LucideIcon;
  path: string;
  text: string;
};

const NavigationLink = ({ Icon, path, text }: Props) => {
  return (
    <Link
      to={path}
      className="flex sm:min-w-[185px] gap-2 px-4 py-2 bg-currentColor border-[1px] border-slate-300 text-slate-200 hover:text-white font-medium rounded-lg hover:bg-slate-500 transition-colors"
    >
      <Icon />
      <span className="hidden sm:inline"> {text}</span>
    </Link>
  );
};

export default NavigationLink;
