import React from 'react';
import { Star } from 'lucide-react';
import { useAnimatedElement } from '../hooks/useAnimatedElement';

const StarRating = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <Star className="w-8 h-8 text-yellow-400 fill-current" />
      <Star className="w-8 h-8 text-yellow-400 fill-current" />
      <Star className="w-8 h-8 text-yellow-400 fill-current" />
      <Star className="w-8 h-8 text-yellow-400 fill-current" />
      <Star className="w-8 h-8 text-yellow-400/50 fill-current" />
      <span className="ml-2 text-2xl font-bold text-white">4.5</span>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useAnimatedElement<HTMLDivElement>();
  const contentRef = useAnimatedElement<HTMLDivElement>();

  return (
    <section className="section bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden" id="testimonials">
      <div className="container-custom relative" ref={sectionRef}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-blob"></div>
          <div className="absolute top-1/2 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-8 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div ref={contentRef} className="relative text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <StarRating />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Students</h2>
          
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of students who have transformed their study habits with FocusNest
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-200">Active Users</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-indigo-200">Study Sessions</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-indigo-200">Satisfaction Rate</div>
            </div>
          </div>
          
          <div className="mt-12">
            <a href="#get-started" className="btn bg-white text-indigo-600 hover:bg-indigo-50">
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;