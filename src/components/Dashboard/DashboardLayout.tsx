"use client";
import React from "react";
import useSWR from "swr";
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import QuizCard from "./Cards/QuizCard";
import DashBoardMenu from "./DashBoardMenu/DashBoardMenu";
import { QuizData } from "@/models/quizzes";
import { fetchData } from "@/api/quizData";

const DashboardLayout = () => {
  
  // Fetch quiz data from the API using useSWR
  const { data, error, isLoading  } = useSWR(
    "https://quizzlerreactapp.onrender.com/api/quizzes",
    fetchData,
    {
      revalidateOnFocus: false, // Prevent revalidation on window focus
      refreshInterval: 300000, // Refresh data every 5 minutes
    }
  );

  // Handle loading and error states
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  /* Map over the fetched quiz data and render QuizCard components */
  return (
    <div className="h-full min-h-screen bg-slate-200 ">
      <Container>
        <DashBoardMenu />
        <div className="pt-32 sm:pt-28">
          <SubHeader text="Latest Quizzes" size="small" />
        </div>
        <div className="space-x-1 space-y-6 pb-28 md:space-x-0 md:space-y-0 
          md:grid md:grid-cols-2 gap-6 lg:grid-cols-3 3xl:grid-cols-4 xl:gap-7"
        >
          {data ? (
            data.map((quiz: QuizData, index: number) => (
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