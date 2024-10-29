"use client"
import { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

const FireworksComponent = () => {
  const fireworksContainer = useRef(null);

  useEffect(() => {
    if (fireworksContainer.current) {
      const fireworks = new Fireworks(fireworksContainer.current, {
        rocketsPoint: 50, // position of the fireworks on the screen
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 100,
        trace: 3,
        explosion: 5,
      });
      fireworks.start();

      return () => fireworks.stop();
    }
  }, []);

  return <div ref={fireworksContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />;
};

export default FireworksComponent;
