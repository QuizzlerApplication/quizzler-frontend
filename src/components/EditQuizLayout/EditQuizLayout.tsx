import { useEffect } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { useParams } from "next/navigation";
import EditQuizHeader from "./Header/EditQuizHeader"
import Container from "../Common/Container"
import { QuizData } from "@/models/quizzes";

const EditQuizLayout = () => {

  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;


  /* Fetch Data */
  const { data, error, isValidating , isLoading} = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData, {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

    useEffect(()=>{
      console.log(data);
    },[data]);

  if (isValidating || isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <>
        <Container>
            <EditQuizHeader headerText={data?.quizTitle} quizId={quizId}/>
        </Container>
    </>
  )
}

export default EditQuizLayout