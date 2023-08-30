import React, { useState, useEffect } from 'react';
import { editQuestion } from '@/api/questionData'; // Import the function to update a question
import { Question } from '@/models/quizzes';
import Modal from './Modal';
import Icons from '../Icons';
import CloseButton from '../Buttons/CloseButton';

interface EditQuestionModalProps {
    quizId: string;
    questionData: Question; // Existing question data to edit
    isOpen: boolean;
    onClose: () => void;
}

const EditQuestionModal = ({quizId, questionData, isOpen, onClose }: EditQuestionModalProps) => {
  const [editedQuestionData, setEditedQuestionData] = useState<Question>(questionData);

  useEffect(() => {
    setEditedQuestionData(questionData);
  }, [questionData]);

  const handleInputChange = (inputName: string, value: string) => {
    setEditedQuestionData({ ...editedQuestionData, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editQuestion(editedQuestionData, 123); // Update the question
      onClose();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Question</h2>
      <form onSubmit={handleSubmit}>
        {/* Question Title */}
        <input
          type="text"
          placeholder="Question Title"
          value={editedQuestionData?.questionTitle}
          onChange={(e) => handleInputChange('questionTitle', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
        />

        {/* Question Type */}
        <select
          value={editedQuestionData?.correct_answer === 'True' ? 'truefalse' : 'other'}
          onChange={(e) => {
            if (e.target.value === 'truefalse') {
              setEditedQuestionData({
                ...editedQuestionData,
                correct_answer: 'True',
                incorrect_answers: ['False'],
              });
            } else {
              setEditedQuestionData({
                ...editedQuestionData,
                correct_answer: '',
                incorrect_answers: ['', '', ''],
              });
            }
          }}
          className="mb-2 p-2 border rounded-lg w-full"
        >
          <option value="truefalse">True/False</option>
          <option value="other">Other</option>
        </select>

        {/* Correct Answer */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={editedQuestionData?.correct_answer}
          onChange={(e) => handleInputChange('correct_answer', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={editedQuestionData?.correct_answer === 'True'}
        />

        {/* Incorrect Answers */}
        {editedQuestionData?.incorrect_answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => {
              const newIncorrectAnswers = [...editedQuestionData?.incorrect_answers];
              newIncorrectAnswers[index] = e.target.value; // Assign the new value to the correct index
              handleInputChange('incorrect_answers', newIncorrectAnswers);
            }}
            className="mb-2 p-2 border rounded-lg w-full"
            disabled={editedQuestionData?.correct_answer === 'True'}
          />
        ))}

        {editedQuestionData?.incorrect_answers.length < 3 && editedQuestionData?.correct_answer !== 'True' && (
          <button
            type="button"
            onClick={() =>
              setEditedQuestionData({
                ...editedQuestionData,
                incorrect_answers: [...editedQuestionData?.incorrect_answers, ''],
              })
            }
            className="mb-2 bg-gray-300 py-1 px-2 rounded"
          >
            Add Answer
          </button>
        )}

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
