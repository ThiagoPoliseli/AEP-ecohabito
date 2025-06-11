import React from 'react';
import { categories } from '../data/tasks';
import * as LucideIcons from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null); // Toggle off if already active
    } else {
      setActiveCategory(categoryId);
    }
  };

  // Dynamic icon rendering
  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.FC<{ className?: string }>>)[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
          activeCategory === null 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => setActiveCategory(null)}
      >
        All Tasks
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          className={`py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
            activeCategory === category.id 
              ? `${category.color.replace('bg-', 'bg-')} text-white` 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {renderIcon(category.icon)}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;