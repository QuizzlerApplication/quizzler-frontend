import React, { useState, useEffect } from 'react';
import { editQuestion } from '@/api/questionData'; // Import the function to update a question
import { Question } from '@/models/quizzes';
import Modal from './Modal';
import CloseButton from '../Buttons/CloseButton';
import { useQuestionStore } from '@/store/useQuestionStore';

interface EditQuestionModalProps {
  quizId: string;
  questionData: Question; // Existing question data to edit
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestionModal = ({ quizId, questionData, isOpen, onClose }: EditQuestionModalProps) => {
  const { editQuestionData, setEditQuestionData } = useQuestionStore();
  const [newQuestionData, setNewQuestionData] = useState<Question | null>(editQuestionData);

  useEffect(() => {
    setNewQuestionData(editQuestionData);
  }, [editQuestionData]);

  const handleInputChange = (inputName: string, value: string) => {
    setNewQuestionData(prevData => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editQuestion(newQuestionData, quizId); // Update the question
      onClose();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" flex items-start justify-between">
        <h2 className="text-xl font-semibold mb-4">Edit Question</h2>
        <CloseButton onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Question Title */}
        <input
          type="text"
          placeholder="Question Title"
          value={newQuestionData?.questionTitle || ''}
          onChange={(e) => handleInputChange('questionTitle', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
        />
        {/* Correct Answer */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={newQuestionData?.correct_answer || ''}
          onChange={(e) => handleInputChange('correct_answer', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={questionData.correct_answer === 'True'}
        />
        {/* Incorrect Answers */}
        {newQuestionData?.incorrect_answers?.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => {
              const newIncorrectAnswers = [...newQuestionData?.incorrect_answers || []];
              newIncorrectAnswers[index] = e.target.value;
              handleInputChange('incorrect_answers', newIncorrectAnswers);
            }}
            className="mb-2 p-2 border rounded-lg w-full"
            disabled={questionData.correct_answer === 'True'}
          />
        ))}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 
          to-purple-500 text-white py-2 px-4 rounded"
        >
          Update Question
        </button>
        
      </form>
    </Modal>
  );
};

export default EditQuestionModal;
