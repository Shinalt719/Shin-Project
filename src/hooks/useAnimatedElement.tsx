import { useRef, useEffect } from 'react';
import { useAnimation } from '../context/AnimationContext';

export const useAnimatedElement = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const { registerAnimation, unregisterAnimation } = useAnimation();

  useEffect(() => {
    if (ref.current) {
      registerAnimation(ref as React.RefObject<HTMLElement>);
    }

    return () => {
      unregisterAnimation(ref as React.RefObject<HTMLElement>);
    };
  }, [registerAnimation, unregisterAnimation]);

  return ref;
};