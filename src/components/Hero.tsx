import React from 'react';
import { ChevronDown, Play, Clock, ListChecks, Music } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

const Hero = () => {
  const heroRef = useAnimatedElement<HTMLDivElement>();
  const titleRef = useAnimatedElement<HTMLHeadingElement>();
  const descRef = useAnimatedElement<HTMLParagraphElement>();
  const buttonRef = useAnimatedElement<HTMLDivElement>();
  const imageRef = useAnimatedElement<HTMLDivElement>();

  const handleGetStarted = () => {
    // Scroll to task manager section
    const taskSection = document.getElementById('tasks');
    if (taskSection) {
      taskSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden" id="home">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container-custom relative" ref={heroRef}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 
              ref={titleRef}
              className="fade-in font-bold mb-6"
            >
              Boost Your <span className="gradient-text">Productivity</span> With
              <span className="gradient-text"> FocusFlow</span>
            </h1>
            <p 
              ref={descRef}
              className="fade-in stagger-1 text-lg md:text-xl text-gray-600 mb-8"
            >
              The ultimate productivity companion for students. Stay organized, focused, and achieve your academic goals with our all-in-one solution.
            </p>
            <div 
              ref={buttonRef}
              className="fade-in stagger-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button onClick={handleGetStarted} className="btn btn-primary">
                Get Started Free
              </button>
              <a href="#features" className="btn bg-white border border-gray-200 hover:bg-gray-50 text-gray-700">
                <Play size={16} className="mr-2 text-indigo-600" /> Watch Demo
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-8 mt-12 fade-in stagger-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Clock size={20} className="text-indigo-600" />
                </div>
                <p className="ml-2 text-gray-600">Pomodoro Timer</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ListChecks size={20} className="text-blue-600" />
                </div>
                <p className="ml-2 text-gray-600">Task Manager</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Music size={20} className="text-purple-600" />
                </div>
                <p className="ml-2 text-gray-600">Focus Music</p>
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
            className="scale-in relative"
          >
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Student using FocusFlow app" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 blur-bg p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Focus Session</p>
                    <p className="text-xs text-gray-500">Completed 25 mins</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 blur-bg p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium">3,245+ Students Focused Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a 
          href="#features" 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;