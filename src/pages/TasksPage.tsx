import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from '../components/TaskItem';
import CategoryFilter from '../components/CategoryFilter';
import StatsCard from '../components/StatsCard';
import ResetButton from '../components/ResetButton';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/tasks';
import { Filter, Search } from 'lucide-react';

const TasksPage: React.FC = () => {
  const { tasks } = useTasks();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);

  // Filter tasks by category and search query
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory ? task.category === activeCategory : true;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <StatsCard />
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
            onClick={() => setShowCategories(!showCategories)}
          >
            <Filter className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar tarefas..."
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
        
        <ResetButton />
      </div>
      
      {showCategories && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      )}
      
      <CategoryFilter 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
      />
      
      {filteredTasks.length > 0 ? (
        <div>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhuma tarefa corresponde aos seus critérios. Tente alterar seus filtros.</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;