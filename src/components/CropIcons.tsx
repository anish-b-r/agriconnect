import React from 'react';

interface CropIconProps {
  cropId: string;
  className?: string;
}

export const CropIcon: React.FC<CropIconProps> = ({ cropId, className = "w-10 h-10" }) => {
  switch (cropId.toLowerCase()) {
    case 'wheat':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <path d="M32 52V14M32 14C28 20 22 22 22 28M32 14C36 20 42 22 42 28M32 24C27 29 20 31 20 37M32 24C37 29 44 31 44 37M32 34C28 38 22 40 22 45M32 34C36 38 42 40 42 45" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'paddy':
    case 'rice':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FFFBEB" />
          <path d="M22 48C22 34 32 18 42 14C40 24 36 40 22 48Z" fill="#F59E0B" opacity="0.8" />
          <ellipse cx="28" cy="40" rx="4" ry="7" transform="rotate(-25 28 40)" fill="#D97706" />
          <ellipse cx="33" cy="32" rx="4.5" ry="7.5" transform="rotate(-25 33 32)" fill="#F59E0B" />
          <ellipse cx="38" cy="24" rx="4" ry="7" transform="rotate(-25 38 24)" fill="#FBBF24" />
        </svg>
      );
    case 'tomato':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FEE2E2" />
          <circle cx="32" cy="35" r="18" fill="#EF4444" />
          <path d="M32 17C29 19 25 18 24 16C26 21 30 20 32 20C34 20 38 21 40 16C39 18 35 19 32 17Z" fill="#166534" />
          <ellipse cx="26" cy="30" rx="4" ry="2" transform="rotate(-30 26 30)" fill="#F87171" opacity="0.6" />
        </svg>
      );
    case 'onion':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FCE7F3" />
          <path d="M32 14C24 22 20 33 20 40C20 46.6 25.4 52 32 52C38.6 52 44 46.6 44 40C44 33 40 22 32 14Z" fill="#BE185D" />
          <path d="M32 14C28 22 26 33 26 40C26 46.6 28.7 52 32 52C35.3 52 38 46.6 38 40C38 33 36 22 32 14Z" fill="#DB2777" />
          <path d="M32 14V52" stroke="#F472B6" strokeWidth="1.5" />
          <path d="M30 14L32 10L34 14" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'soybean':
    case 'soy':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <ellipse cx="26" cy="34" rx="7" ry="10" transform="rotate(-15 26 34)" fill="#D97706" />
          <ellipse cx="38" cy="34" rx="7" ry="10" transform="rotate(15 38 34)" fill="#F59E0B" />
          <ellipse cx="32" cy="26" rx="6" ry="9" fill="#FBBF24" />
        </svg>
      );
    case 'mustard':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FEF9C3" />
          <path d="M32 52V20" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="5" fill="#EAB308" />
          <circle cx="40" cy="24" r="5" fill="#EAB308" />
          <circle cx="32" cy="16" r="6" fill="#FACC15" />
          <circle cx="28" cy="32" r="4.5" fill="#CA8A04" />
          <circle cx="36" cy="32" r="4.5" fill="#CA8A04" />
        </svg>
      );
    case 'cotton':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#F3F4F6" />
          <path d="M32 52V36" stroke="#4B5563" strokeWidth="3" />
          <circle cx="32" cy="26" r="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="24" cy="30" r="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="40" cy="30" r="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
          <path d="M22 36C26 34 32 38 32 38C32 38 38 34 42 36" stroke="#15803D" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case 'groundnut':
    case 'peanut':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
          <path d="M22 28C20 22 28 18 34 22C38 24 44 22 46 28C48 34 42 42 36 40C30 38 24 44 20 38C18 34 20 30 22 28Z" fill="#D97706" />
          <path d="M24 30C23 25 29 22 33 25C37 27 42 25 43 30C45 35 40 40 35 38C30 36 26 41 22 36Z" fill="#F59E0B" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="30" fill="#DCFCE7" />
          <path d="M32 48V20M32 20C24 24 20 32 20 40M32 20C40 24 44 32 44 40" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
};
