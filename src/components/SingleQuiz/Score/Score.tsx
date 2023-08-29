import React from 'react';

interface ScoreProps {
  score: number;
  onTryAgain: () => void;
}

const Score: React.FC<ScoreProps> = ({ score, onTryAgain }) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        {/* Img */}
        {/* <img
          src="/path/to/your/score_image.png"
          alt="Score Image"
          className="mx-auto"
        /> */}
      </div>
      <div className="mb-4">
        Your Score: {score}
      </div>
      <button
        onClick={onTryAgain}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Play Again
      </button>
    </div>
  );
};

export default Score;
