import React from 'react';

/**
 * TechStackStrip
 * Restrained horizontal strip displaying underlying technologies:
 * React, Python, FastAPI, MongoDB, scikit-learn, NetworkX.
 * Monochrome icons with text labels, subtle opacity.
 */
export default function TechStackStrip() {
  const technologies = [
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Python',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M12 2C8.5 2 8 3.5 8 5V7H13V8H6C4 8 2 9.5 2 13C2 16.5 3.5 17 5 17H7V15C7 13.5 8.5 12 10 12H15C16.5 12 18 10.5 18 9V4C18 2.5 15.5 2 12 2Z" />
          <path d="M12 22C15.5 22 16 20.5 16 19V17H11V16H18C20 16 22 14.5 22 11C22 7.5 20.5 7 19 7H17V9C17 10.5 15.5 12 14 12H9C7.5 12 6 13.5 6 15V20C6 21.5 8.5 22 12 22Z" />
          <circle cx="9.5" cy="4.5" r="0.8" fill="currentColor" />
          <circle cx="14.5" cy="19.5" r="0.8" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'FastAPI',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <circle cx="12" cy="12" r="9" />
          <path d="M13 6L7 14H12L11 18L17 10H12L13 6Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M12 2C11.5 4.5 6 9.5 6 14.5C6 18 8.8 21 12 22C15.2 21 18 18 18 14.5C18 9.5 12.5 4.5 12 2Z" />
          <path d="M12 2.5V21.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'scikit-learn',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <circle cx="7" cy="8" r="3" />
          <circle cx="17" cy="8" r="3" />
          <circle cx="12" cy="17" r="3" />
          <line x1="9.5" y1="9.5" x2="14.5" y2="15.5" strokeDasharray="1 1" />
          <line x1="14.5" y1="9.5" x2="9.5" y2="15.5" strokeDasharray="1 1" />
        </svg>
      ),
    },
    {
      name: 'NetworkX',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <circle cx="12" cy="12" r="2.5" />
          <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" />
          <line x1="16.5" y1="7.5" x2="13.5" y2="10.5" />
          <line x1="7.5" y1="16.5" x2="10.5" y2="13.5" />
          <line x1="16.5" y1="16.5" x2="13.5" y2="13.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 py-4 border-t border-b border-white/[0.06]">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-200 select-none group"
          >
            <div className="text-white/35 group-hover:text-white/70 transition-colors duration-200">
              {tech.icon}
            </div>
            <span className="text-xs tracking-wider uppercase font-mono font-normal">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
