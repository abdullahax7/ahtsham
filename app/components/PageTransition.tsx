'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Initial entrance flash
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 700);

    // Give the DOM a frame to settle before running animations
    const animInit = requestAnimationFrame(() => {
      const animClasses = ['.fade-up', '.fade-in', '.scale-up', '.blur-in'];
      const selector = animClasses.join(', ');

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      const observeElements = () => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          // Skip elements already marked visible or already being monitored
          if (el.classList.contains('visible') || el.classList.contains('will-animate')) return;
          
          el.classList.add('will-animate');
          obs.observe(el);
        });
      };

      // Initial observation
      observeElements();

      // Set up a MutationObserver to catch dynamically loaded chunks/components
      const mutObs = new MutationObserver(() => {
        observeElements();
      });

      mutObs.observe(document.body, { childList: true, subtree: true });

      // Save instances to window or local variable to clean up
      (window as any).__cleanupAnim = () => {
        obs.disconnect();
        mutObs.disconnect();
      };
    });

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animInit);
      if ((window as any).__cleanupAnim) {
        (window as any).__cleanupAnim();
      }
    };
  }, [pathname]);

  return (
    <>
      {flash && <div className="page-flash" />}
      {children}
    </>
  );
}
