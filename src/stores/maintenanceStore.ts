import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MaintenanceTask } from '../types/boat';

interface MaintenanceState {
  tasks: MaintenanceTask[];
  addTask: (task: Omit<MaintenanceTask, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  getTasks: () => MaintenanceTask[];
}

export const useMaintenanceStore = create<MaintenanceState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
      })),
      toggleTask: (taskId) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      })),
      getTasks: () => get().tasks
    }),
    {
      name: 'maintenance-storage',
    }
  )
);