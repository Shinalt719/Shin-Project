import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold gradient-text">FocusNest</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pomodoro" className="text-gray-700 hover:text-indigo-600 transition-colors">Pomodoro</a>
          <a href="#tasks" className="text-gray-700 hover:text-indigo-600 transition-colors">Tasks</a>
          <a href="#music" className="text-gray-700 hover:text-indigo-600 transition-colors">Focus Music</a>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
              <span>More</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
              <a href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Reviews</a>
              <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Contact</a>
            </div>
          </div>
          <a href="#get-started" className="btn btn-primary">Get Started</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container-custom py-4 space-y-4">
          <a href="#features" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Features</a>
          <a href="#pomodoro" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Pomodoro</a>
          <a href="#tasks" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Tasks</a>
          <a href="#music" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Focus Music</a>
          <a href="#testimonials" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Reviews</a>
          <a href="#contact" className="block py-2 text-gray-700 hover:text-indigo-600" onClick={toggleMenu}>Contact</a>
          <a href="#get-started" className="btn btn-primary w-full" onClick={toggleMenu}>Get Started</a>
        </div>
      </div>
    </header>
  );
};

export default Header;