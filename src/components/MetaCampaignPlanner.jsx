import React, { useState } from 'react';
import {
  Target,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Check,
  Megaphone,
  Layers,
  Film,
  Instagram,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  X,
  FileText,
  ShoppingBag,
  GraduationCap,
  Scissors,
  Smartphone,
  Globe,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const defaultCampaignsData = [
  {
    id: 'camp-b2b',
    type: 'B2B',
    name: 'Campaña 1: [B2B] Salones & Profesionales • Venta Mayorista & Cursos',
    status: 'Planificada',
    objective: 'OUTCOME_LEADS',
    objectiveName: 'Clientes Potenciales (WhatsApp Asesor & Registro Mayorista)',
    budgetType: 'CBO',
    dailyBudget: 3167,
    totalBudget: 95000,
    currency: 'ARS',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    adAccountId: 'act_23843398705180592',
    whatsappNumber: '+54 9 351 XXX-XXXX',
    kpis: {
      targetCpl: 1200,
      estimatedLeads: 79,
      estimatedReach: 35000,
    },
    adSets: [
      {
        id: 'adset-b2b-1',
        name: 'Conjunto 1.1: Venta Mayorista Salones (Toda la Argentina)',
        target: 'Dueños de Salones, Barberos & Estilistas',
        locations: 'Toda la Argentina (Cobertura nacional de distribución mayorista)',
        ageRange: '23 - 58 años',
        gender: 'Todos',
        interests: 'Peluquería, Salón de belleza, Estilista, L\'Oréal Professionnel, Matrix, Wahl',
        exclusions: 'Compradores web B2C (últimos 180 días) • Consumidor final',
        placements: 'Instagram Reels, Stories & Feed + Facebook Feed',
        budgetShare: '70%',
        dailyBudget: 2200,
        status: 'Listo para pauta'
      },
      {
        id: 'adset-b2b-2',
        name: 'Conjunto 1.2: Capacitaciones & Academia (Rosario y Provincias Aledañas)',
        target: 'Estilistas y Peluqueros en Perfeccionamiento Técnico',
        locations: 'Rosario y provincias aledañas (Santa Fe, Entre Ríos, Córdoba este, Buenos Aires norte)',
        ageRange: '21 - 50 años',
        gender: 'Todos',
        interests: 'Workshops de peluquería, Balayage, Alisados sin formol, Colorimetría avanzada',
        exclusions: 'Personas fuera del radio de influencia presencial • Compradores B2C',
        placements: 'Instagram Reels & Stories (9:16)',
        budgetShare: '30%',
        dailyBudget: 967,
        status: 'Listo para pauta'
      }
    ],
    ads: [
      {
        id: 'ad-b2b-1',
        adSetId: 'adset-b2b-1',
        name: 'Video 1: Máquinas Wahl Profesionales',
        link: 'https://www.instagram.com/p/DZ_GSPNNG3U/',
        linkStatus: 'ready',
        format: 'Reel / Video',
        status: 'Listo',
        angle: 'Herramienta Profesional & Precio Gremio',
        hookText: 'Si sos barbero o estilista, sabés que trabajar con una máquina que tira o recalienta te hace perder tiempo y clientes.',
        primaryText: 'Trabajá con la precisión y potencia que tu salón necesita 💈 En Dos Soles somos distribuidores de Wahl con garantía oficial de fábrica, cuchillas y repuestos originales.\n\nAccedé a precios gremio exclusivos para profesionales y equipá tu estación de trabajo con herramientas que duran años.\n\n📲 Escribinos por WhatsApp y recibí el catálogo con stock disponible para tu peluquería.',
        headline: 'Wahl Oficial con Garantía • Precio Gremio Salones 💈',
        cta: 'Enviar mensaje de WhatsApp',
        whatsappPrefill: '¡Hola Dos Soles! Vi el anuncio de las máquinas Wahl y quiero consultar precios gremio para mi salón.',
        visualConcept: 'Primeros planos de la máquina cortando, sonido del motor, modelos en mano (Magic Clip, Detailer, Legend).'
      },
      {
        id: 'ad-b2b-2',
        adSetId: 'adset-b2b-1',
        name: 'Video 2: Flujo de Compra Web Mayorista (Paso a Paso)',
        link: 'A definir',
        linkStatus: 'pending',
        format: 'Screen Recording / Reel',
        status: 'Por grabar',
        angle: 'Reposición Ágil & Autonomía para Salones',
        hookText: '¿Te estás quedando sin stock de tinturas o alisados y no tenés tiempo de esperar que te pasen una lista por WhatsApp?',
        primaryText: 'Reponé el stock de tu salón en 3 minutos desde el sillón de tu peluquería 📦\n\n1. Entrás a dossoles.net y activás tu cuenta profesional.\n2. Accedés a los precios mayoristas exclusivos para salones.\n3. Armás tu carrito con lo que necesitás (Truss, L\'Oréal, Liss Expert, oxidantes, descartables) y te llega directo a tu peluquería en 24-48 hs.\n\n👇 Activá hoy tu cuenta mayorista en la web.',
        headline: 'Comprá Mayorista Online • Despacho Rápido a tu Salón 📦',
        cta: 'Más información',
        whatsappPrefill: 'Hola Dos Soles! Quiero registrar mi peluquería en dossoles.net para comprar directo online.',
        visualConcept: 'Paso a paso dinámico en smartphone mostrando login profesional, visualización de precios y carrito finalizado.'
      },
      {
        id: 'ad-b2b-3',
        adSetId: 'adset-b2b-2',
        name: 'Video 3: Capacitaciones & Academia Dos Soles',
        link: 'https://www.instagram.com/p/Ddpa-IsunuR/',
        linkStatus: 'ready',
        format: 'Reel / Video',
        status: 'Listo',
        angle: 'Técnica de Alto Nivel & Diferenciación',
        hookText: 'La diferencia entre un peluquero que compite por precio y un salón que cobra lo que vale... es la técnica.',
        primaryText: 'Capacitate con los mejores profesionales en la Academia Dos Soles 🎓\n\nWorkshops técnicos intensivos, práctica en vivo y técnicas de última tendencia en color, balayage y alisados orgánicos para que aumentes el ticket promedio de cada servicio en tu salón.\n\nCupos limitados por fecha para garantizar atención personalizada.\n\n📲 Tocá para consultar el calendario y asegurar tu lugar.',
        headline: 'Workshops Técnicos para Estilistas • Cupos Limitados 🎓',
        cta: 'Enviar mensaje de WhatsApp',
        whatsappPrefill: 'Hola equipo Dos Soles! Quiero conocer las próximas fechas y temarios de capacitaciones para estilistas.',
        visualConcept: 'Tomas del salón auditorio, profesor en acción en bacha y estilistas practicando con certificación.'
      }
    ]
  },
  {
    id: 'camp-b2c',
    type: 'B2C',
    name: 'Campaña 2: [B2C] E-commerce Minorista • Ventas Web',
    status: 'Planificada',
    objective: 'OUTCOME_SALES',
    objectiveName: 'Ventas en Tienda Online (Evento Purchase en WooCommerce)',
    budgetType: 'CBO',
    dailyBudget: 2667,
    totalBudget: 80000,
    currency: 'ARS',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    adAccountId: 'act_23843398705180592',
    whatsappNumber: '+54 9 351 XXX-XXXX',
    kpis: {
      targetCpl: 0,
      estimatedLeads: 0,
      estimatedReach: 52000,
    },
    adSets: [
      {
        id: 'adset-b2c-1',
        name: 'Conjunto 2.1: Tráfico Frío & Rutina Capilar (Excluye Seguidores)',
        target: 'Consumidor Final (Mujeres 20 a 55 años)',
        locations: 'Toda la Argentina (Envíos a todo el país vía e-commerce)',
        ageRange: '20 - 55 años',
        gender: 'Mujeres (principalmente)',
        interests: 'Cuidado del cabello, Tratamientos capilares, Belleza, Productos de salón',
        exclusions: '🚨 EXCLUSIÓN CLAVE: Seguidores actuales de Instagram y Facebook de Dos Soles • Compradores web (últimos 30 días)',
        placements: 'Instagram Reels, Stories & Feed',
        budgetShare: '100%',
        dailyBudget: 2667,
        status: 'Listo para pauta'
      }
    ],
    ads: [
      {
        id: 'ad-b2c-1',
        adSetId: 'adset-b2c-1',
        name: 'Video 1: Tienda Online & Armador de Rutina',
        link: 'A definir',
        linkStatus: 'pending',
        format: 'Video Vertical 9:16',
        status: 'Por grabar',
        angle: 'Solución Guiada & Test Personalizado',
        hookText: '¿Gastás en productos caros y sentís que el pelo te sigue quedando pesado, opaco o con frizz?',
        primaryText: 'En Dos Soles creamos el Armador de Rutina Capilar ✨\n\nRespondé 3 preguntas rápidas sobre tu tipo de cabello (decolorado, seco, alisado o con frizz) y te armamos la combinación exacta de productos de salón que tu pelo realmente necesita.\n\nSin vueltas, con marcas profesionales y envío directo a tu casa en todo el país 🚚\n\n👇 Hacé el test gratis ahora en dossoles.net',
        headline: 'Armá tu Rutina Capilar a Medida • Tienda Online ✨',
        cta: 'Comprar',
        whatsappPrefill: '',
        visualConcept: 'Navegación en el celular completando el armador de rutina en dossoles.net y mostrando el carrito sugerido.'
      },
      {
        id: 'ad-b2c-2',
        adSetId: 'adset-b2c-1',
        name: 'Video 2: Formato UGC (Experiencia Real en Primera Persona)',
        link: 'A definir',
        linkStatus: 'pending',
        format: 'Reel Selfie 9:16',
        status: 'A vincular',
        angle: 'Prueba Social & Resultado Real en Casa',
        hookText: 'Mi peluquera me retó por comprar cualquier cosa en la farmacia y me dijo que pruebe esto...',
        primaryText: 'Miren cómo refleja la luz y el brillo que tiene mi pelo sin usar planchita todos los días 💆‍♀️✨\n\nEmpecé a usar productos profesionales recomendados por estilistas y el cambio es de otro planeta. Lo pedí directo por la web de Dos Soles y me llegó en 48 horas a casa.\n\n👇 Les dejo el enlace con cuotas y envío a domicilio.',
        headline: 'Calidad de Salón en tu Casa • Envío a Todo el País 🚚',
        cta: 'Comprar',
        whatsappPrefill: '',
        visualConcept: 'Video estilo TikTok/Reel orgánico, luz natural en habitación o baño, textura del pelo en primer plano y unboxing.'
      }
    ]
  }
];

export const defaultOctoberCampaign = defaultCampaignsData[0];

const MetaCampaignPlanner = ({ 
  campaigns = defaultCampaignsData, 
  onSaveCampaigns,
  campaign,
  onSaveCampaign
}) => {
  const initialCampaigns = Array.isArray(campaigns) && campaigns.length > 0 
    ? campaigns 
    : (campaign ? [campaign] : defaultCampaignsData);

  const [campaignList, setCampaignList] = useState(initialCampaigns);
  const [activeCampaignId, setActiveCampaignId] = useState(campaignList[0]?.id || 'camp-b2b');
  const [activeTab, setActiveTab] = useState('diagram'); // 'diagram' | 'ads' | 'adsets' | 'config'
  const [copiedId, setCopiedId] = useState(null);
  const [copiedExport, setCopiedExport] = useState(false);

  // Active campaign
  const currentCampaign = campaignList.find(c => c.id === activeCampaignId) || campaignList[0];

  // Modal states for creating/editing ads
  const [editingAd, setEditingAd] = useState(null);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // Modal states for creating/editing adsets
  const [editingAdSet, setEditingAdSet] = useState(null);
  const [isAdSetModalOpen, setIsAdSetModalOpen] = useState(false);

  // Quick helper to persist updates
  const updateAndSaveAll = (updatedList) => {
    setCampaignList(updatedList);
    if (onSaveCampaigns) {
      onSaveCampaigns(updatedList);
    } else if (onSaveCampaign && updatedList[0]) {
      onSaveCampaign(updatedList[0]);
    }
  };

  const updateCurrentCampaign = (newCampData) => {
    const updatedList = campaignList.map(c => c.id === newCampData.id ? newCampData : c);
    updateAndSaveAll(updatedList);
  };

  // Copy text to clipboard with feedback
  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export full strategy summary to clipboard
  const handleExportFullCampaign = () => {
    let output = `====================================================\n`;
    output += `🎯 ARQUITECTURA META ADS - DOS SOLES (OCTUBRE 2026)\n`;
    output += `====================================================\n`;
    output += `CUENTA PUBLICITARIA: act_23843398705180592 | PÍXEL: dossoles.net\n`;
    output += `PRESUPUESTO TOTAL SUGERIDO: $175.000 ARS / mes (~$5.833 ARS/día)\n`;
    output += `ESTRUCTURA: 1 Cuenta • 2 Campañas aisladas (B2B $95.000 / B2C $80.000)\n\n`;
    output += `CRITERIOS ESTRATÉGICOS:\n`;
    output += `1. Capacitaciones B2B: Exclusivo Rosario y provincias aledañas (asistencia presencial).\n`;
    output += `2. Ventas B2B & B2C: Toda la Argentina (cobertura nacional de envíos).\n`;
    output += `3. Regla de Oro B2C: Excluir seguidores actuales de IG y FB de Dos Soles (100% tráfico frío).\n\n`;

    campaignList.forEach((camp, idx) => {
      output += `----------------------------------------------------\n`;
      output += `CAMPAÑA ${idx + 1}: ${camp.name}\n`;
      output += `• Tipo: ${camp.type} | Estado: ${camp.status}\n`;
      output += `• Objetivo: ${camp.objectiveName} (${camp.objective})\n`;
      output += `• Presupuesto: $${camp.dailyBudget.toLocaleString('es-AR')} ${camp.currency}/día ($${camp.totalBudget.toLocaleString('es-AR')} mensual) [${camp.budgetType}]\n\n`;

      output += `CONJUNTOS DE ANUNCIOS (${camp.adSets.length}):\n`;
      camp.adSets.forEach((s, sIdx) => {
        output += `  [Set ${sIdx + 1}] ${s.name}\n`;
        output += `  - Target: ${s.target} (${s.ageRange} • ${s.gender})\n`;
        output += `  - Ubicaciones Meta: ${s.placements}\n`;
        output += `  - Intereses: ${s.interests}\n`;
        output += `  - Exclusiones: ${s.exclusions}\n`;
        output += `  - Presupuesto: $${s.dailyBudget.toLocaleString('es-AR')} /día\n\n`;
      });

      output += `CREATIVOS Y VIDEOS (${camp.ads.length}):\n`;
      camp.ads.forEach((ad, aIdx) => {
        output += `  [Video ${aIdx + 1}] ${ad.name}\n`;
        output += `  - Formato: ${ad.format} | Estado: ${ad.status}\n`;
        output += `  - Enlace: ${ad.link}\n`;
        output += `  - Hook: "${ad.hookText}"\n`;
        output += `  - Headline: ${ad.headline}\n`;
        output += `  - CTA: ${ad.cta}\n`;
        if (ad.whatsappPrefill) output += `  - WhatsApp Prefill: "${ad.whatsappPrefill}"\n`;
        output += `  - Copy Principal:\n${ad.primaryText}\n\n`;
      });
    });

    navigator.clipboard.writeText(output);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2500);
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Listo':
      case 'Activa en Meta':
      case 'Activo':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Planificada':
      case 'Aprobado':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Por grabar':
      case 'A vincular':
      case 'Guión':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Pausada':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
    }
  };

  // Save or update Ad
  const handleSaveAd = (adData) => {
    let updatedAds = [...currentCampaign.ads];
    const isNew = !adData.id || !updatedAds.some(a => a.id === adData.id);
    const linkStatus = (adData.link && adData.link.startsWith('http')) ? 'ready' : 'pending';
    
    if (isNew) {
      const newId = `ad-${Date.now()}`;
      updatedAds.push({ ...adData, id: newId, linkStatus });
    } else {
      updatedAds = updatedAds.map(a => a.id === adData.id ? { ...adData, linkStatus } : a);
    }

    updateCurrentCampaign({ ...currentCampaign, ads: updatedAds });
    setIsAdModalOpen(false);
    setEditingAd(null);
  };

  // Delete Ad
  const handleDeleteAd = (adId) => {
    if (confirm('¿Eliminar este anuncio de la planificación?')) {
      const updatedAds = currentCampaign.ads.filter(a => a.id !== adId);
      updateCurrentCampaign({ ...currentCampaign, ads: updatedAds });
    }
  };

  // Save or update AdSet
  const handleSaveAdSet = (adSetData) => {
    let updatedAdSets = [...currentCampaign.adSets];
    const isNew = !adSetData.id || !updatedAdSets.some(s => s.id === adSetData.id);
    
    if (isNew) {
      const newId = `adset-${Date.now()}`;
      updatedAdSets.push({ ...adSetData, id: newId });
    } else {
      updatedAdSets = updatedAdSets.map(s => s.id === adSetData.id ? adSetData : s);
    }

    updateCurrentCampaign({ ...currentCampaign, adSets: updatedAdSets });
    setIsAdSetModalOpen(false);
    setEditingAdSet(null);
  };

  // Delete AdSet
  const handleDeleteAdSet = (adSetId) => {
    if (confirm('¿Eliminar este conjunto de anuncios?')) {
      const updatedAdSets = currentCampaign.adSets.filter(s => s.id !== adSetId);
      updateCurrentCampaign({ ...currentCampaign, adSets: updatedAdSets });
    }
  };

  return (
    <div className="space-y-6">

      {/* 1. Header & Campaign Switcher */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-crimson-border bg-gradient-to-br from-[#18181c] via-[#121215] to-[#0d0d10] p-5 sm:p-6 shadow-2xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-crimson-red/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-crimson-red/20 text-brand-crimson-red border border-brand-crimson-red/30">
                <Target size={13} />
                <span>Estructura Meta Ads • Octubre 2026</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                1 Cuenta (act_23843398705180592) • 2 Campañas
              </span>
            </div>

            {/* Campaign Selector Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {campaignList.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => {
                    setActiveCampaignId(camp.id);
                  }}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    activeCampaignId === camp.id
                      ? 'bg-brand-crimson-red text-white border-brand-crimson-red shadow-lg shadow-brand-crimson-red/25'
                      : 'bg-black/40 text-gray-400 border-zinc-800 hover:text-white hover:bg-zinc-800/80'
                  }`}
                >
                  {camp.type === 'B2B' ? <Scissors size={14} className="text-amber-400" /> : <ShoppingBag size={14} className="text-blue-400" />}
                  <span>{camp.type === 'B2B' ? 'Campaña B2B (Salones & Cursos)' : 'Campaña B2C (Tienda Minorista)'}</span>
                  <span className="px-1.5 py-0.2 text-[10px] rounded bg-black/30 font-mono">
                    {camp.ads.length} {camp.ads.length === 1 ? 'ad' : 'ads'}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pt-1">
              {currentCampaign.name} • Objetivo: <strong className="text-gray-200">{currentCampaign.objectiveName}</strong>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportFullCampaign}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-all border border-zinc-700 shadow-sm"
              title="Copiar resumen estructurado de ambas campañas para Ads Manager"
            >
              {copiedExport ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedExport ? '¡Estructura Copiada!' : 'Exportar Ficha Completa'}</span>
            </button>

            <button
              onClick={() => {
                setEditingAd({
                  name: `Video ${currentCampaign.ads.length + 1}: `,
                  adSetId: currentCampaign.adSets[0]?.id || '',
                  link: 'A definir',
                  format: 'Reel 9:16',
                  status: 'A grabar',
                  angle: '',
                  hookText: '',
                  primaryText: '',
                  headline: '',
                  cta: currentCampaign.type === 'B2B' ? 'Enviar mensaje de WhatsApp' : 'Comprar',
                  whatsappPrefill: '',
                  visualConcept: ''
                });
                setIsAdModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all shadow-lg shadow-brand-crimson-red/25"
            >
              <Plus size={14} />
              <span>+ Nuevo Video</span>
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <DollarSign size={13} className="text-emerald-400" />
              <span>Presupuesto {currentCampaign.type}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-white font-mono">
              ${currentCampaign.dailyBudget.toLocaleString('es-AR')} <span className="text-xs text-gray-400 font-normal">/día</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              ${currentCampaign.totalBudget.toLocaleString('es-AR')} mensual ({currentCampaign.budgetType})
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              {currentCampaign.type === 'B2B' ? <MessageCircle size={13} className="text-blue-400" /> : <ShoppingBag size={13} className="text-blue-400" />}
              <span>{currentCampaign.type === 'B2B' ? 'Leads WhatsApp Est.' : 'Evento de Conversión'}</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-400">
              {currentCampaign.type === 'B2B' ? `~${currentCampaign.kpis?.estimatedLeads} leads` : 'Purchase (Comprar)'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {currentCampaign.type === 'B2B' ? `CPL proyectado: $${currentCampaign.kpis?.targetCpl}` : 'Vía Checkout WooCommerce'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <Users size={13} className="text-purple-400" />
              <span>Conjuntos de Anuncios</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-white">
              {currentCampaign.adSets.length} {currentCampaign.adSets.length === 1 ? 'conjunto' : 'conjuntos'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              audiencias segmentadas
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <Film size={13} className="text-amber-400" />
              <span>Videos & Creativos</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-amber-400">
              {currentCampaign.ads.length} videos
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {currentCampaign.ads.filter(a => a.link && a.link.startsWith('http')).length} listos • {currentCampaign.ads.filter(a => !a.link || !a.link.startsWith('http')).length} a definir
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subnavigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'diagram'
                ? 'bg-brand-crimson-red text-white shadow-md shadow-brand-crimson-red/20'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Layers size={14} />
            <span>🗺️ Diagrama de Estructura</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'ads'
                ? 'bg-brand-crimson-red text-white shadow-md shadow-brand-crimson-red/20'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Film size={14} />
            <span>Matriz de Videos & Copies ({currentCampaign.ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('adsets')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'adsets'
                ? 'bg-brand-crimson-red text-white shadow-md shadow-brand-crimson-red/20'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Users size={14} />
            <span>Públicos & Conjuntos ({currentCampaign.adSets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'config'
                ? 'bg-brand-crimson-red text-white shadow-md shadow-brand-crimson-red/20'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Target size={14} />
            <span>Configuración de Campaña</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content: VISUAL ARCHITECTURE DIAGRAM */}
      {activeTab === 'diagram' && (
        <div className="space-y-6">

          {/* 💡 Plan de Inversión y Estrategia de Segmentación */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-zinc-900 to-black p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <DollarSign size={20} />
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Sugerencia de Inversión Mensual:</span>
                    <span className="text-emerald-400 font-mono font-extrabold text-base sm:text-lg">$175.000 ARS</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    1 Cuenta Publicitaria con 2 Campañas aisladas para blindar el presupuesto mayorista del algoritmo masivo.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-gray-200 border border-zinc-700 font-mono">
                  ~$5.833 ARS / día total
                </span>
              </div>
            </div>

            {/* 3 Pillars: Inversión, Geografía, Exclusiones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Pilar 1: Presupuesto */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800/90 space-y-2">
                <span className="text-[11px] font-bold uppercase text-amber-400 flex items-center space-x-1.5">
                  <DollarSign size={13} />
                  <span>Distribución del Presupuesto</span>
                </span>
                <div className="space-y-1.5 text-gray-300">
                  <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
                    <span className="font-semibold text-white">B2B Salones:</span>
                    <span className="font-mono font-bold text-emerald-400">$95.000 ARS <span className="text-[10px] text-gray-400 font-normal">(~$3.167/día)</span></span>
                  </div>
                  <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
                    <span className="font-semibold text-white">B2C Tienda Online:</span>
                    <span className="font-mono font-bold text-blue-400">$80.000 ARS <span className="text-[10px] text-gray-400 font-normal">(~$2.667/día)</span></span>
                  </div>
                  <p className="text-[11px] text-gray-400 pt-0.5 leading-snug">
                    Evita que el gran volumen de clics de consumidores absorba los fondos destinados a salones y peluqueros.
                  </p>
                </div>
              </div>

              {/* Pilar 2: Geografía */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800/90 space-y-2">
                <span className="text-[11px] font-bold uppercase text-purple-400 flex items-center space-x-1.5">
                  <Globe size={13} />
                  <span>Segmentación Geográfica</span>
                </span>
                <div className="space-y-1.5 text-gray-300">
                  <div className="pb-1 border-b border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Capacitaciones B2B:</span>
                    <span className="font-semibold text-purple-300">Rosario y provincias aledañas</span>
                    <span className="text-[10px] text-gray-400 block">Santa Fe, Entre Ríos, Córdoba este, Buenos Aires norte (asistencia presencial).</span>
                  </div>
                  <div className="pt-0.5">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Ventas B2B & B2C:</span>
                    <span className="font-semibold text-emerald-300">Toda la Argentina</span>
                    <span className="text-[10px] text-gray-400 block">Cobertura nacional con logística de despachos y encomiendas.</span>
                  </div>
                </div>
              </div>

              {/* Pilar 3: Exclusiones Clave */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-red-900/40 space-y-2">
                <span className="text-[11px] font-bold uppercase text-red-400 flex items-center space-x-1.5">
                  <AlertCircle size={13} />
                  <span>Exclusiones Clave (Cero Desperdicio)</span>
                </span>
                <div className="space-y-1.5 text-gray-300">
                  <div className="p-2 rounded-lg bg-red-950/30 border border-red-800/40">
                    <span className="font-bold text-red-300 block text-[11px]">🚨 Excluir Seguidores en B2C:</span>
                    <p className="text-[10px] text-gray-300 leading-snug mt-0.5">
                      Excluir seguidores actuales de IG y FB de Dos Soles. El 100% de la pauta atrae clientes nuevos (tráfico frío) y la audiencia actual se nutre orgánicamente gratis.
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-snug">
                    • Excluir compradores últimos 30-60 días.<br />
                    • Excluir compradores B2C en conjuntos B2B.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-brand-crimson-border/80 bg-[#101013] p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center space-x-2">
                  <span>🗺️ Arquitectura Publicitaria en Meta Ads</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  1 Cuenta Publicitaria con Píxel centralizado en dossoles.net, dividida en 2 campañas aisladas para proteger el presupuesto profesional.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center space-x-1">
                  <CheckCircle2 size={12} />
                  <span>2 Videos Listos</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold flex items-center space-x-1">
                  <Clock size={12} />
                  <span>3 Videos A Definir</span>
                </span>
              </div>
            </div>

            {/* Visual Node Diagram */}
            <div className="space-y-8">
              
              {/* Root Account Node */}
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-center max-w-lg w-full shadow-lg">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Estructura Base</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">🏢 Cuenta Publicitaria Única (act_23843398705180592)</h4>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-xs font-bold text-emerald-400 font-mono">Inversión Total: $175.000 ARS/mes</span>
                    <span className="text-[11px] text-gray-400">• Píxel en dossoles.net</span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center -my-4">
                <div className="w-0.5 h-6 bg-zinc-700" />
              </div>

              {/* Two Campaign Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* B2B Branch */}
                <div className="p-5 rounded-2xl border-2 border-brand-crimson-red/50 bg-[#161318] space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-crimson-red/20 text-brand-crimson-red border border-brand-crimson-red/30">
                          B2B Salones
                        </span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">$3.167 ARS/día ($95.000/mes)</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Campaña 1: Salones & Profesionales
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Objetivo: <strong className="text-gray-300">Clientes Potenciales (OUTCOME_LEADS)</strong> • WhatsApp Asesor
                      </p>
                    </div>
                    <button
                      onClick={() => { setActiveCampaignId('camp-b2b'); setActiveTab('ads'); }}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors shrink-0"
                    >
                      Ver Ads →
                    </button>
                  </div>

                  {/* AdSets in B2B */}
                  <div className="space-y-3">
                    {/* AdSet 1.1 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-400">
                          Conjunto 1.1: Venta Mayorista Salones (Toda la Argentina)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">$2.200/día (70%)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-gray-300">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">📍 Toda la Argentina</span>
                        <span className="text-gray-400 truncate">Salones, barberías, L'Oréal, Matrix, Wahl</span>
                      </div>

                      {/* Video Cards inside AdSet 1.1 */}
                      <div className="space-y-1.5 pt-1">
                        {/* Wahl */}
                        <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="font-semibold text-white truncate">Video 1: Máquinas Wahl Profesionales</span>
                          </div>
                          <a
                            href="https://www.instagram.com/p/DZ_GSPNNG3U/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold transition-colors shrink-0"
                          >
                            <Instagram size={11} />
                            <span>Ver Reel ↗</span>
                          </a>
                        </div>

                        {/* Flujo Web */}
                        <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-semibold text-white truncate">Video 2: Flujo de Compra Web Mayorista</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold shrink-0">
                            A definir (Por grabar)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AdSet 1.2 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-purple-400">
                          Conjunto 1.2: Capacitaciones & Academia (Rosario y Aledaños)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">$967/día (30%)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-gray-300">
                        <span className="px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 border border-purple-800/40 font-medium">📍 Rosario y aledaños</span>
                        <span className="text-gray-400 truncate">Santa Fe, Entre Ríos, Cba este, Bs As norte</span>
                      </div>

                      {/* Video Cards inside AdSet 1.2 */}
                      <div className="space-y-1.5 pt-1">
                        <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="font-semibold text-white truncate">Video 3: Capacitaciones Dos Soles</span>
                          </div>
                          <a
                            href="https://www.instagram.com/p/Ddpa-IsunuR/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold transition-colors shrink-0"
                          >
                            <Instagram size={11} />
                            <span>Ver Reel ↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 flex items-center justify-between text-xs text-emerald-300">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <MessageCircle size={14} className="text-emerald-400" />
                      <span>Destino: WhatsApp Business Asesor B2B & Registro Portal</span>
                    </span>
                  </div>
                </div>

                {/* B2C Branch */}
                <div className="p-5 rounded-2xl border-2 border-blue-500/40 bg-[#11131c] space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          B2C E-commerce
                        </span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">$2.667 ARS/día ($80.000/mes)</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Campaña 2: Tienda Online Minorista
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Objetivo: <strong className="text-gray-300">Ventas (OUTCOME_SALES)</strong> • Evento Purchase en WooCommerce
                      </p>
                    </div>
                    <button
                      onClick={() => { setActiveCampaignId('camp-b2c'); setActiveTab('ads'); }}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors shrink-0"
                    >
                      Ver Ads →
                    </button>
                  </div>

                  {/* AdSets in B2C */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-400">
                          Conjunto 2.1: Tráfico Frío & Rutina Capilar (Excluye Seguidores)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">$2.667/día (100%)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">📍 Toda la Argentina</span>
                        <span className="text-gray-400">Envíos a todo el país</span>
                      </div>

                      {/* Prominent Follower Exclusion Warning */}
                      <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/50 text-[10px] text-red-200 space-y-0.5">
                        <span className="font-bold flex items-center space-x-1 text-red-300">
                          <AlertCircle size={11} />
                          <span>EXCLUSIÓN OBLIGATORIA: Seguidores de Dos Soles</span>
                        </span>
                        <p className="text-zinc-300 leading-snug">
                          Excluir a quienes ya siguen las cuentas de Instagram y Facebook de Dos Soles. Garantiza captar público 100% nuevo (tráfico frío).
                        </p>
                      </div>

                      {/* Video Cards inside AdSet 2.1 */}
                      <div className="space-y-1.5 pt-1">
                        {/* Web Rutina */}
                        <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-semibold text-white truncate">Video 1: Web & Armador de Rutina</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold shrink-0">
                            A definir (Por grabar)
                          </span>
                        </div>

                        {/* UGC */}
                        <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                            <span className="font-semibold text-white truncate">Video 2: Formato UGC (Testimonio / Experiencia)</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold shrink-0">
                            A definir (A vincular)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/30 flex items-center justify-between text-xs text-blue-300">
                    <span className="flex items-center space-x-1.5 font-medium">
                      <Globe size={14} className="text-blue-400" />
                      <span>Destino: Tienda Online dossoles.net (Checkout WooCommerce)</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab Content: Ads Matrix for Selected Campaign */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentCampaign.ads.map((ad) => {
              const matchedAdSet = currentCampaign.adSets.find(s => s.id === ad.adSetId);
              const isLinkReady = ad.link && ad.link.startsWith('http');
              return (
                <div
                  key={ad.id}
                  className="rounded-2xl border border-brand-crimson-border/80 bg-brand-crimson-card/90 p-5 flex flex-col justify-between space-y-4 hover:border-brand-crimson-red/50 transition-all duration-300 shadow-lg group relative"
                >
                  {/* Top Bar of Card */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-400 border border-pink-500/20 uppercase tracking-wider">
                          <Instagram size={11} />
                          <span>{ad.format}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(ad.status)}`}>
                          {ad.status}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => {
                            setEditingAd(ad);
                            setIsAdModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          title="Editar Anuncio"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteAd(ad.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Eliminar Anuncio"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-brand-crimson-red transition-colors">
                      {ad.name || 'Sin título'}
                    </h3>

                    {/* Link Status Pill */}
                    <div className="pt-1">
                      {isLinkReady ? (
                        <a
                          href={ad.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-all truncate max-w-full"
                        >
                          <Instagram size={12} className="shrink-0" />
                          <span className="truncate">Ver Video en Instagram ↗</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                          <Clock size={12} className="shrink-0" />
                          <span>Enlace: A definir</span>
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center space-x-1 pt-1">
                      <span>Público:</span>
                      <span className="font-semibold text-gray-300">{matchedAdSet ? matchedAdSet.target : 'General'}</span>
                      {ad.angle && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400 font-medium">{ad.angle}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hook callout box */}
                  {ad.hookText && (
                    <div className="p-3 rounded-xl bg-brand-crimson-bg/90 border border-brand-crimson-border/60 space-y-1">
                      <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        <Sparkles size={11} />
                        <span>Gancho / Hook:</span>
                      </div>
                      <p className="text-xs text-white font-medium italic">
                        "{ad.hookText}"
                      </p>
                    </div>
                  )}

                  {/* Primary text / Copy snippet */}
                  {ad.primaryText && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                        <span>Texto Principal (Primary Copy):</span>
                        <button
                          onClick={() => handleCopy(ad.primaryText, `copy-${ad.id}`)}
                          className="flex items-center space-x-1 text-brand-crimson-red hover:text-white text-[10px] font-bold transition-colors"
                        >
                          {copiedId === `copy-${ad.id}` ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                          <span>{copiedId === `copy-${ad.id}` ? 'Copiado' : 'Copiar Copy'}</span>
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 text-xs text-gray-300 whitespace-pre-wrap font-sans max-h-36 overflow-y-auto scrollbar-thin">
                        {ad.primaryText}
                      </div>
                    </div>
                  )}

                  {/* Bottom Meta details: Headline + CTA + WhatsApp prefill */}
                  <div className="pt-3 border-t border-zinc-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] text-gray-500 uppercase font-bold block">Título (Headline):</span>
                        <span className="font-semibold text-white truncate block">{ad.headline || '-'}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-[10px] font-bold text-gray-300 border border-zinc-700 shrink-0">
                        CTA: {ad.cta}
                      </span>
                    </div>

                    {ad.whatsappPrefill && (
                      <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-emerald-300 flex items-start space-x-1.5">
                        <MessageCircle size={13} className="shrink-0 mt-0.5 text-emerald-400" />
                        <span className="line-clamp-2">Prefill WhatsApp: <em>"{ad.whatsappPrefill}"</em></span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setEditingAd({
                name: `Video ${currentCampaign.ads.length + 1}: `,
                adSetId: currentCampaign.adSets[0]?.id || '',
                link: 'A definir',
                format: 'Reel 9:16',
                status: 'A grabar',
                angle: '',
                hookText: '',
                primaryText: '',
                headline: '',
                cta: currentCampaign.type === 'B2B' ? 'Enviar mensaje de WhatsApp' : 'Comprar',
                whatsappPrefill: '',
                visualConcept: ''
              });
              setIsAdModalOpen(true);
            }}
            className="w-full py-4 border-2 border-dashed border-zinc-800 hover:border-brand-crimson-red/50 rounded-2xl flex items-center justify-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition-all bg-black/20 hover:bg-black/40"
          >
            <Plus size={16} className="text-brand-crimson-red" />
            <span>+ Agregar otro Video a {currentCampaign.type}</span>
          </button>
        </div>
      )}

      {/* 6. Tab Content: AdSets / Audiences */}
      {activeTab === 'adsets' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Conjuntos de Anuncios ({currentCampaign.type})
            </h3>
            <button
              onClick={() => {
                setEditingAdSet({
                  name: `Conjunto ${currentCampaign.adSets.length + 1}: `,
                  target: '',
                  locations: 'Córdoba, Santa Fe, Buenos Aires',
                  ageRange: '23 - 55 años',
                  gender: 'Todos',
                  interests: '',
                  exclusions: currentCampaign.type === 'B2B' ? 'Compradores B2C' : 'Compradores web 30d',
                  placements: 'Instagram Reels & Stories',
                  budgetShare: '',
                  dailyBudget: 1000,
                  status: 'Listo para pauta'
                });
                setIsAdSetModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all"
            >
              <Plus size={13} />
              <span>+ Nuevo Conjunto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentCampaign.adSets.map((adSet) => {
              const countAds = currentCampaign.ads.filter(a => a.adSetId === adSet.id).length;
              return (
                <div
                  key={adSet.id}
                  className="rounded-2xl border border-brand-crimson-border bg-brand-crimson-card p-5 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {adSet.target || 'Audiencia'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => {
                            setEditingAdSet(adSet);
                            setIsAdSetModalOpen(true);
                          }}
                          className="p-1 rounded text-gray-400 hover:text-white"
                          title="Editar Conjunto"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteAdSet(adSet.id)}
                          className="p-1 rounded text-gray-500 hover:text-red-400"
                          title="Eliminar Conjunto"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {adSet.name || 'Sin nombre'}
                    </h4>

                    <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 space-y-2 text-xs text-gray-300">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Ubicaciones Geográficas:</span>
                        <p className="font-medium text-white">{adSet.locations}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Demografía:</span>
                        <p>{adSet.ageRange} • {adSet.gender}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Intereses Clave:</span>
                        <p className="text-amber-300/90 leading-snug">{adSet.interests}</p>
                      </div>
                      {adSet.exclusions && (
                        <div>
                          <span className="text-[10px] font-bold text-red-400 uppercase block">Exclusiones Obligatorias:</span>
                          <p className="text-red-300/90 leading-snug">{adSet.exclusions}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block">Presupuesto Sugerido:</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        ${adSet.dailyBudget.toLocaleString('es-AR')} /día ({adSet.budgetShare})
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded bg-zinc-800 text-[11px] font-bold text-gray-300">
                      {countAds} {countAds === 1 ? 'video asignado' : 'videos asignados'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Tab Content: Campaign Configuration */}
      {activeTab === 'config' && (
        <div className="rounded-2xl border border-brand-crimson-border bg-brand-crimson-card p-6 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Target size={18} className="text-brand-crimson-red" />
              <span>Ajustes de {currentCampaign.type}: {currentCampaign.name}</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Calibrá el presupuesto diario, fechas de vigencia y parámetros de optimización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Nombre de la Campaña:</label>
                <input
                  type="text"
                  value={currentCampaign.name}
                  onChange={(e) => updateCurrentCampaign({ ...currentCampaign, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Estado en Ads Manager:</label>
                  <select
                    value={currentCampaign.status}
                    onChange={(e) => updateCurrentCampaign({ ...currentCampaign, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="Borrador">Borrador</option>
                    <option value="Planificada">Planificada</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="Activa en Meta">Activa en Meta</option>
                    <option value="Pausada">Pausada</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Presupuesto Diario (ARS):</label>
                  <input
                    type="number"
                    value={currentCampaign.dailyBudget || ''}
                    onChange={(e) => {
                      const daily = parseInt(e.target.value, 10) || 0;
                      const total = daily * 30;
                      updateCurrentCampaign({
                        ...currentCampaign,
                        dailyBudget: daily,
                        totalBudget: total
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Objetivo en Meta Ads:</label>
                <input
                  type="text"
                  value={currentCampaign.objectiveName}
                  onChange={(e) => updateCurrentCampaign({ ...currentCampaign, objectiveName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Cuenta Publicitaria Asignada:</label>
                <input
                  type="text"
                  value={currentCampaign.adAccountId}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-gray-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Video / Ad */}
      {isAdModalOpen && editingAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#141417] border border-brand-crimson-border rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Film size={16} className="text-brand-crimson-red" />
                <span>{editingAd.id ? 'Editar Video / Anuncio' : 'Nuevo Video / Anuncio'}</span>
              </h3>
              <button
                onClick={() => setIsAdModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Título del Video / Anuncio:</label>
                  <input
                    type="text"
                    value={editingAd.name}
                    onChange={(e) => setEditingAd({ ...editingAd, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="Ej. Video 1: Máquinas Wahl..."
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Conjunto de Anuncios:</label>
                  <select
                    value={editingAd.adSetId}
                    onChange={(e) => setEditingAd({ ...editingAd, adSetId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    {currentCampaign.adSets.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Link Input Field */}
              <div>
                <label className="text-emerald-400 font-bold block mb-1 flex items-center space-x-1">
                  <LinkIcon size={12} />
                  <span>Enlace del Video / Post (Instagram o "A definir"):</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingAd.link || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono text-xs"
                    placeholder="https://www.instagram.com/p/... o 'A definir'"
                  />
                  <button
                    type="button"
                    onClick={() => setEditingAd({ ...editingAd, link: 'A definir' })}
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-[11px] font-bold shrink-0 transition-colors"
                  >
                    Marcar A definir
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Formato:</label>
                  <select
                    value={editingAd.format}
                    onChange={(e) => setEditingAd({ ...editingAd, format: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="Reel / Video">Reel / Video</option>
                    <option value="Screen Recording / Reel">Screen Recording / Reel</option>
                    <option value="Reel Selfie 9:16">Reel Selfie 9:16</option>
                    <option value="Video Vertical 9:16">Video Vertical 9:16</option>
                    <option value="Carrusel 1:1">Carrusel 1:1</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Estado del Video:</label>
                  <select
                    value={editingAd.status}
                    onChange={(e) => setEditingAd({ ...editingAd, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="Listo">Listo</option>
                    <option value="Por grabar">Por grabar</option>
                    <option value="A vincular">A vincular</option>
                    <option value="En Edición">En Edición</option>
                    <option value="Activo en Meta">Activo en Meta</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Llamado a la Acción (CTA):</label>
                  <select
                    value={editingAd.cta}
                    onChange={(e) => setEditingAd({ ...editingAd, cta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="Enviar mensaje de WhatsApp">Enviar mensaje de WhatsApp</option>
                    <option value="Más información">Más información</option>
                    <option value="Comprar">Comprar</option>
                    <option value="Contactar">Contactar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-amber-400 font-bold block mb-1">Gancho Inicial / Hook (Primeros 3 seg):</label>
                <input
                  type="text"
                  value={editingAd.hookText}
                  onChange={(e) => setEditingAd({ ...editingAd, hookText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none italic"
                  placeholder="La frase o pregunta con la que arranca el video..."
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Texto Principal del Anuncio (Primary Copy):</label>
                <textarea
                  rows={4}
                  value={editingAd.primaryText}
                  onChange={(e) => setEditingAd({ ...editingAd, primaryText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-sans"
                  placeholder="Texto persuasivo completo que acompaña al video..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Headline (Título corto en Meta):</label>
                  <input
                    type="text"
                    value={editingAd.headline}
                    onChange={(e) => setEditingAd({ ...editingAd, headline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-emerald-400 font-bold block mb-1">Mensaje Predeterminado WhatsApp:</label>
                  <input
                    type="text"
                    value={editingAd.whatsappPrefill || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, whatsappPrefill: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="El texto que aparecerá al abrir el chat..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setIsAdModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveAd(editingAd)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-colors"
              >
                Guardar Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit AdSet */}
      {isAdSetModalOpen && editingAdSet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#141417] border border-brand-crimson-border rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Users size={16} className="text-brand-crimson-red" />
                <span>{editingAdSet.id ? 'Editar Conjunto de Anuncios' : 'Nuevo Conjunto de Anuncios'}</span>
              </h3>
              <button
                onClick={() => setIsAdSetModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Nombre del Conjunto:</label>
                <input
                  type="text"
                  value={editingAdSet.name}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Público / Target:</label>
                <input
                  type="text"
                  value={editingAdSet.target}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, target: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Intereses Clave:</label>
                <textarea
                  rows={2}
                  value={editingAdSet.interests}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, interests: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-red-400 font-bold block mb-1">Exclusiones:</label>
                <input
                  type="text"
                  value={editingAdSet.exclusions}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, exclusions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Presupuesto Diario Sugerido (ARS):</label>
                  <input
                    type="number"
                    value={editingAdSet.dailyBudget}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, dailyBudget: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Porcentaje Estimado (%):</label>
                  <input
                    type="text"
                    value={editingAdSet.budgetShare}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, budgetShare: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setIsAdSetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveAdSet(editingAdSet)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-colors"
              >
                Guardar Conjunto
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MetaCampaignPlanner;
