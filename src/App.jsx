import React, { useState, useEffect } from 'react';
import CalendarDosSoles from './components/CalendarDosSoles';

function App() {
  const [theme, setTheme] = useState('prestige');

  // Side-effect to set theme classes on document body
  useEffect(() => {
    document.body.className = theme === 'prestige'
      ? 'bg-[#F8FAFC] text-gray-800 theme-prestige overflow-x-hidden'
      : 'bg-[#0C0C0D] text-gray-100 theme-crimson overflow-x-hidden';
  }, [theme]);


  return (
    <div className={`min-h-screen py-8 md:py-16 px-4 md:px-8 transition-all duration-500 relative ${
      theme === 'prestige' ? 'bg-[#F8FAFC]' : 'bg-[#0C0C0D]'
    }`}>
      
      {/* Luxury Ambient Glow Backgrounds */}
      {theme === 'prestige' ? (
        <>
          <div className="absolute top-[-100px] left-[10%] w-[500px] h-[500px] bg-brand-crimson-red/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-[-100px] right-[10%] w-[600px] h-[600px] bg-[#E2E8F0]/40 rounded-full blur-[140px] pointer-events-none -z-10" />
        </>

      ) : (
        <>
          <div className="absolute top-[-200px] left-[5%] w-[600px] h-[600px] bg-brand-crimson-red/10 rounded-full blur-[160px] pointer-events-none -z-10" />
          <div className="absolute bottom-[-150px] right-[5%] w-[500px] h-[500px] bg-brand-crimson-darkred/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        </>
      )}

      {/* Main Calendar Dashboard */}
      <main className="relative z-10">
        <CalendarDosSoles activeTheme={theme} onThemeToggle={setTheme} />
      </main>

      {/* Footer Branding */}
      <footer className="text-center mt-12 mb-6 text-xs text-gray-400 font-semibold tracking-wider uppercase relative z-10">
        <p>© 2026 Dos Soles • Distribución de Cosmética Capilar Profesional</p>
        <p className="mt-1 text-[10px] text-gray-400/60 lowercase">
          diseño de branding premium: opción 03 prestige slate &amp; option 04 crimson sunset
        </p>
      </footer>
    </div>
  );
}

export default App;
