import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  List, 
  Search, 
  Filter, 
  Film, 
  Layers, 
  BookOpen, 
  Instagram, 
  Target, 
  Flame, 
  Info,
  CalendarDays,
  Sparkles,
  PieChart,
  Grid
} from 'lucide-react';
import PostDetailDrawer from './PostDetailDrawer';

// Base Structured Social Media Calendar Data
const scheduleData = [
  { id: 1, date: 'Lun 08/06', format: 'Reel', content: 'Capacitación Truss: Resumen dinámico del evento.', target: 'B2B', objective: 'Fidelización' },
  { id: 2, date: 'Mar 09/06', format: 'Story', content: 'Entrevista Truss: Fragmentos con sticker de preguntas.', target: 'B2B / B2C', objective: 'Autoridad' },
  { id: 3, date: 'Mié 10/06', format: 'Story', content: 'Detrás de escena (Logística): Armado de pedidos.', target: 'B2B', objective: 'Confianza/Conversión' },
  { id: 4, date: 'Jue 11/06', format: 'Carrusel', content: 'Antes y Después Truss: Resultado y productos.', target: 'Ambos', objective: 'Prueba Social' },
  { id: 5, date: 'Vie 12/06', format: 'Story', content: 'Caja de Preguntas Aniversario 19.', target: 'Ambos', objective: 'Interacción' },
  { id: 6, date: 'Sáb 13/06', format: 'Video', content: '¡Aniversario 19!: Video institucional humano.', target: 'Ambos', objective: 'Branding' },
  { id: 7, date: 'Lun 15/06', format: 'Reel', content: 'Familia Liss Expert: Presentación de la línea.', target: 'B2B', objective: 'Venta/Educación' },
  { id: 8, date: 'Mar 16/06', format: 'Reel / Post', content: 'Caso de Éxito de Profesional: Testimonio de salón.', target: 'B2B', objective: 'Comunidad' },
  { id: 9, date: 'Mié 17/06', format: 'Reel', content: 'Herramientas para Profesionales: Showcase técnico.', target: 'B2B', objective: 'Venta Técnica' },
  { id: 10, date: 'Jue 18/06', format: 'Story', content: 'Encuesta / Trivia B2B: Alisado vs. Color.', target: 'B2B', objective: 'Engagement' },
  { id: 11, date: 'Vie 19/06', format: 'Reel / Post', content: 'Promos Mundial Matrix: Equipos ganadores.', target: 'Ambos', objective: 'Conversión' },
  { id: 12, date: 'Sáb 20/06', format: 'Carrusel', content: 'Los 3 rubios más pedidos este invierno + stock.', target: 'B2B', objective: 'Estrategia' },
  { id: 13, date: 'Lun 22/06', format: 'Reel', content: 'Lanzamiento Keratin Alpha Sleek: Innovación.', target: 'B2B', objective: 'Novedad' },
  { id: 14, date: 'Mar 23/06', format: 'Carrusel', content: 'Si tenés este problema -> Pedile a tu estilista.', target: 'B2C', objective: 'Demanda' },
  { id: 15, date: 'Mié 24/06', format: 'Reel', content: 'Organico ASMR "La pelu en tu casa".', target: 'B2C', objective: 'Engagement' },
  { id: 16, date: 'Jue 25/06', format: 'Reel', content: 'Unboxing "La pelu en tu casa": Packaging.', target: 'B2C', objective: 'Deseo/Retail' },
  { id: 17, date: 'Vie 26/06', format: 'Carrusel', content: 'L\'Oréal Serie Expert: Guía visual de envases.', target: 'B2C', objective: 'Educativo' },
  { id: 18, date: 'Sáb 27/06', format: 'Reel', content: 'Solo tenés 5 minutos: Cómo revivir tu cabello.', target: 'B2C', objective: 'Solución' },
  { id: 19, date: 'Dom 28/06', format: 'Story', content: 'This or That (B2C): Frizz vs. Pelo Opaco.', target: 'B2C', objective: 'Interacción' },
  { id: 20, date: 'Lun 29/06', format: 'Reel', content: 'Hair Therapy: Beneficios en la bacha.', target: 'B2B', objective: 'Venta de Servicio' },
  { id: 21, date: 'Mar 30/06', format: 'Post', content: 'Antes y Después (En casa): Mantenimiento.', target: 'B2C', objective: 'Prueba Social' },
];

// Utility: Parses the day number from the date string, e.g. "Lun 08/06" -> 8
const getDayFromDate = (dateStr) => {
  const match = dateStr.match(/(\d+)\/\d+/);
  return match ? parseInt(match[1], 10) : null;
};

