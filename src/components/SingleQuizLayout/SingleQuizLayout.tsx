'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '../Common/Container';
import SingleQuizHeader from './SingleQuizHeader';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import { getSingleQuizData } from '@/api/quizData';
import useSWR from 'swr';
import PrimaryCard from '../Common/Cards/PrimaryCard';
import TertiaryButton from '../Common/Buttons/TertiaryButton';
import { QuizData } from '@/models/quizzes';
import Score from './Score/Score';

const SingleQuizLayout: React.FC = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* Fetch Data */
  const { data, error, isValidating } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    getSingleQuizData, {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* TODO if we get to the end of the quiz we want to make put request to update */

  /* State */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  /* Variables */
  const currentQuestion = data?.questions[currentQuestionIndex];
  const endOfQuiz = (currentQuestionIndex === data?.questions.length);
  const finalScore = score.correct - score.incorrect

  function handleAnswerClick (isCorrect: boolean, answerIndex: number) {
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
  };

  if (isValidating) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className='bg-slate-200 h-full min-h-screen'>
      <Container>
        {data && (
          <Container>
            <SingleQuizHeader headerText={data.quizTitle} score={finalScore} />
            <InformationDisplay />
            <div className='mt-8'>
              {currentQuestion && (
                <PrimaryCard question={`${currentQuestionIndex+1}. ${currentQuestion.questionTitle}`} />
              )}
              <div className="mt-8 flex flex-col space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                {currentQuestion &&
                  currentQuestion.incorrect_answers.map((answer, index) => (
                    <TertiaryButton
                      key={index}
                      label={answer}
                      onClick={() => handleAnswerClick(false, index)}
                      answerState={selectedAnswerIndex === index ? 'incorrect' : null}
                    />
                  ))}
                {currentQuestion && (
                  <TertiaryButton
                    label={currentQuestion.correct_answer}
                    onClick={() => handleAnswerClick(true, currentQuestion.incorrect_answers.length)}
                    answerState={selectedAnswerIndex === currentQuestion.incorrect_answers.length ? 'correct' : null}
                  />
                )}
                {endOfQuiz && <Score score={finalScore} onTryAgain={()=>{}}/>}
              </div>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SingleQuizLayout;
