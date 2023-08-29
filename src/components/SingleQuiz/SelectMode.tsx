import React, { useState } from 'react';

const SelectMode: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Select Quiz Mode</h2>
        {selectedMode ? (
          <p className="mb-4">
            You have selected <strong>{selectedMode}</strong> mode.
          </p>
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95"
              onClick={() => handleSelectMode('toLearn')}
            >
              To-Learn Mode
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95"
              onClick={() => handleSelectMode('regular')}
            >
              Regular Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMode;
