import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, Flag } from 'lucide-react';
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
  
  const sectionRef = useAnimatedElement<HTMLDivElement>();
  const contentRef = useAnimatedElement<HTMLDivElement>();
  const tasksRef = useAnimatedElement<HTMLDivElement>();

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
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
                  <button className="px-3 py-1 rounded-l-lg bg-indigo-600 text-white text-sm">All</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">Today</button>
                  <button className="px-3 py-1 rounded-r-lg bg-gray-100 text-gray-700 text-sm">Upcoming</button>
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-xl transition-all duration-300 ${
                      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start">
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
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-full border border-dashed border-gray-300 rounded-lg p-3 text-gray-500 flex items-center hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors">
                    <span className="text-2xl mr-2">+</span>
                    <span>Add new task</span>
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