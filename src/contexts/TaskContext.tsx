import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { SustainableTask, Achievement, UserStats } from '../types';
import { tasks as initialTasks, achievements as initialAchievements } from '../data/tasks';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TaskContextType {
  tasks: SustainableTask[];
  achievements: Achievement[];
  stats: UserStats;
  toggleTask: (id: string) => void;
  resetDailyTasks: () => void;
  getCompletionPercentage: () => number;
  getCategoryCompletionPercentage: (category: string) => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<SustainableTask[]>('sustainable-tasks', initialTasks);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('sustainable-achievements', initialAchievements);
  const [stats, setStats] = useLocalStorage<UserStats>('sustainable-stats', {
    tasksCompleted: 0,
    streak: 0,
    impactScore: 0,
    lastCompletedDate: null,
  });

  // Check if we need to reset daily tasks
  useEffect(() => {
    const today = new Date().toDateString();
    
    if (stats.lastCompletedDate && stats.lastCompletedDate !== today) {
      // It's a new day, reset tasks
      resetDailyTasks();
    }
  }, [stats.lastCompletedDate]);

  // Calculate completion percentage
  const getCompletionPercentage = (): number => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(task => task.completed).length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  // Calculate category completion percentage
  const getCategoryCompletionPercentage = (category: string): number => {
    const categoryTasks = tasks.filter(task => task.category === category);
    if (categoryTasks.length === 0) return 0;
    
    const completedCount = categoryTasks.filter(task => task.completed).length;
    return Math.round((completedCount / categoryTasks.length) * 100);
  };

  // Toggle task completion
  const toggleTask = (id: string) => {
    const today = new Date().toDateString();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return;
    
    const wasCompleted = tasks[taskIndex].completed;
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: !wasCompleted };
    
    setTasks(newTasks);
    
    // Update stats
    setStats(prev => {
      const newStats = { ...prev };
      
      if (!wasCompleted) {
        // Task is being completed
        newStats.tasksCompleted += 1;
        newStats.impactScore += 10;
        
        // Update streak
        if (prev.lastCompletedDate !== today) {
          if (prev.lastCompletedDate === new Date(Date.now() - 86400000).toDateString()) {
            // Yesterday, so streak continues
            newStats.streak += 1;
          } else {
            // Not yesterday, reset streak
            newStats.streak = 1;
          }
        }
        
        newStats.lastCompletedDate = today;
      } else {
        // Task is being uncompleted
        newStats.tasksCompleted = Math.max(0, newStats.tasksCompleted - 1);
        newStats.impactScore = Math.max(0, newStats.impactScore - 10);
      }
      
      return newStats;
    });
    
    // Update achievements
    updateAchievements();
  };

  // Reset daily tasks
  const resetDailyTasks = () => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({ ...task, completed: false }))
    );
  };

  // Update achievements based on current progress
  const updateAchievements = () => {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const allTasksCompleted = completedTasksCount === tasks.length;
    
    // Check each category for completion
    const categories = ['energy', 'water', 'waste', 'consumption'];
    const completedCategories = categories.filter(category => {
      const categoryTasks = tasks.filter(task => task.category === category);
      return categoryTasks.every(task => task.completed);
    }).length;
    
    const newAchievements = achievements.map(achievement => {
      const updatedAchievement = { ...achievement };
      
      switch (achievement.id) {
        case 'daily-streak':
          updatedAchievement.progress = stats.streak;
          updatedAchievement.unlocked = stats.streak >= achievement.target;
          break;
        case 'category-master':
          updatedAchievement.progress = completedCategories;
          updatedAchievement.unlocked = completedCategories >= achievement.target;
          break;
        case 'sustainability-guru':
          updatedAchievement.progress = completedTasksCount;
          updatedAchievement.unlocked = allTasksCompleted;
          break;
        case 'eco-warrior':
          updatedAchievement.progress = stats.tasksCompleted;
          updatedAchievement.unlocked = stats.tasksCompleted >= achievement.target;
          break;
        default:
          break;
      }
      
      return updatedAchievement;
    });
    
    setAchievements(newAchievements);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        achievements,
        stats,
        toggleTask,
        resetDailyTasks,
        getCompletionPercentage,
        getCategoryCompletionPercentage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};