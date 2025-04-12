import React from 'react';
import { TodoStats as TodoStatsType } from '../types';
import { CheckCircle2, Circle, ListTodo, AlertTriangle } from 'lucide-react';

interface Props {
  stats: TodoStatsType;
}

export function TodoStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-blue-500" />
          <h3 className="text-gray-600">Total Tasks</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.total}</p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <h3 className="text-gray-600">Completed</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.completed}</p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <Circle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-gray-600">Active</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.active}</p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-gray-600">High Priority</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.priorityCounts.high}</p>
      </div>
    </div>
  );
}