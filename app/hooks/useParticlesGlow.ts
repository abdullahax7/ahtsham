'use client';

import { useEffect } from 'react';
import { useParticlesContext } from '../context/ParticlesContext';

/**
 * Call this hook at the top of any page component to set the
 * neon glow colour for the global hero particles while on that page.
 *
 * Example:
 *   useParticlesGlow('rgba(248, 87, 39, 0.4)');
 */
export function useParticlesGlow(glowColor: string) {
  const { setGlowColor } = useParticlesContext();

  useEffect(() => {
    setGlowColor(glowColor);
  }, [glowColor, setGlowColor]);
}
