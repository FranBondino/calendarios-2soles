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
  ExternalLink 
} from 'lucide-react';

const PostDetailDrawer = ({ post, isOpen, onClose, theme }) => {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState([]);

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

  // Generate checklist on post load
  useEffect(() => {
    if (post) {
      setChecklist(getFormatChecklist(post.format));
    }
    setCopied(false);
  }, [post]);

  const handleCopy = () => {
    if (post) {
      navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto shadow-2xl transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isPrestige ? 'bg-white text-gray-800' : 'bg-brand-crimson-card text-gray-200'}`}
      >
        <div className={`flex items-center justify-between border-b p-6 ${borderClass}`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase ${isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}`}>
              Detalle del Posteo
            </span>
            <h3 className={`text-xl ${textTitleClass} mt-0.5`}>
              Publicación #{post.id}
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

        <div className="p-6 space-y-6">
          {/* Metadata Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl flex items-center space-x-3 ${contentBgClass}`}>
              <div className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}>
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Fecha Planificada</p>
                <p className="font-semibold text-sm">{post.date}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-center space-x-3 ${contentBgClass}`}>
              <div className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}>
                <Target size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Público Objetivo</p>
                <p className="font-semibold text-sm">{post.target}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-center space-x-3 ${contentBgClass}`}>
              <div className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}>
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Formato</p>
                <span className={`inline-block px-2 py-0.5 mt-0.5 rounded text-xs font-semibold uppercase ${
                  isPrestige 
                    ? 'bg-brand-prestige-crimson/20 text-brand-prestige-dark border border-brand-prestige-crimson/30' 
                    : 'bg-brand-crimson-red/20 text-brand-crimson-red border border-brand-crimson-red/30'
                }`}>
                  {post.format}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-center space-x-3 ${contentBgClass}`}>
              <div className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'}>
                <Award size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Objetivo del Post</p>
                <p className="font-semibold text-sm italic">{post.objective}</p>
              </div>
            </div>
          </div>

          {/* Post Content & Copy Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold uppercase tracking-wider ${textSubClass}`}>
                Idea y Copy de Contenido
              </label>
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
            </div>
            <div className={`p-4 rounded-xl min-h-[100px] text-sm leading-relaxed whitespace-pre-line ${
              isPrestige ? 'bg-brand-prestige-light text-gray-800 border border-brand-prestige-border' : 'bg-[#151517] text-gray-200 border border-brand-crimson-border'
            }`}>
              {post.content}
            </div>
          </div>

          {/* Suggested Hashtags */}
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

          {/* Production Checklist */}
          <div className={`p-5 rounded-xl border space-y-3 ${
            isPrestige ? 'bg-white border-brand-prestige-border' : 'bg-brand-crimson-card border-brand-crimson-border'
          }`}>
            <div className="flex items-center space-x-2 pb-2 border-b border-dashed border-gray-300 dark:border-gray-700">
              <ListTodo size={16} className={isPrestige ? 'text-brand-prestige-crimson' : 'text-brand-crimson-red'} />
              <h4 className="text-xs font-bold uppercase tracking-wider">Checklist de Producción ({post.format})</h4>
            </div>
            
            <div className="space-y-2.5">
              {checklist.map((item) => (
                <label 
                  key={item.id} 
                  className="flex items-start space-x-3 text-xs cursor-pointer select-none group"
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
        </div>

        {/* Footer Actions */}
        <div className={`sticky bottom-0 border-t p-6 ${borderClass} ${isPrestige ? 'bg-white' : 'bg-brand-crimson-card'}`}>
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors border ${
                isPrestige 
                  ? 'border-brand-prestige-border hover:bg-gray-50 text-brand-prestige-dark' 
                  : 'border-brand-crimson-border hover:bg-brand-crimson-bg text-gray-300'
              }`}
            >
              Cerrar Detalles
            </button>
            <button 
              onClick={() => {
                handleCopy();
                alert('¡Contenido y checklist listos para producción!');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-black/10 transition-all active:scale-95 ${primaryButtonClass}`}
            >
              <span>Enviar a Redactar</span>
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailDrawer;
