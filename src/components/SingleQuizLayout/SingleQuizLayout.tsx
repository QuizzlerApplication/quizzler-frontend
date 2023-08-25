"use client"
import React , {useState} from 'react';
import Container from '../Common/Container';
import SingleQuizHeader from './SingleQuizHeader';
import InformationDisplay from './InformationDisplay/InformationDisplay';
import SelectMode from './SelectMode';

const SingleQuizLayout = () => {


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