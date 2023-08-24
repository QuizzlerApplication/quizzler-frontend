import React from 'react';

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
