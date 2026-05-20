'use client';

import React from 'react';

interface LicenseLogoProps {
  type: string;
  glowColor?: string;
  variant?: 'hero' | 'icon';
}

const LicenseLogo: React.FC<LicenseLogoProps> = ({ 
  type, 
  glowColor = 'rgba(248, 87, 39, 0.3)',
  variant = 'hero'
}) => {
  const getLogoContent = () => {
    const typeLower = type.toLowerCase();
    
    // Mapping for licenses with available icons in /public/icons/
    const iconMap: Record<string, string> = {
      cpanel: '/icons/Cpanel-logo.webp',
      plesk: '/icons/plesk.webp',
      litespeed: '/icons/litespeed.webp',
      cloudlinux: '/icons/cloudlinux-logo.webp',
      whmsonic: '/icons/whmsonic.webp',
      directadmin: '/icons/admindirect.webp',
      whmreseller: '/icons/WHM_logo.webp',
      jetbackup: '/icons/JetBackup.webp',
      softaculous: '/icons/softaculous.webp',
      sitepad: '/icons/sitepad-logo.webp',
      cpguard: '/icons/cpGuard.webp',
      imunify360: '/icons/Imunify360_anti-virus.webp',
    };

    if (iconMap[typeLower]) {
      return (
        <img 
          src={iconMap[typeLower]} 
          alt={`${type} Logo`}
          className="license-icon-img"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            display: 'block'
          }} 
        />
      );
    }

    switch (typeLower) {
      case 'virtualizor':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="#1E90FF" strokeWidth="6" strokeDasharray="10 5" />
            <path d="M30 40L50 70L70 40" stroke="#1E90FF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="8" fill="#0DAB4F" />
          </svg>
        );
      case 'dareseller':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 80H80V40L50 20L20 40V80Z" stroke="#F59E0B" strokeWidth="6" />
            <path d="M40 80V60H60V80" stroke="#F59E0B" strokeWidth="6" />
            <circle cx="70" cy="30" r="15" stroke="#F59E0B" strokeWidth="4" />
            <path d="M70 22V38M62 30H78" stroke="#F59E0B" strokeWidth="4" />
          </svg>
        );
      case 'osm':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="35" stroke="#03A9F4" strokeWidth="8" />
            <path d="M50 30V50L65 65" stroke="#03A9F4" strokeWidth="8" strokeLinecap="round" />
            <circle cx="50" cy="50" r="5" fill="#03A9F4" />
          </svg>
        );
      case 'shared':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="#10b981" />
            <path d="M50 25C35 25 25 35 25 50C25 65 35 75 50 75C65 75 75 65 75 50" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M45 40L35 55H55L45 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'reseller':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="#8b5cf6" />
            <path d="M30 30H70V70H30V30Z" stroke="white" strokeWidth="6" />
            <path d="M30 50H70" stroke="white" strokeWidth="4" />
            <path d="M50 30V70" stroke="white" strokeWidth="4" />
          </svg>
        );
      case 'vps':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="#3b82f6" />
            <path d="M25 35H75M25 50H75M25 65H75" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <circle cx="35" cy="35" r="3" fill="white" />
            <circle cx="35" cy="50" r="3" fill="white" />
            <circle cx="35" cy="65" r="3" fill="white" />
          </svg>
        );
      case 'dedicated':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="#f59e0b" />
            <path d="M25 25H75V75H25V25Z" stroke="white" strokeWidth="6" />
            <path d="M25 40H75M25 60H75" stroke="white" strokeWidth="4" />
            <circle cx="35" cy="32.5" r="3" fill="white" />
            <circle cx="35" cy="50" r="3" fill="white" />
            <circle cx="35" cy="67.5" r="3" fill="white" />
          </svg>
        );
      case 'webxoo':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="40" fill="#f85727" />
            <path d="M30 50L45 65L70 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'all-licenses':
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="70" height="70" rx="10" stroke="#f85727" strokeWidth="6" />
            <path d="M30 35H70M30 50H70M30 65H70" stroke="#f85727" strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="20" r="10" fill="#f85727" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" />
          </svg>
        );
    }
  };

  if (variant === 'icon') {
    return (
      <div className="compact-logo" style={{ '--logo-glow': glowColor } as React.CSSProperties}>
        {getLogoContent()}
      </div>
    );
  }

  return (
    <div className="page-hero-logo" style={{ '--logo-glow': glowColor } as React.CSSProperties}>
      <div className="logo-inner">
        {getLogoContent()}
      </div>
    </div>
  );
};

export default LicenseLogo;