// Map Audience Badge Colors based on active theme
const getTargetBadgeStyles = (target, theme) => {
  const isPrestige = theme === 'prestige';
  const isBoth = target.includes('Ambos') || (target.includes('B2B') && target.includes('B2C'));
  
  if (isBoth) {
    return isPrestige 
      ? 'bg-purple-50 text-purple-700 border-purple-200' 
      : 'bg-purple-900/30 text-purple-300 border-purple-800/50';
  }
  if (target.includes('B2B')) {
    return isPrestige 
      ? 'bg-blue-50 text-blue-700 border-blue-200' 
      : 'bg-blue-900/30 text-blue-300 border-blue-800/50';
  }
  if (target.includes('B2C')) {
    return isPrestige 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : 'bg-emerald-900/30 text-emerald-300 border-emerald-800/50';
  }
  return isPrestige 
    ? 'bg-gray-100 text-gray-700 border-gray-200' 
    : 'bg-zinc-800 text-zinc-300 border-zinc-700';
};

// Helper to get Format Icon & Colors
const getFormatBadgeDetails = (format) => {
  const f = format.toLowerCase();
  if (f.includes('reel')) {
    return {
      icon: <Instagram size={13} />,
      label: 'Reel',
      colorClass: 'bg-pink-500/10 text-pink-500 border-pink-500/20'
    };
  }
  if (f.includes('story')) {
    return {
      icon: <Sparkles size={13} />,
      label: 'Story',
      colorClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    };
  }
  if (f.includes('carrusel')) {
    return {
      icon: <Layers size={13} />,
      label: 'Carrusel',
      colorClass: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
    };
  }
  if (f.includes('video')) {
    return {
      icon: <Film size={13} />,
      label: 'Video',
      colorClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    };
  }
  return {
    icon: <BookOpen size={13} />,
    label: 'Post',
    colorClass: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
  };
};

const CalendarDosSoles = ({ activeTheme, onThemeToggle }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedTarget, setSelectedTarget] = useState('All');
  
  // Drawer state
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isPrestige = activeTheme === 'prestige';

  // Generate the full list of days in June 2026
  // June 1st, 2026 is a Monday (Lunes)
  const juneDays = useMemo(() => {
    const days = [];
    const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    for (let d = 1; d <= 30; d++) {
      const paddedDay = d < 10 ? `0${d}` : `${d}`;
      const dateStr = `${paddedDay}/06`;
      
      const post = scheduleData.find(item => getDayFromDate(item.date) === d);
      const weekday = weekdays[(d - 1) % 7];

      days.push({
        day: d,
        dateStr,
        weekday,
        post
      });
    }
    return days;
  }, []);

  // Filtered post data for list view and statistics
  const filteredData = useMemo(() => {
    return scheduleData.filter(item => {
      const matchesSearch = 
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.format.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFormat = selectedFormat === 'All' || item.format.toLowerCase().includes(selectedFormat.toLowerCase());
      
      const matchesTarget = selectedTarget === 'All' || 
        (selectedTarget === 'Ambos' && (item.target === 'Ambos' || item.target === 'B2B / B2C')) ||
        item.target === selectedTarget;

      return matchesSearch && matchesFormat && matchesTarget;
    });
  }, [searchQuery, selectedFormat, selectedTarget]);

  // Dynamic status / stats for metrics dashboard
  const statistics = useMemo(() => {
    const total = scheduleData.length;
    const reels = scheduleData.filter(p => p.format.toLowerCase().includes('reel')).length;
    const stories = scheduleData.filter(p => p.format.toLowerCase().includes('story')).length;
    const carruseles = scheduleData.filter(p => p.format.toLowerCase().includes('carrusel')).length;
    const others = total - reels - stories - carruseles;

    const b2b = scheduleData.filter(p => p.target === 'B2B').length;
    const b2c = scheduleData.filter(p => p.target === 'B2C').length;
    const ambos = scheduleData.filter(p => p.target === 'Ambos' || p.target === 'B2B / B2C').length;

    return { total, reels, stories, carruseles, others, b2b, b2c, ambos };
  }, []);

  const handleDayClick = (dayObj) => {
    if (dayObj.post) {
      setSelectedPost(dayObj.post);
      setIsDrawerOpen(true);
    } else {
      // Mock feature to add post on empty day
      const tempPost = {
        id: `NEW-${dayObj.day}`,
        date: `${dayObj.weekday} ${dayObj.day < 10 ? '0' + dayObj.day : dayObj.day}/06`,
        format: 'Reel',
        content: `Nueva propuesta de posteo para el día de ${dayObj.weekday}.\nMarca sugerida: Truss o L'Oréal.`,
        target: 'B2B',
        objective: 'Interacción / Venta'
      };
      setSelectedPost(tempPost);
      setIsDrawerOpen(true);
    }
  };

  // Format list selector options
  const formats = ['All', 'Reel', 'Story', 'Carrusel', 'Video', 'Post'];
  const targets = ['All', 'B2B', 'B2C', 'Ambos'];

  // Styling based on theme
  const containerClass = isPrestige 
    ? 'bg-brand-prestige-light/60 border border-brand-prestige-border text-gray-800' 
    : 'bg-[#151518]/90 border border-brand-crimson-border text-gray-100';

  const cardClass = isPrestige 
    ? 'bg-white hover:bg-brand-prestige-light/30 border border-brand-prestige-border shadow-sm' 
    : 'bg-brand-crimson-card hover:bg-[#252528] border border-brand-crimson-border shadow-md';

  const headerTextClass = isPrestige ? 'text-brand-prestige-dark font-serif' : 'text-white font-serif font-bold';
  const subtitleTextClass = isPrestige ? 'text-gray-500' : 'text-gray-400';
  
  const toggleBtnActive = isPrestige
    ? 'bg-brand-prestige-gold text-white shadow-sm'
    : 'bg-brand-crimson-red text-white shadow-sm';

  const toggleBtnInactive = isPrestige
    ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
    : 'bg-[#252528] hover:bg-zinc-700 text-gray-300';

  return (
    <div className={`w-full max-w-7xl mx-auto p-4 md:p-8 rounded-3xl transition-all duration-500 shadow-xl ${
      isPrestige ? 'bg-white/80 border border-brand-prestige-border' : 'bg-brand-crimson-card/85 border border-brand-crimson-border'
    }`}>
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-dashed border-gray-300 dark:border-gray-800">
        <div className="flex items-center space-x-5">
          {/* Real Logo display with fallback */}
          <div className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center border-2 ${
            isPrestige 
              ? 'border-brand-prestige-gold bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)]' 
              : 'border-brand-crimson-red bg-[#E13731] shadow-[0_0_15px_rgba(225,55,49,0.25)]'
          } shadow-lg shadow-black/10`}>
            <img 
              src={isPrestige ? 'logo-03.jpg' : 'logo-04.jpg'} 
              alt="Dos Soles Logo" 
              className="h-full w-full object-cover"
              onError={(e) => {
                // Inline SVG fallback if file fails to load
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<span class="font-bold text-center leading-none ${
                  isPrestige ? 'text-brand-prestige-gold text-xs' : 'text-brand-crimson-red text-xs'
                }">Dos<br/>Soles</span>`;
              }}
            />
          </div>
          <div>
            <h1 className={`text-2xl md:text-3.5xl tracking-tight leading-tight ${headerTextClass}`}>
              Dos Soles • Planificación de Redes
            </h1>
            <p className={`text-sm mt-1 flex items-center space-x-1.5 ${subtitleTextClass}`}>
              <CalendarDays size={14} className={isPrestige ? 'text-brand-prestige-gold' : 'text-brand-crimson-red'} />
              <span>Cronograma Estratégico de Contenidos • Junio 2026</span>
            </p>
          </div>
        </div>

        {/* Header Controls (Theme and View Toggles) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Theme Switcher Toggle */}
          <div className={`p-1.5 rounded-2xl flex items-center border ${
            isPrestige ? 'bg-gray-100 border-brand-prestige-border' : 'bg-brand-crimson-bg border-brand-crimson-border'
          }`}>
            <button 
              onClick={() => onThemeToggle('prestige')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isPrestige 
                  ? 'bg-brand-prestige-dark text-white shadow-md font-serif' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Logo 03 (Classic)
            </button>
            <button 
              onClick={() => onThemeToggle('crimson')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isPrestige 
                  ? 'bg-brand-crimson-red text-white shadow-md' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Logo 04 (Sunset)
            </button>
          </div>

          {/* View Mode Toggle (Grid vs List) */}
          <div className={`p-1 rounded-xl flex items-center ${
            isPrestige ? 'bg-gray-100' : 'bg-brand-crimson-bg'
          }`}>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? toggleBtnActive : 'text-gray-400'
              }`}
              title="Vista de Calendario"
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' ? toggleBtnActive : 'text-gray-400'
              }`}
              title="Vista de Tabla/Lista"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Stats Dashboard Panel */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-2xl ${containerClass}`}>
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Posteos</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">{statistics.total}</span>
            <span className="text-xs text-gray-400">programados</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Formatos Cortos</p>
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xl font-bold">{statistics.reels}</span>
              <span className="text-xs text-gray-400 ml-1">Reels</span>
            </div>
            <div>
              <span className="text-xl font-bold">{statistics.stories}</span>
              <span className="text-xs text-gray-400 ml-1">Stories</span>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Carruseles & Videos</p>
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xl font-bold">{statistics.carruseles}</span>
              <span className="text-xs text-gray-400 ml-1">Carr.</span>
            </div>
            <div>
              <span className="text-xl font-bold">{statistics.others}</span>
              <span className="text-xs text-gray-400 ml-1">Post</span>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Audiencia Objetivo</p>
          <div className="flex items-center space-x-3 text-xs mt-1 font-semibold">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{statistics.b2b} B2B</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{statistics.b2c} B2C</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{statistics.ambos} Ambos</span>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar por contenido, marca, objetivo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
              isPrestige 
                ? 'bg-white border border-brand-prestige-border focus:border-brand-prestige-gold focus:ring-brand-prestige-gold' 
                : 'bg-brand-crimson-bg border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white'
            }`}
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Format Filter */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${subtitleTextClass}`}>Formato:</span>
            <div className="flex flex-wrap gap-1">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedFormat === fmt 
                      ? toggleBtnActive 
                      : toggleBtnInactive
                  }`}
                >
                  {fmt === 'All' ? 'Todos' : fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience Filter */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${subtitleTextClass}`}>Público:</span>
            <div className="flex gap-1">
              {targets.map((tgt) => (
                <button
                  key={tgt}
                  onClick={() => setSelectedTarget(tgt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedTarget === tgt 
                      ? toggleBtnActive 
                      : toggleBtnInactive
                  }`}
                >
                  {tgt === 'All' ? 'Todos' : tgt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Views (Grid or List) */}
      {viewMode === 'grid' ? (
        /* VISTA CALENDARIO MENSUAL */
        <div className="space-y-4">
          {/* Grid Header (Weekdays) */}
          <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
              <div 
                key={day}
                className={`py-2 text-xs font-bold uppercase tracking-widest ${
                  isPrestige 
                    ? 'text-brand-prestige-dark border-b border-brand-prestige-border font-serif' 
                    : 'text-gray-400 border-b border-brand-crimson-border'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-2 md:gap-4 auto-rows-fr">
            {juneDays.map((dayObj) => {
              const post = dayObj.post;
              
              // Apply active filtering states visually
              let isFilteredOut = false;
              if (post) {
                const matchesSearch = 
                  post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.format.toLowerCase().includes(searchQuery.toLowerCase());
                
                const matchesFormat = selectedFormat === 'All' || post.format.toLowerCase().includes(selectedFormat.toLowerCase());
                
                const matchesTarget = selectedTarget === 'All' || 
                  (selectedTarget === 'Ambos' && (post.target === 'Ambos' || post.target === 'B2B / B2C')) ||
                  post.target === selectedTarget;

                if (!matchesSearch || !matchesFormat || !matchesTarget) {
                  isFilteredOut = true;
                }
              }

              // Specific badge details
              const badge = post ? getFormatBadgeDetails(post.format) : null;

              // Anniversary special background indicators
              const isAnniversaryDay = dayObj.day === 12 || dayObj.day === 13;
              let anniversaryHighlight = '';
              if (isAnniversaryDay) {
                anniversaryHighlight = isPrestige 
                  ? 'ring-2 ring-brand-prestige-gold/50 bg-amber-50/50' 
                  : 'ring-2 ring-brand-crimson-red/50 bg-brand-crimson-red/5';
              }

              return (
                <div
                  key={dayObj.day}
                  onClick={() => handleDayClick(dayObj)}
                  className={`min-h-[120px] md:min-h-[160px] p-2 md:p-3 rounded-2xl cursor-pointer flex flex-col justify-between transition-all scale-hover ${
                    post 
                      ? `${cardClass} ${isFilteredOut ? 'opacity-25' : 'opacity-100'}` 
                      : `border border-dashed ${
                          isPrestige 
                            ? 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/50' 
                            : 'border-zinc-800 bg-[#0F0F10]/50 hover:bg-[#1a1a1c]/50'
                        } text-gray-400`
                  } ${anniversaryHighlight}`}
                >
                  {/* Cell Header: Day Number and Anniversary Indicators */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs md:text-sm font-bold ${
                      post 
                        ? isPrestige ? 'text-brand-prestige-dark' : 'text-white' 
                        : 'text-gray-400'
                    }`}>
                      {dayObj.day}
                    </span>
                    
                    {isAnniversaryDay && (
                      <span className="flex h-2 w-2 relative">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isPrestige ? 'bg-brand-prestige-gold' : 'bg-brand-crimson-red'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${
                          isPrestige ? 'bg-brand-prestige-gold' : 'bg-brand-crimson-red'
                        }`}></span>
                      </span>
                    )}
                  </div>

                  {/* Cell Content (If post scheduled) */}
                  {post ? (
                    <div className="flex-1 flex flex-col justify-between mt-1 md:mt-2 space-y-1.5 md:space-y-2">
                      {/* Desktop/Tablet only: full text description */}
                      <p className={`text-[10px] md:text-xs leading-snug line-clamp-3 md:line-clamp-4 hidden sm:block ${
                        isPrestige ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        {post.content}
                      </p>
                      
                      {/* Mobile only: simplified clean icon badge */}
                      <div className="flex-1 flex items-center justify-center sm:hidden py-2">
                        <span className={`p-1.5 rounded-full border shadow-sm ${badge.colorClass}`}>
                          {badge.icon}
                        </span>
                      </div>
                      
                      {/* Desktop/Tablet only: badges footer */}
                      <div className="hidden sm:flex flex-col space-y-1 mt-auto">
                        {/* Format Indicator Badge */}
                        <div className="flex items-center space-x-1">
                          <span className={`flex items-center space-x-1 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badge.colorClass}`}>
                            {badge.icon}
                            <span className="hidden md:inline">{badge.label}</span>
                          </span>
                        </div>

                        {/* Audience Indicator Badge */}
                        <div className="flex">
                          <span className={`text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border uppercase ${
                            getTargetBadgeStyles(post.target, activeTheme)
                          }`}>
                            {post.target}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cell Content Empty */
                    <div className="flex-1 flex items-center justify-center py-2 sm:py-0">
                      <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-gray-300 dark:text-zinc-800">
                        {dayObj.weekday === 'Dom' && dayObj.day !== 28 ? 'Descanso' : 'Sin post'}
                      </span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VISTA DE LISTA / TABLA DETALLADA */
        <div className={`overflow-x-auto rounded-2xl border ${
          isPrestige ? 'border-brand-prestige-border bg-white' : 'border-brand-crimson-border bg-brand-crimson-card'
        }`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead>
              <tr className={isPrestige ? 'bg-brand-prestige-light/50' : 'bg-brand-crimson-bg'}>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Fecha</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Formato</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Contenido</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Público</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Objetivo</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredData.map((item) => {
                const badge = getFormatBadgeDetails(item.format);
                return (
                  <tr 
                    key={item.id}
                    onClick={() => {
                      setSelectedPost(item);
                      setIsDrawerOpen(true);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isPrestige ? 'hover:bg-brand-prestige-light/20' : 'hover:bg-zinc-800/40'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.colorClass}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-md truncate">
                      {item.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                        getTargetBadgeStyles(item.target, activeTheme)
                      }`}>
                        {item.target}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 italic">
                      {item.objective}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                          isPrestige ? 'text-brand-prestige-gold hover:text-brand-prestige-dark' : 'text-brand-crimson-red hover:text-white'
                        }`}
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No se encontraron posteos con los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Info Box (Anniversary Callout) */}
      <div className={`mt-8 p-5 rounded-2xl flex items-start space-x-4 border border-dashed ${
        isPrestige 
          ? 'bg-brand-prestige-light/40 border-brand-prestige-gold/40 text-brand-prestige-dark' 
          : 'bg-brand-crimson-red/5 border-brand-crimson-red/30 text-gray-200'
      }`}>
        <div className={isPrestige ? 'text-brand-prestige-gold' : 'text-brand-crimson-red'}>
          <Flame size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold uppercase tracking-wider">Hito de Junio: ¡19º Aniversario de Dos Soles!</h4>
          <p className="text-xs leading-relaxed text-gray-400">
            Los días 12 y 13 de junio se concentran posteos específicos de interacción e institucionales de branding humano por los 19 años de trayectoria de la empresa. Asegurar que las piezas visuales tengan el logo conmemorativo y transmitan el recorrido de la distribuidora.
          </p>
        </div>
      </div>

      {/* Slide-over Drawer component integration */}
      <PostDetailDrawer 
        post={selectedPost}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        theme={activeTheme}
      />
    </div>
  );
};

export default CalendarDosSoles;
