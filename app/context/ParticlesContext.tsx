'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ParticlesContextValue {
  glowColor: string;
  setGlowColor: (color: string) => void;
}

const ParticlesContext = createContext<ParticlesContextValue>({
  glowColor: 'rgba(248, 87, 39, 0.4)',
  setGlowColor: () => {},
});

export function ParticlesProvider({ children }: { children: React.ReactNode }) {
  const [glowColor, setGlowColorState] = useState('rgba(248, 87, 39, 0.4)');

  const setGlowColor = useCallback((color: string) => {
    setGlowColorState(color);
  }, []);

  return (
    <ParticlesContext.Provider value={{ glowColor, setGlowColor }}>
      {children}
    </ParticlesContext.Provider>
  );
}

export function useParticlesContext() {
  return useContext(ParticlesContext);
}
