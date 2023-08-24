import React from 'react';
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import QuizCard from "../Cards/QuizCard";
import DashBoardMenu from '../DashBoardMenu/DashBoardMenu';

const dummyQuizData = [
  { topic: "Math", numQuestions: 10, linkTo: '/' },
  { topic: "Science", numQuestions: 15, linkTo: '/' },
  { topic: "History", numQuestions: 20, linkTo: '/' },
  // Add more dummy quiz data entries as needed
];

const DashboardLayout = () => {

    /* Fetch quiz data here and map out current quiz, each quiz leads to new dynamic link  */
    return (
        <div className="h-screen bg-slate-200">
            <Container>
                <DashBoardMenu/>
                <div className="pt-32 sm:pt-28">
                    <SubHeader text="Latest Quizzes" size="small"/>
                </div>
                <div className="space-x-1">
                    {dummyQuizData.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        topic={quiz.topic}
                        numQuestions={quiz.numQuestions}
                        linkTo={quiz.linkTo}
                    />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default DashboardLayout;
