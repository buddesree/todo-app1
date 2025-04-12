import { useState, useEffect } from 'react';
import { Todo, TodoStats, Priority } from '../types';

const STORAGE_KEY = 'todos-react-app';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id: string, title: string, priority: Priority) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, title, priority } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter === 'all') return true;
        return todo.priority === priorityFilter;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const getStats = (): TodoStats => {
    const priorityCounts: Record<Priority, number> = {
      high: todos.filter(t => t.priority === 'high').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      low: todos.filter(t => t.priority === 'low').length,
    };

    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length,
      priorityCounts,
    };
  };

  return {
    todos: getFilteredTodos(),
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    stats: getStats(),
  };
}