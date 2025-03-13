interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, text, icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{text}</span>
    </button>
  );
}

export default Button;