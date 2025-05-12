import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PomodoroSection from './components/PomodoroSection';
import TaskManagerSection from './components/TaskManagerSection';
import MusicPlayerSection from './components/MusicPlayerSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { AnimationProvider } from './context/AnimationContext';

function App() {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900 font-['Inter',sans-serif]">
        <Header />
        <main>
          <Hero />
          <Features />
          <PomodoroSection />
          <TaskManagerSection />
          <MusicPlayerSection />
          <Testimonials />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AnimationProvider>
  );
}

export default App;