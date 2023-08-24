"use client"
import React from 'react'
import Icons from '../Common/Icons'
import Link from 'next/link'

const SingleQuizHeader = () => {
  return (
    <div className=' py-4'>
        <div className="flex justify-between items-center">
            <Link href={'/dashboard'}>
                <Icons type='back' color='#7861f3' size={25}/>
            </Link>
            <h1 className='font-bold  text-lg'>Math</h1>
            <Icons type='question' color='#7861f3' size={25}/>
        </div>
    </div>
  )
}

export default SingleQuizHeader