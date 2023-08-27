import Icons from '../../Common/Icons';
import Link from 'next/link';
import { useQuizStore } from '@/store/useQuizStore';

interface SingleQuizHeaderProps {
  headerText: string;
  quizId: string;
}

const EditQuizHeader: React.FC<SingleQuizHeaderProps> = ({ headerText, quizId }) => {
  
  
  return (
    <div className='py-4'>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/quiz/${quizId}`}>
          <p>Start Quiz</p>
        </Link>
        <h1 className='font-bold text-lg'>{headerText}</h1>
        <div className=" flex flex-col">
          <button onClick={() => {} } className='flex'>
            Delete
            <Icons type='question' color='#7861f3' size={25}/>
          </button> 
          <button onClick={() => {} } className='flex'>
            Rename
            <Icons type='question' color='#7861f3' size={25}/>
          </button> 
        </div>
      </div>
    </div>
  );
};

export default EditQuizHeader;
