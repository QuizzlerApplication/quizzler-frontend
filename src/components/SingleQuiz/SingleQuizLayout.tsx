"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Container from '../Common/Container';
import LoadingLayout from '../Loading/LoadingLayout';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import { fetchData } from '@/api/quizData';
import useSWR from 'swr';
import PrimaryCard from '../Common/Cards/PrimaryCard';
import TertiaryButton from '../Common/Buttons/TertiaryButton';
import { QuizData, Answer } from '@/models/quizzes';
import Score from './Score/Score';
import QuizHeader from '../Common/Header/QuizHeader';
import { shuffleArray } from '@/utils/shuffleArray';

const SingleQuizLayout: React.FC = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* Fetch Data */
  const { data, error, isValidating } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* TODO if we get to the end of the quiz we want to make put request to update */
  /* State */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [questions, setQuestions] = useState<Answer[]>([]);

  /* Variables */
  const currentQuestion = data?.questions[currentQuestionIndex];
  const endOfQuiz = currentQuestionIndex === data?.questions.length;
  const finalScore = score.correct - score.incorrect;

  function handleAnswerClick(isCorrect: boolean, answerIndex: number) {
    setSelectedAnswerIndex(answerIndex);
    if (isCorrect) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswerIndex(null);
    }, 1500);
  }

  useEffect(() => {
    if (currentQuestion) {
      const formattedAnswers = [
        ...currentQuestion.incorrect_answers.map((answer) => ({
          answerText: answer,
          isCorrect: false,
        })),
        {
          answerText: currentQuestion.correct_answer,
          isCorrect: true,
        },
      ];

      setQuestions(shuffleArray(formattedAnswers));
    }
  }, [currentQuestion]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isValidating) {
    return <LoadingLayout />;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className='bg-slate-200 h-full min-h-screen'>
      <Container>
        {data && (
          <Container>
            <QuizHeader headerText={data?.quizTitle} score={finalScore} displayScore={true} />
            <InformationDisplay />
            <div className='mt-8'>
              {currentQuestion && (
                <PrimaryCard question={`${currentQuestionIndex + 1}. ${currentQuestion.questionTitle}`} />
              )}
              {currentQuestion && (
                <div className='mt-8 flex flex-col space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0'>
                  {questions.map((answer, index) => (
                    <TertiaryButton
                      key={index}
                      label={answer.answerText}
                      onClick={() => handleAnswerClick(answer.isCorrect, index)}
                      answerState={
                        selectedAnswerIndex === index
                          ? answer.isCorrect
                            ? 'correct'
                            : 'incorrect'
                          : null
                      }
                    />
                  ))}
                </div>
              )}
              {endOfQuiz && <Score score={finalScore} onTryAgain={() => {}} />}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SingleQuizLayout;
