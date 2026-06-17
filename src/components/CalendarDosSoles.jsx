import React, { useState, useMemo, useEffect } from 'react';
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
  Grid,
  Settings,
  History,
  Lock,
  Unlock,
  Check,
  X,
  Trash2,
  Plus,
  Edit,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import PostDetailDrawer from './PostDetailDrawer';

// Base Structured Social Media Calendar Data (Fallback)
const fallbackScheduleData = [
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
  const [logoError, setLogoError] = useState(false);

  // Cloud database states
  const [dbData, setDbData] = useState({ posts: [], proposals: [], auditLog: [] });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState(localStorage.getItem('dosSolesAdminName') || '');
  const [adminTab, setAdminTab] = useState('proposals'); // 'proposals' or 'audit'
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    setLogoError(false);
  }, [activeTheme]);

  // Load cloud data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonblob.com/api/jsonBlob/019ed701-d38a-77bc-a854-83e9c6ef4fef');
        if (!response.ok) throw new Error('Failed to fetch from jsonblob');
        let data = await response.json();
        
        // Handle fallback/migration from legacy flat array
        if (Array.isArray(data)) {
          data = {
            posts: data,
            proposals: [],
            auditLog: []
          };
        } else {
          data = {
            posts: data.posts || [],
            proposals: data.proposals || [],
            auditLog: data.auditLog || []
          };
        }
        setDbData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
        // Resilient fallback to local static data
        setDbData({
          posts: fallbackScheduleData,
          proposals: [],
          auditLog: []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveToCloud = async (updatedData) => {
    try {
      const response = await fetch('https://jsonblob.com/api/jsonBlob/019ed701-d38a-77bc-a854-83e9c6ef4fef', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('Error PUTing to jsonblob');
      setDbData(updatedData);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Hubo un error al guardar los cambios en la nube. Revisa tu conexión.');
      return false;
    }
  };

  // Direct edit/create (Admin only)
  const handleSavePostDirectly = async (editedPost, editorName) => {
    if (!editorName) {
      alert('Debes ingresar tu nombre de administrador para registrar la auditoría.');
      return false;
    }
    
    let updatedPosts = [...dbData.posts];
    const isNew = typeof editedPost.id === 'string' && editedPost.id.startsWith('NEW-');
    
    let finalPostId = editedPost.id;
    if (isNew) {
      const maxId = dbData.posts.reduce((max, p) => p.id > max ? p.id : max, 0);
      finalPostId = maxId + 1;
      const cleanPost = {
        ...editedPost,
        id: finalPostId
      };
      updatedPosts.push(cleanPost);
    } else {
      updatedPosts = updatedPosts.map(p => p.id === editedPost.id ? editedPost : p);
    }
    
    // Create audit entry
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const auditEntry = {
      id: `audit-${Date.now()}`,
      timestamp,
      user: `${editorName} (Admin)`,
      action: isNew ? 'Creación de Posteo' : 'Edición de Posteo',
      details: isNew 
        ? `Creó posteo #${finalPostId} para el día ${editedPost.date}` 
        : `Editó posteo #${editedPost.id} (${editedPost.format})`
    };
    
    const updatedData = {
      ...dbData,
      posts: updatedPosts,
      auditLog: [auditEntry, ...dbData.auditLog].slice(0, 50)
    };
    
    const success = await saveToCloud(updatedData);
    if (success) {
      setIsDrawerOpen(false);
      setSelectedPost(null);
    }
    return success;
  };

  // Delete post (Admin only)
  const handleDeletePostDirectly = async (postId, editorName) => {
    if (!editorName) {
      alert('Debes ingresar tu nombre de administrador para registrar la auditoría.');
      return false;
    }
    
    const postToDelete = dbData.posts.find(p => p.id === postId);
    if (!postToDelete) return false;
    
    const updatedPosts = dbData.posts.filter(p => p.id !== postId);
    
    // Create audit entry
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const auditEntry = {
      id: `audit-${Date.now()}`,
      timestamp,
      user: `${editorName} (Admin)`,
      action: 'Eliminación de Posteo',
      details: `Eliminó posteo #${postId} del día ${postToDelete.date}`
    };
    
    const updatedData = {
      ...dbData,
      posts: updatedPosts,
      auditLog: [auditEntry, ...dbData.auditLog].slice(0, 50)
    };
    
    const success = await saveToCloud(updatedData);
    if (success) {
      setIsDrawerOpen(false);
      setSelectedPost(null);
    }
    return success;
  };

  // Submit new proposal (General User)
  const handleProposeChange = async (proposal) => {
    const newProposal = {
      id: `prop-${Date.now()}`,
      ...proposal,
      timestamp: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
    };
    
    const updatedProposals = [...dbData.proposals, newProposal];
    const updatedData = {
      ...dbData,
      proposals: updatedProposals
    };
    
    const success = await saveToCloud(updatedData);
    if (success) {
      alert('Propuesta enviada con éxito. Un administrador la revisará.');
      setIsDrawerOpen(false);
      setSelectedPost(null);
    }
    return success;
  };

  // Approve proposal (Admin)
  const handleApproveProposal = async (proposalId) => {
    if (!adminName) {
      alert('Por favor ingresa tu nombre en el Panel Admin antes de aprobar.');
      return;
    }
    
    const prop = dbData.proposals.find(p => p.id === proposalId);
    if (!prop) return;
    
    let updatedPosts = [...dbData.posts];
    const isNew = typeof prop.postId === 'string' && prop.postId.startsWith('NEW-');
    
    let finalPostId = prop.postId;
    if (isNew) {
      const maxId = dbData.posts.reduce((max, p) => p.id > max ? p.id : max, 0);
      finalPostId = maxId + 1;
      const cleanPost = {
        id: finalPostId,
        date: prop.date,
        format: prop.format,
        content: prop.content,
        target: prop.target,
        objective: prop.objective
      };
      updatedPosts.push(cleanPost);
    } else {
      updatedPosts = updatedPosts.map(p => {
        if (p.id === prop.postId) {
          return {
            ...p,
            format: prop.format,
            content: prop.content,
            target: prop.target,
            objective: prop.objective
          };
        }
        return p;
      });
    }
    
    const updatedProposals = dbData.proposals.filter(p => p.id !== proposalId);
    
    // Create audit entry
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const auditEntry = {
      id: `audit-${Date.now()}`,
      timestamp,
      user: `${adminName} (Admin)`,
      action: 'Aprobación de Propuesta',
      details: `Aprobó propuesta de ${prop.proposer} para el posteo #${finalPostId} (${prop.date})`
    };
    
    const updatedData = {
      posts: updatedPosts,
      proposals: updatedProposals,
      auditLog: [auditEntry, ...dbData.auditLog].slice(0, 50)
    };
    
    await saveToCloud(updatedData);
  };

  // Reject proposal (Admin)
  const handleRejectProposal = async (proposalId) => {
    if (!adminName) {
      alert('Por favor ingresa tu nombre en el Panel Admin antes de rechazar.');
      return;
    }
    
    const prop = dbData.proposals.find(p => p.id === proposalId);
    if (!prop) return;
    
    const updatedProposals = dbData.proposals.filter(p => p.id !== proposalId);
    
    // Create audit entry
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const auditEntry = {
      id: `audit-${Date.now()}`,
      timestamp,
      user: `${adminName} (Admin)`,
      action: 'Rechazo de Propuesta',
      details: `Rechazó la propuesta de ${prop.proposer} para el posteo #${prop.postId}`
    };
    
    const updatedData = {
      ...dbData,
      proposals: updatedProposals,
      auditLog: [auditEntry, ...dbData.auditLog].slice(0, 50)
    };
    
    await saveToCloud(updatedData);
  };

  const handleAdminNameChange = (name) => {
    setAdminName(name);
    localStorage.setItem('dosSolesAdminName', name);
  };

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (adminPassword === '2soles2026') {
      setIsAdmin(true);
      setPinError(false);
      setAdminPassword('');
    } else {
      setPinError(true);
    }
  };

  // Generate the full list of days in June 2026
  // June 1st, 2026 is a Monday (Lunes)
  const juneDays = useMemo(() => {
    const days = [];
    const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    for (let d = 1; d <= 30; d++) {
      const paddedDay = d < 10 ? `0${d}` : `${d}`;
      const dateStr = `${paddedDay}/06`;
      
      const post = dbData.posts.find(item => getDayFromDate(item.date) === d);
      const weekday = weekdays[(d - 1) % 7];

      days.push({
        day: d,
        dateStr,
        weekday,
        post
      });
    }
    return days;
  }, [dbData.posts]);

  // Filtered post data for list view and statistics
  const filteredData = useMemo(() => {
    return dbData.posts.filter(item => {
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
  }, [dbData.posts, searchQuery, selectedFormat, selectedTarget]);

  // Dynamic status / stats for metrics dashboard
  const statistics = useMemo(() => {
    const total = dbData.posts.length;
    const reels = dbData.posts.filter(p => p.format.toLowerCase().includes('reel')).length;
    const stories = dbData.posts.filter(p => p.format.toLowerCase().includes('story')).length;
    const carruseles = dbData.posts.filter(p => p.format.toLowerCase().includes('carrusel')).length;
    const others = total - reels - stories - carruseles;
    const published = dbData.posts.filter(p => p.published).length;

    const b2b = dbData.posts.filter(p => p.target === 'B2B').length;
    const b2c = dbData.posts.filter(p => p.target === 'B2C').length;
    const ambos = dbData.posts.filter(p => p.target === 'Ambos' || p.target === 'B2B / B2C').length;

    return { total, reels, stories, carruseles, others, b2b, b2c, ambos, published };
  }, [dbData.posts]);

  const handleDayClick = (dayObj) => {
    if (dayObj.post) {
      setSelectedPost(dayObj.post);
      setIsDrawerOpen(true);
    } else {
      // Create a fresh blank structure for empty days
      const tempPost = {
        id: `NEW-${dayObj.day}`,
        date: `${dayObj.weekday} ${dayObj.day < 10 ? '0' + dayObj.day : dayObj.day}/06`,
        format: 'Reel',
        content: '',
        target: 'B2B',
        objective: 'Interacción'
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
    ? 'bg-brand-prestige-crimson text-white shadow-sm'
    : 'bg-brand-crimson-red text-white shadow-sm';

  const toggleBtnInactive = isPrestige
    ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
    : 'bg-[#252528] hover:bg-zinc-700 text-gray-300';

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-12 text-center bg-brand-crimson-card border border-brand-crimson-border rounded-3xl flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-crimson-red"></div>
        <p className="text-gray-400 font-medium text-sm tracking-wider uppercase">Sincronizando con la nube...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3.5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 shadow-xl bg-brand-crimson-card/85 border border-brand-crimson-border">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 pb-6 border-b border-dashed border-zinc-800">
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Real Logo display with fallback */}
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl overflow-hidden flex items-center justify-center p-1 sm:p-1.5 border-2 border-brand-crimson-red bg-[#E13731] shadow-[0_0_15px_rgba(225,55,49,0.25)] shadow-lg shadow-black/10 shrink-0">
            {logoError ? (
              <span className="font-bold text-center leading-none text-brand-crimson-red text-[10px] sm:text-xs">Dos<br/>Soles</span>
            ) : (
              <img 
                src="logo-04.jpg" 
                alt="Dos Soles Logo" 
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div>
            <h1 className="text-sm sm:text-2xl md:text-3.5xl tracking-tight leading-tight text-white font-serif font-bold">
              Dos Soles • <br className="sm:hidden" />Planificación de Redes
            </h1>
            <p className="text-[10px] sm:text-sm mt-1.5 flex items-center space-x-1.5 text-gray-400">
              <CalendarDays size={14} className="text-brand-crimson-red shrink-0" />
              <span className="truncate">Cronograma Estratégico de Contenidos • Junio 2026</span>
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-3">
          {/* Admin Panel Button */}
          <button
            onClick={() => setAdminModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              isAdmin 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-brand-crimson-bg text-gray-300 border-brand-crimson-border hover:bg-[#252528]'
            }`}
          >
            {isAdmin ? <Unlock size={14} className="text-emerald-400" /> : <Lock size={14} />}
            <span>{isAdmin ? 'Modo Admin Activo' : 'Panel Admin'}</span>
          </button>

          {/* View Mode Toggle (Grid vs List - hidden on mobile) */}
          <div className="hidden sm:flex p-1 rounded-xl items-center bg-brand-crimson-bg border border-brand-crimson-border/60">
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
          <p className="text-[10px] text-emerald-400 font-semibold mt-1.5 flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span>{statistics.published} de ellos publicados</span>
          </p>
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
          <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-xs mt-1 font-semibold">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{statistics.b2b} B2B</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{statistics.b2c} B2C</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{statistics.ambos} Ambos</span>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 md:mb-8">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar por contenido, marca, objetivo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 bg-brand-crimson-bg border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
          />
        </div>

        {/* Filter Badges Container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto overflow-hidden">
          {/* Format Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto min-w-0">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">Formato:</span>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1 min-w-0 max-w-full">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
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
          <div className="flex items-center space-x-2 w-full sm:w-auto min-w-0">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">Público:</span>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1 min-w-0 max-w-full">
              {targets.map((tgt) => (
                <button
                  key={tgt}
                  onClick={() => setSelectedTarget(tgt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
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
      
      {/* Monthly Grid View (hidden on mobile, visible on sm and up when viewMode === 'grid') */}
      <div className={`w-full overflow-x-auto scrollbar-none pb-2 ${
        viewMode === 'grid' ? 'sm:block' : 'sm:hidden'
      } hidden`}>
        <div className="min-w-[640px] sm:min-w-0 space-y-4">
          {/* Grid Header (Weekdays) */}
          <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
              <div 
                key={day}
                className="py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-brand-crimson-border"
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

              // Check for pending proposals
              const postProposals = post 
                ? dbData.proposals.filter(p => p.postId === post.id) 
                : dbData.proposals.filter(p => p.postId === `NEW-${dayObj.day}`);
              const hasPendingProposal = postProposals.length > 0;

              // Anniversary special background indicators
              const isAnniversaryDay = dayObj.day === 12 || dayObj.day === 13;
              let anniversaryHighlight = '';
              if (isAnniversaryDay) {
                anniversaryHighlight = 'ring-2 ring-brand-crimson-red/50 bg-brand-crimson-red/5';
              }

              return (
                <div
                  key={dayObj.day}
                  onClick={() => handleDayClick(dayObj)}
                  className={`min-h-[64px] sm:min-h-[120px] md:min-h-[160px] p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl cursor-pointer flex flex-col justify-between transition-all scale-hover ${
                    post 
                      ? `${cardClass} ${isFilteredOut ? 'opacity-25' : 'opacity-100'}` 
                      : 'border border-dashed border-zinc-800 bg-[#0F0F10]/50 hover:bg-[#1a1a1c]/50 text-gray-400'
                  } ${anniversaryHighlight}`}
                >
                  {/* Cell Header: Day Number and Anniversary Indicators */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-1">
                      <span className={`text-[10px] sm:text-xs md:text-sm font-bold ${
                        post ? 'text-white' : 'text-gray-400'
                      }`}>
                        {dayObj.day}
                      </span>
                      {post?.published && (
                        <span className="text-[9px] sm:text-[10px] text-emerald-400 flex items-center shrink-0" title="Publicado">
                          <Check size={11} className="stroke-[3.5]" />
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 font-semibold">
                      {hasPendingProposal && (
                        <span className="text-[10px] text-amber-400 animate-pulse" title="Propuesta Pendiente">
                          📝
                        </span>
                      )}
                      {isAnniversaryDay && (
                        <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-brand-crimson-red"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-brand-crimson-red"></span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cell Content (If post scheduled) */}
                  {post ? (
                    <div className="flex-1 flex flex-col justify-between mt-1 md:mt-2 space-y-1.5 md:space-y-2">
                      {/* Desktop/Tablet only: full text description */}
                      <p className="text-[10px] md:text-xs leading-snug line-clamp-3 md:line-clamp-4 hidden sm:block text-gray-300">
                        {post.content}
                      </p>
                      
                      {/* Mobile only: simplified clean icon badge */}
                      <div className="flex-1 flex items-center justify-center sm:hidden py-1">
                        <span className={`p-1 rounded-full border shadow-sm ${badge.colorClass}`}>
                          {badge.icon}
                        </span>
                      </div>
                      
                      {/* Desktop/Tablet only: badges footer */}
                      <div className="hidden sm:flex flex-col space-y-1 mt-auto">
                        {hasPendingProposal && (
                          <div className="flex">
                            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wide">
                              📝 Propuesta
                            </span>
                          </div>
                        )}
                        {/* Format Indicator Badge */}
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className={`flex items-center space-x-1 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badge.colorClass}`}>
                            {badge.icon}
                            <span className="hidden md:inline">{badge.label}</span>
                          </span>
                          {post.published && (
                            <span className="flex items-center space-x-0.5 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                              <Check size={9} className="stroke-[3.5]" />
                              <span className="hidden md:inline">Publicado</span>
                              <span className="md:hidden">Pub.</span>
                            </span>
                          )}
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
                    <div className="flex-1 flex flex-col justify-center py-1 sm:py-0 space-y-1">
                      {hasPendingProposal && (
                        <div className="flex justify-center sm:justify-start">
                          <span className="text-[8px] font-extrabold px-1 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wide">
                            📝 Propuesta
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-center">
                        <span className="hidden sm:inline text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-zinc-800">
                          {dayObj.weekday === 'Dom' && dayObj.day !== 28 ? 'Descanso' : 'Sin post'}
                        </span>
                        <span className="sm:hidden h-1.5 w-1.5 rounded-full bg-zinc-700/60" />
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* List / Table View (always visible on mobile as card list, visible on desktop when viewMode === 'list') */}
      <div className={`${
        viewMode === 'list' ? 'sm:block' : 'sm:hidden'
      } block`}>
        <div className="space-y-3 sm:space-y-0 sm:overflow-x-auto sm:rounded-2xl sm:border sm:border-brand-crimson-border sm:bg-brand-crimson-card">
          {/* Mobile List View (rendered only on mobile) */}
          <div className="flex flex-col gap-3 sm:hidden">
            {filteredData.map((item) => {
              const badge = getFormatBadgeDetails(item.format);
              const postProposals = dbData.proposals.filter(p => p.postId === item.id);
              const hasPendingProposal = postProposals.length > 0;
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSelectedPost(item);
                    setIsDrawerOpen(true);
                  }}
                  className="p-4 rounded-2xl border border-brand-crimson-border bg-brand-crimson-card hover:bg-[#252528] transition-colors cursor-pointer flex flex-col gap-3 font-semibold text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{item.date}</span>
                    <div className="flex items-center space-x-2">
                      {item.published && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex items-center space-x-1">
                          <Check size={9} className="stroke-[3.5]" />
                          <span>Publicado</span>
                        </span>
                      )}
                      {hasPendingProposal && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                          Propuesta
                        </span>
                      )}
                      <span className={`inline-flex items-center space-x-1 text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.colorClass}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {item.content || <span className="italic text-gray-500">Posteo sin copy asignado aún.</span>}
                  </p>
                  <div className="flex items-center justify-between pt-2.5 border-t border-brand-crimson-border/40">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border uppercase ${
                        getTargetBadgeStyles(item.target, activeTheme)
                      }`}>
                        {item.target}
                      </span>
                      <span className="text-[10px] text-gray-400 italic">{item.objective}</span>
                    </div>
                    <span className="text-[10px] font-bold text-brand-crimson-red uppercase tracking-wider shrink-0">Ver Detalle →</span>
                  </div>
                </div>
              );
            })}
            {filteredData.length === 0 && (
              <div className="p-8 text-center text-gray-500 border border-dashed border-brand-crimson-border rounded-2xl">
                No se encontraron posteos con los filtros actuales.
              </div>
            )}
          </div>

          {/* Desktop Table View (hidden on mobile, visible on sm and up) */}
          <table className="min-w-full divide-y divide-zinc-800 hidden sm:table text-left">
            <thead>
              <tr className="bg-brand-crimson-bg">
                <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Fecha</th>
                <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Formato</th>
                <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Contenido</th>
                <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Público</th>
                <th scope="col" className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Objetivo</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredData.map((item) => {
                const badge = getFormatBadgeDetails(item.format);
                const postProposals = dbData.proposals.filter(p => p.postId === item.id);
                const hasPendingProposal = postProposals.length > 0;
                return (
                  <tr 
                    key={item.id}
                    onClick={() => {
                      setSelectedPost(item);
                      setIsDrawerOpen(true);
                    }}
                    className="cursor-pointer transition-colors hover:bg-zinc-800/40"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold flex items-center space-x-2">
                      {hasPendingProposal && (
                        <span className="text-amber-400 animate-pulse" title="Propuesta Pendiente">📝</span>
                      )}
                      <span>{item.date}</span>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {item.published && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex items-center space-x-1">
                            <Check size={10} className="stroke-[3.5]" />
                            <span>Publicado</span>
                          </span>
                        )}
                        {hasPendingProposal && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                            Propuesta
                          </span>
                        )}
                        <span className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.colorClass}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-md truncate">
                      {item.content || <span className="italic text-gray-500">Posteo sin copy asignado aún.</span>}
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
                        className="text-xs font-bold uppercase tracking-wider transition-colors text-brand-crimson-red hover:text-white"
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
      </div>

      {/* 5. Info Box (Anniversary Callout) */}
      <div className="mt-8 p-4 md:p-5 rounded-2xl flex items-start space-x-3 md:space-x-4 border border-dashed bg-brand-crimson-red/5 border-brand-crimson-red/30 text-gray-200">
        <div className="text-brand-crimson-red shrink-0">
          <Flame size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold uppercase tracking-wider">Hito de Junio: ¡19º Aniversario de Dos Soles!</h4>
          <p className="text-xs leading-relaxed text-gray-400">
            Los días 12 y 13 de junio se concentran posteos específicos de interacción e institucionales de branding humano por los 19 años de trayectoria de la empresa. Asegurar que las piezas visuales tengan el logo conmemorativo y transmitan el recorrido de la distribuidora.
          </p>
        </div>
      </div>

      {/* 6. Admin Panel Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111113] border border-brand-crimson-border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-brand-crimson-border/60 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <Settings className="text-brand-crimson-red" size={20} />
                <h3 className="text-lg font-serif font-bold text-white">
                  Panel de Control Administrativo
                </h3>
              </div>
              <button 
                onClick={() => { setAdminModalOpen(false); setPinError(false); }}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {!isAdmin ? (
                /* Login Form */
                <form onSubmit={handleLoginAdmin} className="space-y-4 max-w-sm mx-auto py-8">
                  <div className="text-center space-y-2 mb-6 text-gray-300">
                    <Lock size={36} className="mx-auto text-brand-crimson-red" />
                    <p className="text-sm">
                      Ingresa el PIN de administrador para habilitar las modificaciones directas y revisar propuestas.
                    </p>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">PIN de Acceso</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:ring-1 bg-brand-crimson-bg border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                      autoFocus
                    />
                    {pinError && (
                      <p className="text-xs text-brand-crimson-red font-semibold text-center mt-1">
                        PIN incorrecto. Intenta de nuevo.
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-crimson-red hover:bg-brand-crimson-hover text-white transition-colors shadow-lg shadow-black/20"
                  >
                    Desbloquear Panel
                  </button>
                </form>
              ) : (
                /* Authenticated Admin view */
                <div className="space-y-5">
                  {/* Admin details & logs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-brand-crimson-bg border border-brand-crimson-border/60 text-left">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Tu Nombre de Editor (Requerido)</label>
                      <input 
                        type="text"
                        placeholder="Ej: Pedro"
                        value={adminName}
                        onChange={(e) => handleAdminNameChange(e.target.value)}
                        className="w-full sm:max-w-xs px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white font-semibold"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setIsAdmin(false);
                          setAdminModalOpen(false);
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-zinc-700 hover:bg-zinc-800 text-gray-300 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-brand-crimson-border/40">
                    <button
                      onClick={() => setAdminTab('proposals')}
                      className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                        adminTab === 'proposals' 
                          ? 'border-brand-crimson-red text-white' 
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <ClipboardList size={14} />
                      <span>Cola de Propuestas ({dbData.proposals.length})</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('audit')}
                      className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                        adminTab === 'audit' 
                          ? 'border-brand-crimson-red text-white' 
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      <History size={14} />
                      <span>Auditoría</span>
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {adminTab === 'proposals' ? (
                    <div className="space-y-3">
                      {dbData.proposals.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 border border-dashed border-brand-crimson-border/60 rounded-xl">
                          No hay propuestas pendientes de revisión. ¡Buen trabajo!
                        </div>
                      ) : (
                        dbData.proposals.map((prop) => {
                          const existingPost = dbData.posts.find(p => p.id === prop.postId);
                          const isNewPost = typeof prop.postId === 'string' && prop.postId.startsWith('NEW-');
                          return (
                            <div key={prop.id} className="p-4 rounded-xl border border-brand-crimson-border bg-brand-crimson-bg/40 flex flex-col gap-3 text-left">
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span className="text-gray-400">
                                  Propuesto por: <span className="text-white font-extrabold">{prop.proposer}</span>
                                </span>
                                <span className="text-gray-500">{prop.timestamp}</span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div>
                                  <h4 className="font-extrabold text-brand-crimson-red mb-1 uppercase tracking-wide">
                                    {isNewPost ? 'Nuevo Posteo Propuesto' : `Posteo original #${prop.postId}`}
                                  </h4>
                                  <div className="p-2.5 rounded bg-black/30 border border-zinc-800 text-gray-400 space-y-1">
                                    <p><strong>Fecha:</strong> {prop.date}</p>
                                    {!isNewPost && existingPost && (
                                      <>
                                        <p><strong>Formato:</strong> {existingPost.format}</p>
                                        <p><strong>Público:</strong> {existingPost.target}</p>
                                        <p><strong>Objetivo:</strong> {existingPost.objective}</p>
                                        <p className="line-clamp-3"><strong>Copy:</strong> {existingPost.content}</p>
                                      </>
                                    )}
                                    {isNewPost && <p className="italic">Día vacío en el calendario</p>}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-extrabold text-green-400 mb-1 uppercase tracking-wide">Cambios Sugeridos</h4>
                                  <div className="p-2.5 rounded bg-black/40 border border-zinc-800 text-gray-200 space-y-1">
                                    <p><strong>Formato:</strong> {prop.format}</p>
                                    <p><strong>Público:</strong> {prop.target}</p>
                                    <p><strong>Objetivo:</strong> {prop.objective}</p>
                                    <p><strong>Copy Sugerido:</strong></p>
                                    <p className="text-white whitespace-pre-wrap font-serif italic mt-1 leading-snug">{prop.content || '(Vacío)'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Proposal actions */}
                              <div className="flex justify-end gap-2 pt-2 border-t border-brand-crimson-border/30">
                                <button
                                  onClick={() => handleRejectProposal(prop.id)}
                                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-crimson-red/25 hover:bg-brand-crimson-red/40 text-brand-crimson-red transition-colors border border-brand-crimson-red/20"
                                >
                                  <X size={13} className="text-brand-crimson-red" />
                                  <span>Rechazar</span>
                                </button>
                                <button
                                  onClick={() => handleApproveProposal(prop.id)}
                                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow shadow-black/20"
                                >
                                  <Check size={13} className="text-white" />
                                  <span>Aprobar y Aplicar</span>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    /* Audit Log */
                    <div className="overflow-x-auto border border-brand-crimson-border/60 rounded-xl bg-brand-crimson-bg/20">
                      <table className="min-w-full divide-y divide-zinc-800 text-left text-xs">
                        <thead>
                          <tr className="bg-brand-crimson-bg">
                            <th className="px-4 py-3 font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                            <th className="px-4 py-3 font-bold text-gray-400 uppercase tracking-wider">Usuario</th>
                            <th className="px-4 py-3 font-bold text-gray-400 uppercase tracking-wider">Acción</th>
                            <th className="px-4 py-3 font-bold text-gray-400 uppercase tracking-wider">Detalles</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 text-gray-300">
                          {dbData.auditLog.map((log) => (
                            <tr key={log.id} className="hover:bg-zinc-800/20">
                              <td className="px-4 py-3 whitespace-nowrap text-gray-500">{log.timestamp}</td>
                              <td className="px-4 py-3 whitespace-nowrap font-semibold text-white">{log.user}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  log.action.includes('Creación') 
                                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                                    : log.action.includes('Eliminación')
                                      ? 'bg-brand-crimson-red/15 text-brand-crimson-red border border-brand-crimson-red/20'
                                      : log.action.includes('Aprobación')
                                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {log.action}
                                </span>
                              </td>
                              <td className="px-4 py-3">{log.details}</td>
                            </tr>
                          ))}
                          {dbData.auditLog.length === 0 && (
                            <tr>
                              <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                Aún no se registran acciones en la auditoría.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-brand-crimson-border/60 flex justify-end shrink-0 bg-[#0c0c0d]">
              <button
                onClick={() => { setAdminModalOpen(false); setPinError(false); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1d1d20] hover:bg-[#27272a] text-gray-200 transition-colors"
              >
                Cerrar Panel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Slide-over Drawer component integration */}
      <PostDetailDrawer 
        post={selectedPost}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        theme={activeTheme}
        isAdmin={isAdmin}
        proposals={dbData.proposals}
        adminName={adminName}
        onSavePost={handleSavePostDirectly}
        onDeletePost={handleDeletePostDirectly}
        onProposeChange={handleProposeChange}
      />
    </div>
  );
};

export default CalendarDosSoles;
