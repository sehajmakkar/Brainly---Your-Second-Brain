interface SidebarItemProps {
  icon: string;
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, label, count, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
        {count}
      </span>
    </button>
  );
}

export default SidebarItem;