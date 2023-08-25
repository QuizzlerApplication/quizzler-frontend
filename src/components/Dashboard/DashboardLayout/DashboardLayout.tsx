import React from 'react';
import SubHeader from "@/components/Common/SubHeader/SubHeader";
import Container from "@/components/Common/Container";
import QuizCard from "../Cards/QuizCard";
import DashBoardMenu from '../DashBoardMenu/DashBoardMenu';

const dummyQuizData = [
  {id:'1', topic: "Math", numQuestions: 10,  },
  {id:'2', topic: "Science", numQuestions: 15, },
  {id:'3', topic: "History", numQuestions: 20,  },
  {id:'4', topic: "Art", numQuestions: 16,  },
  // Add more dummy quiz data entries as needed
];

const DashboardLayout = () => {

    /* Fetch quiz data here and map out current quiz, each quiz leads to new dynamic link  */
    return (
        <div className="h-full bg-slate-200 ">
            <Container>
                <DashBoardMenu/>
                <div className="pt-32 sm:pt-28">
                    <SubHeader text="Latest Quizzes" size="small"/>
                </div>
                <div className="space-x-1 pb-28 md:space-x-0 md:grid md:grid-cols-2 gap-5 lg:grid-cols-3">
                    {dummyQuizData.map((quiz, index) => (
                    <QuizCard
                        key={index}
                        topic={quiz.topic}
                        numQuestions={quiz.numQuestions}
                        linkTo={`/dashboard/quiz/${quiz.id}`}
                    />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default DashboardLayout;
