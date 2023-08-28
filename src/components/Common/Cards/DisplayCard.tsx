import React from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';

interface DisplayCardProps {
  questionTitle: string;
  questionAnswers: string[];
}

const DisplayCard: React.FC<DisplayCardProps> = ({ questionTitle, questionAnswers }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
        <div className=" flex justify-between items-start w-full">
            <h2 className="text-xl font-semibold mb-3 mr-8">{questionTitle}</h2>
            <PrimaryButton label="Edit" onClick={() => {}} />
        </div>
      <ul className="mb-4">
        {questionAnswers.map((answer, index) => (
          <li  key={index} className="mr-2">
            {`${index+1}. ${answer}`}
          </li >
        ))}
      </ul>
    </div>
  );
};

export default DisplayCard;
