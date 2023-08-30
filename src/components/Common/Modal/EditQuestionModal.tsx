import React, { useState, useEffect } from 'react';
import { editQuestion } from '@/api/questionData';
import { Question } from '@/models/quizzes';
import Modal from './Modal';
import CloseButton from '../Buttons/CloseButton';
import { useQuestionStore } from '@/store/useQuestionStore';

interface EditQuestionModalProps {
  questionId: string;
  questionData: Question | undefined; // Existing question data to edit
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestionModal = ({ questionId, questionData, isOpen, onClose }: EditQuestionModalProps) => {
  const { editQuestionData, setEditQuestionData } = useQuestionStore();
  const [newQuestionData, setNewQuestionData] = useState<Question | null>(editQuestionData);

  useEffect(() => {
    setNewQuestionData(editQuestionData);
  }, [editQuestionData]);

  const handleInputChange = (inputName: string, value: string) => {
    setNewQuestionData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          [inputName]: value,
        };
      }
      return prevData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newQuestionData) {
        await editQuestion(questionId, newQuestionData); // Update the question
        onClose();
      }
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
          disabled={newQuestionData?.correct_answer === 'True'}
        />
        {/* Incorrect Answers */}
        {Array.isArray(newQuestionData?.incorrect_answers) &&
          newQuestionData?.incorrect_answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answer}
              onChange={(e) => {
                const newIncorrectAnswers = [...(newQuestionData?.incorrect_answers || [])];
                newIncorrectAnswers[index] = e.target.value;
                setNewQuestionData(prevData => ({
                  ...prevData,
                  incorrect_answers: newIncorrectAnswers,
                }));
              }}
              className="mb-2 p-2 border rounded-lg w-full"
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
