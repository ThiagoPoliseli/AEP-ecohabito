import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

const ResetButton: React.FC = () => {
  const { resetDailyTasks } = useTasks();
  const [isResetting, setIsResetting] = useState(false);
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all tasks? This will mark all tasks as incomplete.')) {
      setIsResetting(true);
      setTimeout(() => {
        resetDailyTasks();
        setIsResetting(false);
      }, 500);
    }
  };
  
  return (
    <button 
      className={`flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors ${
        isResetting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleReset}
      disabled={isResetting}
    >
      <RefreshCw className={`h-4 w-4 ${isResetting ? 'animate-spin' : ''}`} />
      Reset Tasks
    </button>
  );
};

export default ResetButton;