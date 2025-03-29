import { LucideIcon } from 'lucide-react';

type Props = {
  onClick: () => void;
  Icon: LucideIcon;
};

const IconButton = ({ onClick, Icon }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-2 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default IconButton;
