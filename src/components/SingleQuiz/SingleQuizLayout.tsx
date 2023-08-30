"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Container from '../Common/Container';
import LoadingLayout from '../Loading/LoadingLayout';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import { fetchData } from '@/api/quizData';
import useSWR from 'swr';
import PrimaryCard from '../Common/Cards/PrimaryCard';
import AnswerButton from '../Common/Buttons/AnswerButton';
import { QuizData, Answer } from '@/models/quizzes';
import Score from './Score/Score';
import QuizHeader from '../Common/Header/QuizHeader';
import { useFormattedQuestions } from '@/hooks/useFormattedQuestion';
import { useAnswerClickHandler } from '@/utils/useAnswerClickHandeller';
import { throttle } from 'lodash';
const SingleQuizLayout: React.FC = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* TODO if we get to the end of the quiz we want to make put request to update */
  // State for managing quiz progress and score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  
  // Get the current question from the quiz data
  const currentQuestion = data?.questions[currentQuestionIndex];
  const endOfQuiz = currentQuestionIndex === data?.questions.length;
  const finalScore = score.correct - score.incorrect;

  // Use custom hooks for formatted questions and answer click handling
  const questions = useFormattedQuestions(currentQuestion || null);
  
  // Use throttle
  const throttledHandleAnswerClick = throttle(
    function handleAnswerClick(isCorrect: boolean, answerIndex: number) {
      if (buttonClicked) {
        return; // Ignore the click if buttonClicked is already true
      }
      setSelectedAnswerIndex(answerIndex);
      setScore((prevScore) => ({
        ...prevScore,
        correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
        incorrect: isCorrect ? prevScore.incorrect : prevScore.incorrect + 1,
      }));
      setButtonClicked(true); // Set the buttonClicked state to true
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswerIndex(null);
        setButtonClicked(false); // Reset the buttonClicked state after the delay
      }, 1000);
    },
    400, // Set the throttle delay in milliseconds (adjust as needed)
    { trailing: false } // Set trailing to false to ignore subsequent events during the throttle window
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Render loading state, error message, or quiz content
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className='bg-slate-200 h-full min-h-screen pb-32'>
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
                  {questions.map((answer:Answer, index:number) => (
                    <AnswerButton
                      key={index}
                      label={answer.answerText}
                      onClick={() => throttledHandleAnswerClick(answer.isCorrect, index)}
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
              {/* Render score and try again button at the end of the quiz */}
              {endOfQuiz && (
                <Score 
                  score={finalScore} 
                  onTryAgain={() => {}} 
                />
              )}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SingleQuizLayout;
