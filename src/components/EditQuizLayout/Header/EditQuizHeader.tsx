import React from 'react';
import Icons from '../../Common/Icons';
import Link from 'next/link';
import { useModalStore } from '@/store/useModalStore';
import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';

interface SingleQuizHeaderProps {
  headerText: string | undefined;
  quizId: string | string[];
}

const EditQuizHeader: React.FC<SingleQuizHeaderProps> = ({ headerText, quizId }) => {
  const { 
    toggleDeleteModal, toggleRenameModal, 
    isModalOpen, toggleModal, isDeleteModalOpen, 
    isRenameModalOpen 
  } = useModalStore();

  const handleDeleteClick = () => {
    toggleDeleteModal(true);
  };

  const handleRenameClick = () => {
    toggleRenameModal(true);
  };

  return (
    <div className='py-4'>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/quiz/${quizId}`}>
          <PrimaryButton label='Start Quiz'/>
        </Link>
        <h1 className='font-bold text-lg'>{headerText}</h1>
        <div className=" flex flex-col">
          <button onClick={handleDeleteClick} className='flex justify-between '>
            <p className='text-indigo-600 hover:underline mr-5'>Delete</p>
            <Icons type='delete' color='#7861f3' size={25}/>
          </button> 
          <button onClick={handleRenameClick} className='flex justify-between'>
            <p className='text-indigo-600 hover:underline'>Edit</p>
            <Icons type='edit' color='#7861f3' size={25}/>
          </button> 
        </div>
      </div>
    </div>
  );
};

export default EditQuizHeader;
