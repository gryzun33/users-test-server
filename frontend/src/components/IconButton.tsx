import { LucideIcon } from 'lucide-react';

type Props = {
  onClick: () => void;
  Icon: LucideIcon;
};

const IconButton = ({ onClick, Icon }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-200 transition-colors`}
    >
      <Icon />
    </button>
  );
};

export default IconButton;
