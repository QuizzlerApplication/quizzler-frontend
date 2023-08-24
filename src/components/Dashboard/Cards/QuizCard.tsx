"use client"
import Link from 'next/link';
import { getRandomColor } from '@/utils/getRandomColor';
import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Common/Buttons/SecondaryButton';

interface QuizCardProps {
  topic: string;
  numQuestions: number;
  linkTo:string
}

const QuizCard = ({ topic, numQuestions,linkTo }:QuizCardProps) => {

    return (
        <Link href={linkTo}>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <div
                    className="w-5 h-5 rounded-full mr-3 flex-none bg-gradient-to-r from-indigo-500 to-purple-500 "
                ></div>
                <div className='ml-3 flex-grow'>
                    <h3 className="text-lg font-semibold">{topic}</h3>
                    <p className="text-md font-regular mb-1">{`${numQuestions}/${numQuestions}`}</p>
                </div>
                <div className="">

                    <button>
                        Edit
                    </button>
                    <PrimaryButton label='Start' onClick={()=>{123}}/>
                    <SecondaryButton label='Start' onClick={()=>{123}}/>
                </div>
            </div>
        </Link>
    );
}

export default QuizCard;
