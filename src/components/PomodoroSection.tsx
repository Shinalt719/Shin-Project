import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

const PomodoroSection = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [customTime, setCustomTime] = useState(25);
  
  const sectionRef = useAnimatedElement<HTMLDivElement>();
  const contentRef = useAnimatedElement<HTMLDivElement>();
  const timerRef = useAnimatedElement<HTMLDivElement>();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          setProgress((newTime / (customTime * 60)) * 100);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, customTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(customTime * 60);
    setProgress(100);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCustomTime(newTime);
    setTime(newTime * 60);
    setProgress(100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="section relative overflow-hidden" id="pomodoro">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 transform -translate-x-1/2 translate-y-1/4"></div>
      
      <div className="container-custom" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="fade-in">
            <h2 className="mb-4">Master Your Time with <span className="gradient-text">Pomodoro Timer</span></h2>
            <p className="text-xl text-gray-600 mb-6">
              Break down study sessions into focused intervals with strategically timed breaks to maximize productivity and prevent burnout.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Customizable focus sessions (1-60 minutes)</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Automatic break timing with notifications</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Session history and productivity analytics</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <p className="text-gray-700">Integration with your task management system</p>
              </li>
            </ul>
            <a href="#get-started" className="btn btn-primary">Try Pomodoro Timer</a>
          </div>
          
          <div ref={timerRef} className="scale-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold">Focus Session</h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div>
              
              {showSettings && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Duration (minutes)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={customTime}
                    onChange={handleTimeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>1 min</span>
                    <span>{customTime} min</span>
                    <span>60 min</span>
                  </div>
                </div>
              )}
              
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * progress) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{formatTime(time)}</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30"
                >
                  {isActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={resetTimer}
                  className="w-14 h-14 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PomodoroSection;