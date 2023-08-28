"use client"
import React from 'react'
import BottomNav from '@/components/Dashboard/Navigation/BottomNav';
import EditQuizLayout from '@/components/EditQuizLayout/EditQuizLayout';
import Modal from '@/components/Common/Modal/Modal';
import { useModalStore } from '@/store/useModalStore';

const page = () => {
  
  return (
    <div> 
      <EditQuizLayout/>
      <BottomNav/>
    </div>
  )
}

export default page;