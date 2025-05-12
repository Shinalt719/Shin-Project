import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, Flag, Pencil, Trash2 } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

const TaskManagerSection = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete Math Assignment', completed: true, priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Study for Chemistry Exam', completed: false, priority: 'high', dueDate: 'Tomorrow' },
    { id: 3, title: 'Prepare English Presentation', completed: false, priority: 'medium', dueDate: 'Aug 15' },
    { id: 4, title: 'Research for History Project', completed: false, priority: 'low', dueDate: 'Aug 20' },
  ]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  
  const sectionRef = useAnimatedElement<HTMLDivElement>();
  const contentRef = useAnimatedElement<HTMLDivElement>();
  const tasksRef = useAnimatedElement<HTMLDivElement>();

  const filteredTasks = tasks.filter(task => {
    switch (activeTab) {
      case 'today':
        return task.dueDate.toLowerCase() === 'today';
      case 'upcoming':
        return task.dueDate.toLowerCase() !== 'today';
      default:
        return true;
    }
  });

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const saveEdit = (id: number, newTitle: string, newPriority: 'low' | 'medium' | 'high', newDueDate: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle, priority: newPriority, dueDate: newDueDate } : task
    ));
    setEditingTask(null);
  };

  const addNewTask = () => {
    if (newTask.title.trim()) {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks([...tasks, {
        id: newId,
        title: newTask.title,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate || 'Not set'
      }]);
      setNewTask({ title: '', priority: 'medium', dueDate: '' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <section className="section bg-gradient-to-br from-indigo-50 to-blue-50" id="tasks">
      <div className="container-custom" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={tasksRef} className="scale-in order-2 md:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">My Tasks</h3>
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 ${
                      activeTab === 'all' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } rounded-l-lg transition-colors`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActiveTab('today')}
                    className={`px-3 py-1 ${
                      activeTab === 'today' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-3 py-1 ${
                      activeTab === 'upcoming' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } rounded-r-lg`}
                  >
                    Upcoming
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-xl transition-all duration-300 ${
                      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {editingTask?.id === task.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingTask.title}
                          onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <div className="flex gap-2">
                          <select
                            value={editingTask.priority}
                            onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                            className="p-2 border rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                          <input
                            type="text"
                            value={editingTask.dueDate}
                            onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                            className="p-2 border rounded"
                            placeholder="Due date"
                          />
                          <button
                            onClick={() => saveEdit(task.id, editingTask.title, editingTask.priority, editingTask.dueDate)}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 mr-3 flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle size={20} className="text-green-500" />
                            ) : (
                              <Circle size={20} className="text-gray-300" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {task.title}
                            </p>
                            <div className="flex items-center mt-2 text-sm">
                              <div className={`flex items-center mr-4 ${getPriorityColor(task.priority)}`}>
                                <Flag size={14} className="mr-1" />
                                <span className="capitalize">{task.priority}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock size={14} className="mr-1" />
                                <span>{task.dueDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(task)}
                            className="p-1 text-gray-400 hover:text-indigo-600"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter new task"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="p-2 border rounded-lg"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <input
                      type="text"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      placeholder="Due date"
                      className="p-2 border rounded-lg flex-1"
                    />
                    <button
                      onClick={addNewTask}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={contentRef} className="fade-in order-1 md:order-2">
            <h2 className="mb-4">Stay Organized with <span className="gradient-text">Task Manager</span></h2>
            <p className="text-xl text-gray-600 mb-6">
              Keep track of all your assignments, projects, and deadlines in one centralized system designed specifically for students.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Prioritize tasks with intuitive color coding</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Set due dates and reminders for important deadlines</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Break down large projects into manageable sub-tasks</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Sync with your calendar for a unified schedule view</p>
              </li>
            </ul>
            <a href="#get-started" className="btn btn-primary">Try Task Manager</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskManagerSection;