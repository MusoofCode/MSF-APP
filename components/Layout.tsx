
import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, showBack, onBack, title }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center">
      {/* Cinematic Ambiance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-25%] right-[-15%] w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Top Navigation Bar */}
      {(showBack || title) && (
        <header className="relative z-50 w-full max-w-lg px-6 pt-6 flex items-center justify-between">
          <div className="w-10">
            {showBack && (
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/20 active:scale-90 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex-1 text-center">
            {title && <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">{title}</h1>}
          </div>
          <div className="w-10"></div>
        </header>
      )}

      <main className="relative z-10 w-full max-w-lg flex-1 flex flex-col p-6 overflow-hidden">
        {children}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background: #000; }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
