import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AnimationContextType {
  registerAnimation: (ref: React.RefObject<HTMLElement>) => void;
  unregisterAnimation: (ref: React.RefObject<HTMLElement>) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const [refs, setRefs] = useState<React.RefObject<HTMLElement>[]>([]);

  const registerAnimation = (ref: React.RefObject<HTMLElement>) => {
    setRefs(prev => [...prev, ref]);
  };

  const unregisterAnimation = (ref: React.RefObject<HTMLElement>) => {
    setRefs(prev => prev.filter(r => r !== ref));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            // Optional: Remove animation when out of view
            // entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);

  return (
    <AnimationContext.Provider value={{ registerAnimation, unregisterAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};