import React from 'react';
import Icons from '../Icons';

interface CloseButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Icons type='close' size={25} color='#667eea'/>
    </button>
  );
};

export default CloseButton;
