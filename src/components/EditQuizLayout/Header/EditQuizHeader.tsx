import Icons from '../../Common/Icons';
import Link from 'next/link';
import { useQuizStore } from '@/store/useQuizStore';

interface SingleQuizHeaderProps {
  headerText: string;
}

const EditQuizHeader: React.FC<SingleQuizHeaderProps> = ({ headerText }) => {
  /* State */
  
  return (
    <div className='py-4'>
      <div className="flex justify-between items-center">
        <Link href={'/dashboard'}>
          <p>Start Quiz</p>
        </Link>
        <h1 className='font-bold text-lg'>{headerText}</h1>
        <button onClick={() => {} }>
          <Icons type='question' color='#7861f3' size={25}/>
        </button> 
        <button onClick={() => {} }>
          <Icons type='question' color='#7861f3' size={25}/>
        </button> 
      </div>
    </div>
  );
};

export default EditQuizHeader;
