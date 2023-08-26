"use client"
import React from 'react';
import {  useParams } from 'next/navigation'
import Container from '../Common/Container';
import SingleQuizHeader from './SingleQuizHeader';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import SelectMode from './SelectMode';
import { getSingleQuizData} from "@/api/quizData";
import useSWR from 'swr';

const SingleQuizLayout = () => {

  const params = useParams();
  const quizId = params.quiz;

  /* // Fetch quiz data from the API using useSWR
  const { data, error } = useSWR(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    getSingleQuizData,
    {
      revalidateOnFocus: false, // Prevent revalidation on window focus
      refreshInterval: 300000, // Refresh data every 5 minutes
    }
  ); */
 

  return (
    <div className='bg-slate-200 h-full'>
        <Container>
            <SingleQuizHeader/>
            <InformationDisplay mode='toLearn' />
            <SelectMode/>
        </Container>
    </div>
  )
}

export default SingleQuizLayout;