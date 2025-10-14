import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="bg-gray-200 rounded h-2 mb-5" role="progressbar" aria-valuenow={currentStep+1} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${currentStep+1} of ${totalSteps}`}>
      <div
        className="bg-green-500 h-2 rounded transition-all duration-300"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
