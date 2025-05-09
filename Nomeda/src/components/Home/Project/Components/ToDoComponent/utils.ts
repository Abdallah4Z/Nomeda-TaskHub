import { Todo } from './types';

export const loadTodos = (version: string, storageKey: string): Todo[] => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const { version: savedVersion, todos } = JSON.parse(savedData);
    if (savedVersion === version) {
      return todos;
    }
  }
  return [];
};

export const saveTodos = (todos: Todo[], version: string, storageKey: string): void => {
  localStorage.setItem(storageKey, JSON.stringify({
    version,
    todos,
  }));
};