'use client'
import Icons from '@/components/Common/Icons';
import React, { useState } from 'react';
import CloseButton from '@/components/Common/Buttons/CloseButton';

const DashBoardMenu = () => {

  /* State */
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [quizData, setQuizData] = useState('');


  const handleAddQuizClick = () => {
    setIsAddingQuiz(true);
  };

  const handleCloseButtonClick = ()=>{
    setIsAddingQuiz(false);
  }

  const handleSaveQuizClick = () => {
    console.log('Quiz data:', quizData);
    handleCloseButtonClick();
    setQuizData('');
  };

  return (
    <div className='absolute top-48 sm:top-38 md:top-38 left-1/2 transform -translate-x-1/2 bg-slate-50 w-3/4 
      max-w-xl px-8 py-6 rounded-xl '>
      <div className="flex items-center justify-between pb-4">
        <h2 className='font-semibold text-md sm:text-lg md:text-lg mb-2'>
          {'Add New Quiz'}
        </h2>
        {isAddingQuiz ? <CloseButton onClick={handleCloseButtonClick} /> : <></>}
      </div>
      {isAddingQuiz ? (
        <div>
          <textarea
            className='w-full h-32 p-2 mb-3 border rounded'
            placeholder='Enter quiz JSON data...'
            value={quizData}
            onChange={(e) => setQuizData(e.target.value)}
          />
          <button
            className='bg-indigo-500 text-white px-4 py-2 rounded'
            onClick={handleSaveQuizClick}
          >
            Save Quiz
          </button>
        </div>
      ) : (
        <p className='text-gray-700 text-left text-sm'>
          Add a new quiz to play and challenge yourself.{' '}
          <button
            className=' text-indigo-500 underline cursor-pointer'
            onClick={handleAddQuizClick}
          >
            Click here to add.
          </button>
        </p>
      )}
    </div>
  );
};

export default DashBoardMenu;
