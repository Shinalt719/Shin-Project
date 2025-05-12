import React from 'react';
import { Clock, ListChecks, Music, Brain, Zap, BarChart } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useAnimatedElement<HTMLDivElement>();
  
  return (
    <div 
      ref={cardRef}
      className={`fade-in ${delay} card hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const headingRef = useAnimatedElement<HTMLDivElement>();
  
  return (
    <section className="section bg-gray-50" id="features">
      <div className="container-custom">
        <div ref={headingRef} className="fade-in text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Supercharge Your <span className="gradient-text">Study Sessions</span></h2>
          <p className="text-xl text-gray-600">
            FocusFlow combines powerful productivity tools to help you achieve maximum efficiency and focus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Clock size={24} />}
            title="Pomodoro Timer"
            description="Optimize your study sessions with our customizable Pomodoro timer. Work in focused intervals with timed breaks."
            delay="stagger-1"
          />
          <FeatureCard
            icon={<ListChecks size={24} />}
            title="Task Manager"
            description="Organize your assignments, projects, and exams in one place with our intuitive task management system."
            delay="stagger-2"
          />
          <FeatureCard
            icon={<Music size={24} />}
            title="Focus Music"
            description="Access curated playlists designed to enhance concentration and block distractions while studying."
            delay="stagger-3"
          />
          <FeatureCard
            icon={<Brain size={24} />}
            title="Study Analytics"
            description="Track your study habits, focus time, and productivity patterns with detailed analytics."
            delay="stagger-1"
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Quick Notes"
            description="Capture ideas and important information instantly with our minimalist note-taking tool."
            delay="stagger-2"
          />
          <FeatureCard
            icon={<BarChart size={24} />}
            title="Goal Tracking"
            description="Set academic goals and monitor your progress with visual progress indicators and reminders."
            delay="stagger-3"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;