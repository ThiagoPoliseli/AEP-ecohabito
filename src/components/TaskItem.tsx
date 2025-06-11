import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { SustainableTask } from '../types';
import { useTasks } from '../contexts/TaskContext';

interface TaskItemProps {
  task: SustainableTask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask } = useTasks();
  
  const handleToggle = () => {
    toggleTask(task.id);
  };

  return (
    <div 
      className={`relative mb-4 p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ${
        task.completed ? 'bg-green-50' : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start">
        <div 
          className="flex-shrink-0 cursor-pointer text-2xl mr-3" 
          onClick={handleToggle}
        >
          {task.completed ? (
            <CheckCircle className="text-green-600 h-6 w-6" />
          ) : (
            <Circle className="text-gray-400 hover:text-green-600 h-6 w-6" />
          )}
        </div>
        <div className="flex-grow">
          <h3 
            className={`text-lg font-medium mb-1 ${
              task.completed ? 'text-green-700' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          
          <div 
            className={`text-xs px-3 py-1 rounded-full inline-block ${
              task.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            Impact: {task.impact}
          </div>
        </div>
      </div>
      
      {task.completed && (
        <div 
          className="absolute -right-1 -top-1 w-5 h-5 animate-pulse"
          style={{
            animation: 'leaf-float 2s ease-in-out'
          }}
        >
          <span role="img" aria-label="leaf">🍃</span>
        </div>
      )}
      
      <style jsx>{`
        @keyframes leaf-float {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-20px, -30px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TaskItem;