"use client"
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



const SingleQuizLayout: React.FC = () => {
  const params = useParams();
  const quizId = params.quiz;

  const { data, error, isValidating } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    getSingleQuizData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* State */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const currentQuestion = data?.questions[currentQuestionIndex];

  return (
    <div className='bg-slate-200 h-full min-h-screen'>
      <Container>
        {data && (
          <>
            <SingleQuizHeader headerText={data.quizTitle} score={score.correct - score.incorrect}/>
            <InformationDisplay />
            <div className='mt-8'>
              {currentQuestion && (
                <PrimaryCard question={currentQuestion.questionTitle} />
              )}
              <div className="mt-8 flex flex-col space-y-5">
                {currentQuestion &&
                  currentQuestion.incorrect_answers.map((answer, index) => (
                    <TertiaryButton
                      key={index}
                      label={answer}
                      onClick={() => handleAnswerClick(false)}
                      answerState={null}
                    />
                  ))}
                {currentQuestion && (
                  <TertiaryButton
                    label={currentQuestion.correct_answer}
                    onClick={() => handleAnswerClick(true)}
                    answerState={null}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default SingleQuizLayout;
