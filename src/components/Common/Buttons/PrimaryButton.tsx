import React from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
