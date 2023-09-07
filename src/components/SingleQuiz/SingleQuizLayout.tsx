"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Container from '../Common/Container';
import LoadingLayout from '../Loading/LoadingLayout';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import { fetchData, updateStudyResults } from '@/api/quizData';
import useSWR from 'swr';
import PrimaryCard from '../Common/Cards/PrimaryCard';
import AnswerButton from '../Common/Buttons/AnswerButton';
import { QuizData, Answer, Question } from '@/models/quizzes';
import Score from './Score/Score';
import QuizHeader from '../Common/Header/QuizHeader';
import { useFormattedQuestions } from '@/hooks/useFormattedQuestion';
import { throttle } from 'lodash';
import { useQuizStore } from '@/store/useQuizStore';
import QuizIntro from './QuizIntro/QuizIntro';

const SingleQuizLayout: React.FC = () => {

  /* Extract URL Params */
  const params = useParams();
  const quizId = params.quiz.toString();

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* State */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { displayQuiz, setDisplayQuiz } = useQuizStore();
  
  const currentQuestion = data?.questions[currentQuestionIndex];
  const finalScore = score.correct - score.incorrect;
  const [updatedQuestions, setUpdatedQuestions] = useState<QuizData['questions']>([]);

  /* Variables */
  const questions = useFormattedQuestions(currentQuestion || null);
  
  const isEndOfQuiz = currentQuestionIndex === data?.questions.length;
  
  const throttledHandleAnswerClick = throttle(
    function handleAnswerClick(isCorrect: boolean, answerIndex: number) {
      if (buttonClicked) {
        return;
      }
      setSelectedAnswerIndex(answerIndex);
      setScore((prevScore) => ({
        ...prevScore,
        correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
        incorrect: isCorrect ? prevScore.incorrect : prevScore.incorrect + 1,
      }));
      setButtonClicked(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswerIndex(null);
        setButtonClicked(false);
      }, 1000);
    },
    400,
    { trailing: false }
  );
  
  useEffect(()=>{
    console.log(data);
    setDisplayQuiz(false);
  //@ts-ignore
  },[data]);

  useEffect(() => {

    if (isEndOfQuiz) {
      const updatedQuestionsCopy = [...data?.questions];

      updatedQuestionsCopy.forEach((question, index) => {
        const isCorrect = index < score.correct;
        question.isCorrect = isCorrect;
      });

      setUpdatedQuestions(updatedQuestionsCopy);

      updateStudyResults(quizId, updatedQuestionsCopy)
        .then((response) => {
          console.log('Study results updated successfully:', response);
        })
        .catch((error) => {
          console.error('Error updating study results:', error);
        });
    }
  //@ts-ignore
  }, [isEndOfQuiz, data, score.correct]);


  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  /* Error State */
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
              {!displayQuiz ? (
                <QuizIntro />
              ) : (
                <>
                  {currentQuestion && (
                    <PrimaryCard question={`${currentQuestionIndex + 1}. ${currentQuestion.questionTitle}`} />
                  )}
                  {currentQuestion && (
                    <div className='mt-8 flex flex-col space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0'>
                      {questions.map((answer: Answer, index: number) => (
                        <AnswerButton
                          key={index}
                          label={answer.answerText}
                          onClick={() => throttledHandleAnswerClick(answer.isCorrect, index)}
                          answerState={selectedAnswerIndex === index ? (answer.isCorrect ? 'correct' : 'incorrect') : null}
                        />
                      ))}
                    </div>
                  )}
                  {isEndOfQuiz && (
                    <Score
                      score={finalScore}
                      onTryAgain={() => setCurrentQuestionIndex(0)}
                    />
                  )}
                </>
              )}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SingleQuizLayout;
