"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Common/Buttons/SecondaryButton';
import { cardVariant } from '@/variants/variants';

interface QuizCardProps {
  topic: string;
  numQuestions: number;
  linkTo:string
}

const QuizCard = ({ topic, numQuestions,linkTo }:QuizCardProps) => {

    return (
        <motion.div  whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
            <Link href={linkTo}>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center ">
                    <div
                        className="w-5 h-5 rounded-full mr-3  flex-none bg-gradient-to-r from-indigo-500 to-purple-500 "
                    ></div>
                    <div className='ml-3 flex-grow w-32'>
                        <h3 className="text-lg font-semibold truncate ">{topic}</h3>
                        <p className="text-md font-regular mb-1">{`${numQuestions}/${numQuestions}`}</p>
                    </div>
                    <div className="space-x-4 flex flex-col xs:flex-row justify-end items-center">
                        <Link href={`${linkTo}/edit`}>
                            <SecondaryButton label='Edit' onClick={()=>{123}}/>
                        </Link>
                        <Link href={linkTo}>
                            <PrimaryButton label='Study' onClick={()=>{123}}/>
                        </Link>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default QuizCard;