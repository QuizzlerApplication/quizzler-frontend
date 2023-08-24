import React from 'react';
import Container from '../Common/Container';
import SingleQuizHeader from './SingleQuizHeader';

const SingleQuizLayout = () => {
  return (
    <div className='bg-slate-200 h-screen'>
        <Container>
            <SingleQuizHeader/>
        </Container>
    </div>
  )
}

export default SingleQuizLayout