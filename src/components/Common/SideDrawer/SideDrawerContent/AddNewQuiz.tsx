import React, { useState } from 'react';
import CloseButton from '../../Buttons/CloseButton';
import Container from '../../Container';
import { useSideDrawerStore } from '@/store/useSideDrawerStore';
import { QuizData, Question } from '@/models/quizzes';
import { addQuiz } from '@/api/quizData';

const AddNewQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [newQuestionData, setNewQuestionData] = useState<Question>({
    _id: Math.random().toString(36).substring(7),
    questionTitle: '',
    correct_answer: '',
    incorrect_answers: ['', '', ''],
  });

  const { toggleAddQuizSideDrawer } = useSideDrawerStore();

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestionData]);
    setNewQuestionData({
      _id: Math.random().toString(36).substring(7),
      questionTitle: '',
      correct_answer: '',
      incorrect_answers: ['', '', ''],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuiz: QuizData = {
      __v: 0,
      _id: Math.random().toString(36).substring(7),
      quizTitle: quizTitle,
      questions: questions,
      numberOfCorrectQuestions: 0,
      numberOfQuestions: numberOfQuestions,
    };

    // Here you can perform actions like sending newQuiz data to an API or updating your state.
    addQuiz(newQuiz);
    // After submitting, you can close the side drawer
    toggleAddQuizSideDrawer(false);
  };

  return (
    <div>
      <div className="w-screen h-screen py-4 bg-slate-200">
        <Container>
          {/* Content for your side drawer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className=" text-2xl md:text-3xl font-semibold">Add A New Quiz</h2>
            <CloseButton onClick={() => toggleAddQuizSideDrawer(false)} />
          </div>
          <form onSubmit={handleSubmit}>
            <label className="flex">
              Quiz Title:
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
              />
            </label>
            <button type="button" onClick={handleAddQuestion}>
              Add Question
            </button>

            {/* Question Fields */}
            {questions.map((question, index) => (
              <div key={index}>
                <h3>Question {index + 1}</h3>
                {/* Question input */}
                <input
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  value={question.questionTitle}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].questionTitle = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
                {/* Correct Answer */}
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={question.correct_answer}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].correct_answer = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
                {/* Incorrect Answers */}
                {question.incorrect_answers.map((answer, answerIndex) => (
                  <input
                    key={answerIndex}
                    type="text"
                    placeholder={`Incorrect Answer ${answerIndex + 1}`}
                    value={answer}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].incorrect_answers[answerIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                ))}
              </div>
            ))}

            <button type="submit">Add Quiz</button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AddNewQuiz;
