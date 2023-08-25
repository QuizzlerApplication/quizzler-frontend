"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import QuizCard from "../Cards/QuizCard";
import DashBoardMenu from "../DashBoardMenu/DashBoardMenu";

const DashboardLayout = () => {
  interface Question {
    _id: string;
    questionTitle: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  interface Quiz {
    _id: string;
    quizTitle: string;
    questions: Question[];
  }

  // Fetch quiz data from the API using useSWR
  const { data, error } = useSWR(
    "https://quizzlerreactapp.onrender.com/api/quizzes"
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
  // Handle loading and error states
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  /* Map over the fetched quiz data and render QuizCard components */
  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Container>
        <DashBoardMenu />
        <div className="pt-32 sm:pt-28">
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <div className="space-x-1 pb-28 md:space-x-0 md:grid md:grid-cols-2 gap-5 lg:grid-cols-3">
          {data ? (
            data.map((quiz: Quiz, index: number) => (
              <QuizCard
                key={index}
                topic={quiz.quizTitle}
                numQuestions={quiz.questions.length}
                linkTo={`/dashboard/quiz/${quiz._id}`}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DashboardLayout;