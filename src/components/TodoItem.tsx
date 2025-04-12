import React, { useState } from 'react';
import { Todo, Priority } from '../types';
import { CheckCircle2, Circle, Pencil, Trash2, X, Check } from 'lucide-react';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, { bg: string, text: string, border: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
  low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority || 'medium');

  const handleSubmit = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle, editPriority);
      setIsEditing(false);
    }
  };

  // Ensure we have a valid priority, defaulting to 'medium' if undefined
  const currentPriority = todo.priority || 'medium';
  const priorityStyle = priorityColors[currentPriority];

  if (isEditing) {
    return (
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="w-32 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Check className="w-5 h-5 text-green-500" />
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <button
        onClick={() => onToggle(todo.id)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div className="flex-1">
        <p className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </p>
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyle.bg} ${priorityStyle.text} border ${priorityStyle.border}`}>
          {currentPriority}
        </span>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Pencil className="w-5 h-5 text-blue-500" />
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
}