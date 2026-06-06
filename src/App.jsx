import React, { useState, useEffect } from 'react';
import CalendarDosSoles from './components/CalendarDosSoles';

function App() {
  const theme = 'crimson'; // Locked to Crimson Sunset Dark Mode

  // Sync theme class on document body
  useEffect(() => {
    document.body.className = 'bg-[#0C0C0D] text-gray-100 theme-crimson overflow-x-hidden';
  }, []);

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-8 transition-all duration-500 relative bg-[#0C0C0D]">
      
      {/* Crimson Sunset Ambient Glow Backgrounds */}
      <div className="absolute top-[-200px] left-[5%] w-[600px] h-[600px] bg-brand-crimson-red/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-150px] right-[5%] w-[500px] h-[500px] bg-brand-crimson-darkred/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Calendar Dashboard */}
      <main className="relative z-10">
        <CalendarDosSoles activeTheme={theme} />
      </main>

      {/* Footer Branding */}
      <footer className="text-center mt-12 mb-6 text-xs text-gray-400 font-semibold tracking-wider uppercase relative z-10">
        <p>© 2026 Dos Soles • Distribución de Cosmética Capilar Profesional</p>
        <p className="mt-1 text-[10px] text-gray-400/60 lowercase">
          diseño de branding premium: option 04 crimson sunset dark mode
        </p>
      </footer>
    </div>
  );
}

export default App;
