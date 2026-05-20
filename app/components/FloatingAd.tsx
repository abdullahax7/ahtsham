'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface FloatingAdProps {
  title?: string;
  message?: string;
  link?: string;
}

export default function FloatingAd({ 
  title = "SPECIAL OFFER", 
  message = "Explore our premium shared licenses and SEO tools at unmatched prices.", 
  link = "/licenses" 
}: FloatingAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="qazi-floating-ad">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="qazi-ad-close"
          aria-label="Dismiss Ad"
        >
          <X size={16} />
        </button>

        <div className="qazi-ad-inner">
          <div className="qazi-ad-tag">{title}</div>
          <p className="qazi-ad-text">{message}</p>
          <Link href={link} className="qazi-ad-button">
            View Details
            <span className="qazi-ad-arrow">→</span>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --ad-accent: #f85727;
          --ad-accent-hover: #ff8c00;
          --ad-bg: rgba(2, 6, 23, 0.9);
          --ad-border: rgba(255, 255, 255, 0.15);
        }

        .qazi-floating-ad {
          position: fixed;
          top: 130px;
          right: 24px;
          z-index: 100000; /* Extremely high to stay top */
          width: 380px;
          background: var(--ad-bg);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--ad-border);
          border-radius: 28px;
          padding: 32px;
          box-shadow: 
            0 30px 70px -15px rgba(0, 0, 0, 0.7),
            inset 0 0 40px rgba(255, 255, 255, 0.05);
          animation: qaziAdFadeInRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .qazi-ad-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .qazi-ad-close:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          transform: rotate(90deg);
        }

        .qazi-ad-tag {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--ad-accent);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          background: rgba(248, 87, 39, 0.12);
          padding: 6px 16px;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 20px;
          border: 1px solid rgba(248, 87, 39, 0.2);
        }

        .qazi-ad-text {
          font-size: 1.1rem;
          color: #f1f5f9;
          line-height: 1.6;
          margin: 0 0 28px 0;
          font-weight: 500;
          padding-right: 20px;
        }

        .qazi-ad-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--ad-accent);
          color: #fff !important;
          padding: 16px 30px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(248, 87, 39, 0.5);
        }

        .qazi-ad-button:hover {
          transform: translateY(-4px);
          background: var(--ad-accent-hover);
          box-shadow: 0 15px 35px -5px rgba(248, 87, 39, 0.7);
        }

        .qazi-ad-arrow {
          transition: transform 0.3s ease;
        }

        .qazi-ad-button:hover .qazi-ad-arrow {
          transform: translateX(5px);
        }

        @keyframes qaziAdFadeInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes qaziAdSlideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .qazi-floating-ad {
            top: auto;
            bottom: 30px;
            right: 20px;
            left: 20px;
            width: auto;
            max-width: none;
            padding: 24px;
            border-radius: 24px;
            animation: qaziAdSlideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            box-shadow: 0 -10px 50px rgba(0, 0, 0, 0.6);
          }

          .qazi-ad-text {
            font-size: 0.95rem;
            margin-bottom: 24px;
            line-height: 1.5;
          }

          .qazi-ad-tag {
            font-size: 0.65rem;
            padding: 4px 12px;
            margin-bottom: 16px;
          }

          .qazi-ad-button {
            padding: 14px 24px;
            font-size: 0.95rem;
          }

          .qazi-ad-close {
            top: 14px;
            right: 14px;
          }
        }
      `}} />
    </>
  );
}
