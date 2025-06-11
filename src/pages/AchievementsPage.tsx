import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import AchievementCard from '../components/AchievementCard';

const AchievementsPage: React.FC = () => {
  const { achievements } = useTasks();
  
  // Separate unlocked and locked achievements
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);
  const lockedAchievements = achievements.filter(achievement => !achievement.unlocked);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Your Sustainability Journey</h2>
        <p className="text-gray-700">
          Track your progress and earn achievements as you build sustainable habits. 
          Each achievement represents a milestone in your eco-friendly lifestyle.
        </p>
      </div>
      
      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Unlocked Achievements</h2>
            <div className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
              {unlockedAchievements.length} of {achievements.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {unlockedAchievements.length > 0 ? 'Next Challenges' : 'Achievements to Unlock'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lockedAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
      
      {unlockedAchievements.length === achievements.length && (
        <div className="mt-8 text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-yellow-800 mb-2">All Achievements Unlocked!</h3>
          <p className="text-gray-700">
            Congratulations on becoming a sustainability champion! Your commitment to 
            eco-friendly habits is making a real difference.
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;