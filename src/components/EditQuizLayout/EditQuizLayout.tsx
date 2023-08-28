import React, { useEffect } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { useParams } from "next/navigation";
import EditQuizHeader from "./Header/EditQuizHeader";
import Container from "../Common/Container";
import { QuizData } from "@/models/quizzes";
import PrimaryCard from "../Common/Cards/PrimaryCard";
import { DeleteQuizModal, RenameQuizModal } from "../Common/Modal/Modal";
import { useModalStore } from "@/store/useModalStore";
import DisplayCard from "../Common/Cards/DisplayCard";
import AddButton from "../Common/Buttons/AddButton";
import LoadingLayout from "../LoadingLayout/LoadingLayout";
import QuizHeader from "../Common/Header/QuizHeader";

const EditQuizLayout = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* State */
  const {
    isModalOpen,
    isDeleteModalOpen,
    isRenameModalOpen,
    toggleModal,
    toggleDeleteModal,
    toggleRenameModal,
  } = useModalStore((state) => ({
    isModalOpen: state.isModalOpen,
    isDeleteModalOpen: state.isDeleteModalOpen,
    isRenameModalOpen: state.isRenameModalOpen,
    toggleModal: state.toggleModal,
    toggleDeleteModal: state.toggleDeleteModal,
    toggleRenameModal: state.toggleRenameModal,
  }));

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* Variables */
  const quizHeader = data?.quizTitle ?? 'Loading...';
  const questions = data?.questions; // Extract the questions from the fetched data

  /* useEffect(() => {
    console.log(data);
  }, [data]);
 */

  if (isValidating || isLoading) {
    return <LoadingLayout/>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className=" bg-slate-200 h-full min-h-screen pb-24">
      <Container>
        {isDeleteModalOpen && (
          <DeleteQuizModal
            isOpen={isDeleteModalOpen}
            onClose={() => toggleDeleteModal(false)}
          />
        )}
        {isRenameModalOpen && (
          <RenameQuizModal
            isOpen={isRenameModalOpen}
            onClose={() => toggleRenameModal(false)}
          />
        )}
        <QuizHeader headerText={quizHeader} displayScore={false} />
        <div className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 ">
          {questions?.map((question) => (
            <DisplayCard
              key={question?._id}
              questionTitle={question?.questionTitle}
              questionAnswers={[
                ...question?.incorrect_answers, question?.correct_answer,
              ]}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-6">
          <AddButton onClick={()=>{}}/>
        </div>
      </Container>
    </div>
  );
};

export default EditQuizLayout;
