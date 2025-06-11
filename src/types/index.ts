export interface SustainableTask {
  id: string;
  category: 'energy' | 'water' | 'waste' | 'consumption';
  title: string;
  description: string;
  impact: string;
  completed: boolean;
  icon: string;
}

export interface Category {
  id: 'energy' | 'water' | 'waste' | 'consumption';
  name: string;
  icon: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface UserStats {
  tasksCompleted: number;
  streak: number;
  impactScore: number;
  lastCompletedDate: string | null;
}