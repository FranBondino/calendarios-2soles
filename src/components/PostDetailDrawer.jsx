import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  Target, 
  Sparkles, 
  Award, 
  Hash, 
  ListTodo, 
  ExternalLink,
  Trash2,
  Save,
  Send,
  ArrowLeft
} from 'lucide-react';

const PostDetailDrawer = ({ 
  post, 
  isOpen, 
  onClose, 
  theme,
  isAdmin,
  proposals = [],
  adminName,
  onSavePost,
  onDeletePost,
  onProposeChange
}) => {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState([]);

  // Editor states (Admin Direct Edit)
  const [editFormat, setEditFormat] = useState('Reel');
  const [editContent, setEditContent] = useState('');
  const [editTarget, setEditTarget] = useState('B2B');
  const [editObjective, setEditObjective] = useState('Interacción');
  const [editorName, setEditorName] = useState(adminName || '');
  const [editPublished, setEditPublished] = useState(false);
  const [editNeedsReview, setEditNeedsReview] = useState(false);

  // User proposal states
  const [isProposing, setIsProposing] = useState(false);
  const [proposerName, setProposerName] = useState('');

  // Default checklist templates based on social media formats
  const getFormatChecklist = (format) => {
    const defaultItems = [
      { id: 'visual', text: 'Verificar resolución y relación de aspecto (9:16 o 4:5)', checked: false },
      { id: 'brand', text: 'Incluir logo Dos Soles en marcas de agua o cierre', checked: false },
      { id: 'cta', text: 'Llamada a la acción (CTA) clara en el copy/diseño', checked: false }
    ];

    const lowerFormat = format?.toLowerCase() || '';

    if (lowerFormat.includes('story')) {
      return [
        { id: 'sticker', text: 'Añadir sticker interactivo (Caja de preguntas, Encuesta o Trivia)', checked: false },
        { id: 'link', text: 'Agregar enlace a tienda o botón "Enviar Mensaje"', checked: false },
        { id: 'duration', text: 'Asegurar ritmo dinámico (máximo 15 segundos)', checked: false },
        ...defaultItems
      ];
    } else if (lowerFormat.includes('reel') || lowerFormat.includes('video')) {
      return [
        { id: 'audio', text: 'Buscar y guardar audio en tendencia en Instagram', checked: false },
        { id: 'hook', text: 'Texto de gancho visual en los primeros 3 segundos', checked: false },
        { id: 'captions', text: 'Añadir subtítulos automáticos para visualización sin sonido', checked: false },
        { id: 'cover', text: 'Diseñar portada atractiva que mantenga la estética del feed', checked: false },
        ...defaultItems
      ];
    } else if (lowerFormat.includes('carrusel')) {
      return [
        { id: 'slide1', text: 'Primera diapositiva con título de alto impacto', checked: false },
        { id: 'carousel-flow', text: 'Flujo visual continuo entre diapositivas (deslizar)', checked: false },
        { id: 'save', text: 'Incentivo explícito a "Guardar" o "Compartir"', checked: false },
        ...defaultItems
      ];
    }

    return defaultItems;
  };

  // Generate checklist and load editor states on post load
  useEffect(() => {
    if (post) {
      setChecklist(getFormatChecklist(post.format));
      setEditFormat(post.format || 'Reel');
      setEditContent(post.content || '');
      setEditTarget(post.target || 'B2B');
      setEditObjective(post.objective || 'Interacción');
      setEditPublished(post.published || false);
      setEditNeedsReview(post.needsReview || false);
      setIsProposing(false);
    }
    setCopied(false);
  }, [post]);

  useEffect(() => {
    if (adminName) {
      setEditorName(adminName);
    }
  }, [adminName]);

  const handleCopy = () => {
    const textToCopy = isAdmin ? editContent : post?.content;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleTogglePublishedDirectly = async () => {
    const updated = {
      ...post,
      published: !post.published
    };
    const success = await onSavePost(updated, editorName || adminName || 'Admin');
    if (success) {
      onClose();
    }
  };

  const handleToggleNeedsReviewDirectly = async () => {
    const updated = {
      ...post,
      needsReview: !post.needsReview
    };
    const success = await onSavePost(updated, editorName || adminName || 'Admin');
    if (success) {
      onClose();
    }
  };

  const handleAdminSave = async () => {
    if (!editorName.trim()) {
      alert('Por favor, ingresa tu nombre de administrador para registrar la auditoría.');
      return;
    }
    const edited = {
      ...post,
      format: editFormat,
      target: editTarget,
      objective: editObjective,
      content: editContent,
      published: editPublished,
      needsReview: editNeedsReview
    };
    const success = await onSavePost(edited, editorName);
    if (success) {
      onClose();
    }
  };

  const handleAdminDelete = async () => {
    if (!editorName.trim()) {
      alert('Por favor, ingresa tu nombre de administrador para registrar la auditoría.');
      return;
    }
    if (confirm(`¿Estás seguro de que deseas eliminar la publicación #${post.id}?`)) {
      const success = await onDeletePost(post.id, editorName);
      if (success) {
        onClose();
      }
    }
  };

  const handleUserPropose = async () => {
    if (!proposerName.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    if (!editContent.trim()) {
      alert('Por favor, ingresa tu propuesta de copy.');
      return;
    }
    const proposal = {
      postId: post.id,
      date: post.date,
      proposer: proposerName,
      format: editFormat,
      content: editContent,
      target: editTarget,
      objective: editObjective
    };
    const success = await onProposeChange(proposal);
    if (success) {
      setProposerName('');
      setIsProposing(false);
      onClose();
    }
  };

  // Dynamic tags suggestion based on post contents
  const getSuggestedHashtags = (content) => {
    const tags = ['#DosSoles', '#Peluqueria', '#Estilistas'];
    const text = content?.toLowerCase() || '';

    if (text.includes('truss')) {
      tags.push('#TrussProfessional', '#TrussHair', '#TrussCosmetics');
    }
    if (text.includes('liss expert')) {
      tags.push('#LissExpert', '#AlisadoPerfecto', '#CabelloSaludable');
    }
    if (text.includes('l\'oréal') || text.includes('loreal')) {
      tags.push('#LorealPro', '#SerieExpert', '#LorealHair');
    }
    if (text.includes('matrix')) {
      tags.push('#MatrixHair', '#MatrixColor', '#PeloIncreible');
    }
    if (text.includes('aniversario')) {
      tags.push('#Aniversario19', '#DosSolesAniversario', '#Trayectoria');
    }
    if (text.includes('rubio') || text.includes('winter') || text.includes('invierno')) {
      tags.push('#WinterHair', '#RubiosDosSoles', '#TendenciasInvierno');
    }
    if (text.includes('frizz') || text.includes('opaco')) {
      tags.push('#AntiFrizz', '#BrilloNatural', '#HairTherapy');
    }

    return tags;
  };

  if (!post) return null;

  const isPrestige = theme === 'prestige';
  const isNewPost = typeof post.id === 'string' && post.id.startsWith('NEW-');
  const activeProposal = proposals.find(p => p.postId === post.id);

  // Theme styling definitions
  const borderClass = isPrestige ? 'border-brand-prestige-border' : 'border-brand-crimson-border';
  const textTitleClass = isPrestige ? 'text-brand-prestige-dark font-serif' : 'text-white font-serif font-bold';
  const textSubClass = isPrestige ? 'text-gray-500' : 'text-gray-400';
  const contentBgClass = isPrestige ? 'bg-brand-prestige-light/60 border border-brand-prestige-border' : 'bg-brand-crimson-bg border border-brand-crimson-border';
  const primaryButtonClass = isPrestige 
    ? 'bg-brand-prestige-crimson hover:bg-brand-prestige-crimsonhover text-white' 
    : 'bg-brand-crimson-red hover:bg-brand-crimson-hover text-white';

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg h-full shadow-2xl transition-transform duration-300 ease-out transform flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isPrestige ? 'bg-white text-gray-800' : 'bg-brand-crimson-card text-gray-200'}`}
      >
        {/* Header (Static) */}
        <div className={`flex items-center justify-between border-b p-4 sm:p-6 shrink-0 ${borderClass}`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase ${isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}`}>
              {isAdmin ? 'Panel de Edición Directa' : isProposing ? 'Crear Propuesta' : 'Detalle del Posteo'}
            </span>
            <h3 className={`text-xl ${textTitleClass} mt-0.5`}>
              {isNewPost ? `Nuevo Posteo (${post.date})` : `Publicación #${post.id}`}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isPrestige ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-brand-crimson-bg text-gray-400'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {isAdmin ? (
            /* Admin Direct Edit Form */
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-left">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Modo Administrador Activo</span>
                <p className="text-xs text-gray-400">Los cambios que guardes se aplicarán instantáneamente en la nube para todos los usuarios.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Formato</label>
                  <select
                    value={editFormat}
                    onChange={(e) => setEditFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                  >
                    <option value="Reel">Reel</option>
                    <option value="Story">Story</option>
                    <option value="Carrusel">Carrusel</option>
                    <option value="Video">Video</option>
                    <option value="Post">Post</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Público Objetivo</label>
                  <select
                    value={editTarget}
                    onChange={(e) => setEditTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                  >
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="Ambos">Ambos</option>
                    <option value="B2B / B2C">B2B / B2C</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Objetivo del Post</label>
                <input
                  type="text"
                  value={editObjective}
                  onChange={(e) => setEditObjective(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Idea y Copy de Contenido</label>
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white leading-relaxed font-sans"
                  placeholder="Escribe el copy del posteo aquí..."
                />
              </div>

              {/* Published state toggle */}
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-[#1a1a1c] border border-brand-crimson-border text-left">
                <input
                  type="checkbox"
                  id="editPublished"
                  checked={editPublished}
                  onChange={(e) => setEditPublished(e.target.checked)}
                  className="h-4 w-4 rounded text-brand-crimson-red border-brand-crimson-border bg-zinc-900 focus:ring-offset-0 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="editPublished" className="text-xs font-bold uppercase tracking-wider text-gray-300 cursor-pointer select-none">
                  Marcar como Publicado
                </label>
              </div>

              {/* Needs Review toggle */}
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-[#1a1a1c] border border-brand-crimson-border text-left">
                <input
                  type="checkbox"
                  id="editNeedsReview"
                  checked={editNeedsReview}
                  onChange={(e) => setEditNeedsReview(e.target.checked)}
                  className="h-4 w-4 rounded text-amber-500 border-brand-crimson-border bg-zinc-900 focus:ring-offset-0 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="editNeedsReview" className="text-xs font-bold uppercase tracking-wider text-amber-400 cursor-pointer select-none">
                  Marcar para revisión de cliente
                </label>
              </div>

              <div className="space-y-1.5 text-left p-3 rounded-lg bg-zinc-900 border border-brand-crimson-border/60">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Tu Nombre de Editor (Requerido para Auditoría)</label>
                <input
                  type="text"
                  placeholder="Ej: Pedro"
                  value={editorName}
                  onChange={(e) => {
                    setEditorName(e.target.value);
                    localStorage.setItem('dosSolesAdminName', e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white font-semibold"
                />
              </div>
            </div>
          ) : isProposing ? (
            /* User Proposal Edit Form */
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-left">
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-xs">
                  <Sparkles size={14} />
                  <span>Proponer Modificación</span>
                </div>
                <p className="text-xs text-gray-400">Tu sugerencia será enviada a la cola de revisión del administrador. No sobreescribirá el posteo real hasta ser aprobada.</p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Tu Nombre (Obligatorio)</label>
                <input
                  type="text"
                  placeholder="Ej: Clara"
                  value={proposerName}
                  onChange={(e) => setProposerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Formato Sugerido</label>
                  <select
                    value={editFormat}
                    onChange={(e) => setEditFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                  >
                    <option value="Reel">Reel</option>
                    <option value="Story">Story</option>
                    <option value="Carrusel">Carrusel</option>
                    <option value="Video">Video</option>
                    <option value="Post">Post</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Público Sugerido</label>
                  <select
                    value={editTarget}
                    onChange={(e) => setEditTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                  >
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="Ambos">Ambos</option>
                    <option value="B2B / B2C">B2B / B2C</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Objetivo Sugerido</label>
                <input
                  type="text"
                  value={editObjective}
                  onChange={(e) => setEditObjective(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Copy de Contenido Sugerido</label>
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 bg-[#1a1a1c] border border-brand-crimson-border focus:border-brand-crimson-red focus:ring-brand-crimson-red text-white leading-relaxed font-sans"
                  placeholder="Escribe tu propuesta de copy aquí..."
                  required
                />
              </div>
            </div>
          ) : (
            /* Normal Visitor Detail View */
            <div className="space-y-4 sm:space-y-6">
              
              {/* Publication & Review Status Card */}
              <div className={`p-3.5 rounded-xl flex flex-col gap-3 text-left ${contentBgClass}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${textSubClass}`}>Estado de Publicación</span>
                  <div className="flex items-center space-x-2">
                    {post.published ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                        <Check size={12} className="stroke-[3.5]" />
                        <span>Publicado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-wider">
                        <span>Planificado</span>
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        onClick={handleTogglePublishedDirectly}
                        className="text-[10px] font-bold text-brand-crimson-red hover:text-brand-crimson-hover hover:underline uppercase tracking-wider pl-2 transition-colors focus:outline-none shrink-0"
                      >
                        {post.published ? 'Cambiar a Planificado' : 'Marcar Publicado'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-crimson-border/30 pt-2.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${textSubClass}`}>Revisión de Cliente</span>
                  <div className="flex items-center space-x-2">
                    {post.needsReview ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider animate-pulse">
                        <Info size={12} className="stroke-[3]" />
                        <span>Requiere Revisión</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-wider">
                        <span>Revisado / Sin marcas</span>
                      </span>
                    )}
                    {isAdmin && (
                      <button
                        onClick={handleToggleNeedsReviewDirectly}
                        className="text-[10px] font-bold text-amber-400 hover:text-amber-300 hover:underline uppercase tracking-wider pl-2 transition-colors focus:outline-none shrink-0"
                      >
                        {post.needsReview ? 'Quitar Marca' : 'Marcar para Revisar'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Review Banner Instruction */}
              {post.needsReview && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left flex items-start space-x-3">
                  <Info size={18} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Este día requiere tu revisión</h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      Por favor, revisa el contenido propuesto para esta fecha. Si tienes comentarios o deseas cambiar el texto/formato, puedes proponer una modificación haciendo clic en **"Proponer Cambio"** abajo.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Proposal Warning Banner if proposal active */}
              {activeProposal && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                    <span>📝 Propuesta Pendiente</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    <strong>Sugerido por:</strong> {activeProposal.proposer} ({activeProposal.timestamp})
                  </p>
                  <div className="text-xs space-y-1.5 bg-black/35 p-3 rounded border border-zinc-800 text-gray-300">
                    <p><strong>Formato:</strong> {activeProposal.format} | <strong>Público:</strong> {activeProposal.target} | <strong>Objetivo:</strong> {activeProposal.objective}</p>
                    <p className="font-serif italic leading-relaxed text-white mt-1.5 whitespace-pre-wrap">"{activeProposal.content || '(Sin copy propuesto)'}"</p>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Un administrador debe revisar y aprobar esta propuesta en el panel.</p>
                </div>
              )}

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className={`p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 ${contentBgClass}`}>
                  <div className="text-brand-crimson-red shrink-0">
                    <Clock size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">Fecha Planificada</p>
                    <p className="font-semibold text-xs sm:text-sm text-white leading-tight break-words">{post.date}</p>
                  </div>
                </div>

                <div className={`p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 ${contentBgClass}`}>
                  <div className="text-brand-crimson-red shrink-0">
                    <Target size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">Público Objetivo</p>
                    <p className="font-semibold text-xs sm:text-sm text-white leading-tight break-words">{post.target}</p>
                  </div>
                </div>

                <div className={`p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 ${contentBgClass}`}>
                  <div className="text-brand-crimson-red shrink-0">
                    <Sparkles size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">Formato</p>
                    <span className="inline-block px-1.5 py-0.5 mt-0.5 rounded text-[10px] font-semibold uppercase bg-brand-crimson-red/20 text-brand-crimson-red border border-brand-crimson-red/30 truncate">
                      {post.format}
                    </span>
                  </div>
                </div>

                <div className={`p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 ${contentBgClass}`}>
                  <div className="text-brand-crimson-red shrink-0">
                    <Award size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">Objetivo del Post</p>
                    <p className="font-semibold text-xs sm:text-sm text-white leading-tight break-words italic">{post.objective}</p>
                  </div>
                </div>
              </div>

              {/* Post Content & Copy Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-bold uppercase tracking-wider ${textSubClass}`}>
                    Idea y Copy de Contenido
                  </label>
                  {post.content && (
                    <button 
                      onClick={handleCopy}
                      className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        isPrestige 
                          ? 'border-brand-prestige-border hover:bg-gray-50 text-brand-prestige-dark' 
                          : 'border-brand-crimson-border hover:bg-brand-crimson-card text-gray-300'
                      }`}
                    >
                      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                      <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
                    </button>
                  )}
                </div>
                <div className={`p-4 rounded-xl min-h-[100px] text-xs sm:text-sm leading-relaxed text-left whitespace-pre-wrap ${
                  isPrestige ? 'bg-brand-prestige-light text-gray-800 border border-brand-prestige-border' : 'bg-[#151517] text-gray-200 border border-brand-crimson-border'
                }`}>
                  {post.content || <span className="italic text-gray-500">Este día está vacío en el calendario. Puedes proponer una sugerencia para este espacio.</span>}
                </div>
              </div>

              {/* Suggested Hashtags */}
              {post.content && (
                <div className="space-y-2">
                  <label className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider ${textSubClass}`}>
                    <Hash size={14} />
                    <span>Hashtags Sugeridos</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {getSuggestedHashtags(post.content).map((tag, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isPrestige 
                            ? 'bg-gray-100 text-gray-600 hover:bg-brand-prestige-crimson/10 hover:text-brand-prestige-dark' 
                            : 'bg-brand-crimson-bg text-gray-300 hover:bg-brand-crimson-red/10 hover:text-brand-crimson-red'
                        } transition-colors cursor-pointer`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Production Checklist */}
              {post.content && (
                <div className={`p-4 sm:p-5 rounded-xl border space-y-3 ${
                  isPrestige ? 'bg-white border-brand-prestige-border' : 'bg-brand-crimson-card border-brand-crimson-border'
                }`}>
                  <div className="flex items-center space-x-2 pb-2 border-b border-dashed border-gray-300 dark:border-gray-700">
                    <ListTodo size={16} className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'} />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-left">Checklist de Producción ({post.format})</h4>
                  </div>
                  
                  <div className="space-y-2.5">
                    {checklist.map((item) => (
                      <label 
                        key={item.id} 
                        className="flex items-start space-x-3 text-xs cursor-pointer select-none group text-left"
                      >
                        <input 
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(item.id)}
                          className={`mt-0.5 h-4 w-4 rounded transition-colors focus:ring-0 ${
                            isPrestige 
                              ? 'text-brand-prestige-crimson border-gray-300 focus:ring-offset-0' 
                              : 'text-brand-crimson-red border-brand-crimson-border bg-brand-crimson-bg focus:ring-offset-0'
                          }`}
                        />
                        <span className={`transition-colors leading-tight ${
                          item.checked 
                            ? 'line-through text-gray-400' 
                            : isPrestige ? 'text-gray-700 group-hover:text-black' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions (Dynamic based on states) */}
        <div className={`border-t p-4 sm:p-6 shrink-0 ${borderClass} ${isPrestige ? 'bg-white' : 'bg-brand-crimson-card'}`}>
          {isAdmin ? (
            /* Admin Actions */
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              {!isNewPost && (
                <button
                  onClick={handleAdminDelete}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border border-brand-crimson-red/30 bg-brand-crimson-red/10 text-brand-crimson-red hover:bg-brand-crimson-red/20 transition-all active:scale-95 flex items-center justify-center space-x-1.5"
                >
                  <Trash2 size={14} />
                  <span>Eliminar Posteo</span>
                </button>
              )}
              <button
                onClick={handleAdminSave}
                className={`flex-1 py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center space-x-1.5 ${primaryButtonClass}`}
              >
                <Save size={14} />
                <span>{isNewPost ? 'Crear Posteo' : 'Guardar Cambios'}</span>
              </button>
            </div>
          ) : isProposing ? (
            /* Proposal Forms Actions */
            <div className="flex space-x-3">
              <button
                onClick={() => setIsProposing(false)}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors border ${
                  isPrestige 
                    ? 'border-brand-prestige-border hover:bg-gray-50 text-brand-prestige-dark' 
                    : 'border-brand-crimson-border hover:bg-brand-crimson-bg text-gray-300'
                } flex items-center justify-center space-x-1.5`}
              >
                <ArrowLeft size={14} />
                <span>Volver</span>
              </button>
              <button
                onClick={handleUserPropose}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center space-x-1.5 ${primaryButtonClass}`}
              >
                <Send size={14} />
                <span>Enviar Propuesta</span>
              </button>
            </div>
          ) : (
            /* Normal View Actions */
            <div className="flex space-x-3">
              <button 
                onClick={onClose}
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors border ${
                  isPrestige 
                    ? 'border-brand-prestige-border hover:bg-gray-50 text-brand-prestige-dark' 
                    : 'border-brand-crimson-border hover:bg-brand-crimson-bg text-gray-300'
                }`}
              >
                Cerrar Detalles
              </button>
              {!activeProposal && (
                <button 
                  onClick={() => setIsProposing(true)}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-lg shadow-black/10 transition-all active:scale-95 ${primaryButtonClass}`}
                >
                  <Sparkles size={14} className="sm:w-[15px] sm:h-[15px]" />
                  <span>Proponer Cambio</span>
                </button>
              )}
              {activeProposal && post.content && (
                <button 
                  onClick={() => {
                    handleCopy();
                    alert('¡Texto copiado para producción!');
                  }}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-lg shadow-black/10 transition-all active:scale-95 bg-zinc-800 text-white hover:bg-zinc-700`}
                >
                  <Copy size={14} />
                  <span>Copiar Copy</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetailDrawer;
