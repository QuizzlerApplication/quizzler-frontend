"use client"
import React from 'react'
import BottomNav from '@/components/Dashboard/Navigation/BottomNav';
import EditQuizLayout from '@/components/EditQuizLayout/EditQuizLayout';

const page = () => {
  return (
    <div> 
      <EditQuizLayout/>
      <BottomNav/>
    </div>
  )
}

export default page;