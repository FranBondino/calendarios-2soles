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
  FileText
} from 'lucide-react';

export const defaultOctoberCampaign = {
  id: 'camp-oct-2026',
  name: 'Campaña Meta Ads: Octubre 2026',
  status: 'Borrador', // 'Borrador', 'Planificada', 'En Revisión', 'Activa en Meta', 'Pausada'
  month: '10',
  objective: 'OUTCOME_LEADS',
  objectiveName: 'Generación de Leads (WhatsApp Business)',
  budgetType: 'CBO', // CBO (Advantage+ Budget) o ABO
  dailyBudget: 0,
  totalBudget: 0,
  currency: 'ARS',
  startDate: '2026-10-01',
  endDate: '2026-10-31',
  adAccountId: '',
  whatsappNumber: '',
  kpis: {
    targetCpl: 0,
    estimatedLeads: 0,
    estimatedReach: 0,
  },
  adSets: [],
  ads: [],
  featuredKits: []
};

const MetaCampaignPlanner = ({ campaign = defaultOctoberCampaign, onSaveCampaign }) => {
  const [currentCampaign, setCurrentCampaign] = useState(campaign);
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' | 'adsets' | 'config'
  const [copiedId, setCopiedId] = useState(null);
  const [copiedExport, setCopiedExport] = useState(false);

  // Modal states for creating/editing ads
  const [editingAd, setEditingAd] = useState(null);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // Modal states for creating/editing adsets
  const [editingAdSet, setEditingAdSet] = useState(null);
  const [isAdSetModalOpen, setIsAdSetModalOpen] = useState(false);

  // Quick helper to persist updates
  const updateAndSave = (newCampaignData) => {
    setCurrentCampaign(newCampaignData);
    if (onSaveCampaign) {
      onSaveCampaign(newCampaignData);
    }
  };

  // Copy text to clipboard with temporary feedback
  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export full campaign summary to clipboard for Media Buyer / Ads Manager
  const handleExportFullCampaign = () => {
    let output = `====================================================\n`;
    output += `🎯 ESTRATEGIA Y PLANIFICACIÓN META ADS - DOS SOLES\n`;
    output += `====================================================\n\n`;
    output += `CAMPAÑA: ${currentCampaign.name}\n`;
    output += `ESTADO: ${currentCampaign.status}\n`;
    output += `OBJETIVO: ${currentCampaign.objectiveName} (${currentCampaign.objective})\n`;
    output += `PRESUPUESTO: $${(currentCampaign.dailyBudget || 0).toLocaleString('es-AR')} ${currentCampaign.currency}/día ($${(currentCampaign.totalBudget || 0).toLocaleString('es-AR')} total) [${currentCampaign.budgetType}]\n`;
    output += `FECHAS: ${currentCampaign.startDate} al ${currentCampaign.endDate}\n\n`;

    output += `----------------------------------------------------\n`;
    output += `1. CONJUNTOS DE ANUNCIOS (AD SETS) - (${currentCampaign.adSets.length})\n`;
    output += `----------------------------------------------------\n`;
    if (currentCampaign.adSets.length === 0) {
      output += `(Sin conjuntos cargados aún)\n`;
    } else {
      currentCampaign.adSets.forEach((adSet, i) => {
        output += `\n[ADSET ${i + 1}]: ${adSet.name}\n`;
        output += `• Público: ${adSet.target} (${adSet.ageRange} - ${adSet.gender})\n`;
        output += `• Ubicación Geográfica: ${adSet.locations}\n`;
        output += `• Intereses Clave: ${adSet.interests}\n`;
        output += `• Placements Meta: ${adSet.placements}\n`;
        output += `• Presupuesto Estimado: ${adSet.budgetShare} ($${(adSet.dailyBudget || 0).toLocaleString('es-AR')} /día)\n`;
      });
    }

    output += `\n----------------------------------------------------\n`;
    output += `2. CREATIVOS Y ANUNCIOS (ADS MATRIX) - (${currentCampaign.ads.length})\n`;
    output += `----------------------------------------------------\n`;
    if (currentCampaign.ads.length === 0) {
      output += `(Sin anuncios cargados aún)\n`;
    } else {
      currentCampaign.ads.forEach((ad, i) => {
        const adSet = currentCampaign.adSets.find(s => s.id === ad.adSetId);
        output += `\n[ANUNCIO ${i + 1}]: ${ad.name}\n`;
        output += `• Formato: ${ad.format} | Estado: ${ad.status}\n`;
        output += `• Conjunto Asociado: ${adSet ? adSet.name : 'General'}\n`;
        output += `• Ángulo: ${ad.angle}\n`;
        output += `• Gancho Inicial (Hook): "${ad.hookText}"\n`;
        output += `• Headline (Título): ${ad.headline}\n`;
        output += `• CTA: ${ad.cta}\n`;
        output += `• Prefill WhatsApp: "${ad.whatsappPrefill}"\n`;
        output += `• Concepto Visual: ${ad.visualConcept}\n`;
        output += `• Texto Principal (Copy):\n${ad.primaryText}\n`;
        output += `----------------------------------------------------\n`;
      });
    }

    navigator.clipboard.writeText(output);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2500);
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Activa en Meta':
      case 'Activo':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Planificada':
      case 'Aprobado':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Guión Listo':
      case 'En Grabación':
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
    if (adData.id && updatedAds.some(a => a.id === adData.id)) {
      updatedAds = updatedAds.map(a => a.id === adData.id ? adData : a);
    } else {
      const newId = `ad-${Date.now()}`;
      updatedAds.push({ ...adData, id: newId });
    }
    updateAndSave({ ...currentCampaign, ads: updatedAds });
    setIsAdModalOpen(false);
    setEditingAd(null);
  };

  // Delete Ad
  const handleDeleteAd = (adId) => {
    if (confirm('¿Eliminar este anuncio de la planificación?')) {
      const updatedAds = currentCampaign.ads.filter(a => a.id !== adId);
      updateAndSave({ ...currentCampaign, ads: updatedAds });
    }
  };

  // Save or update AdSet
  const handleSaveAdSet = (adSetData) => {
    let updatedAdSets = [...currentCampaign.adSets];
    if (adSetData.id && updatedAdSets.some(s => s.id === adSetData.id)) {
      updatedAdSets = updatedAdSets.map(s => s.id === adSetData.id ? adSetData : s);
    } else {
      const newId = `adset-${Date.now()}`;
      updatedAdSets.push({ ...adSetData, id: newId });
    }
    updateAndSave({ ...currentCampaign, adSets: updatedAdSets });
    setIsAdSetModalOpen(false);
    setEditingAdSet(null);
  };

  // Delete AdSet
  const handleDeleteAdSet = (adSetId) => {
    if (confirm('¿Eliminar este conjunto de anuncios? Se desasociarán sus creativos vinculados.')) {
      const updatedAdSets = currentCampaign.adSets.filter(s => s.id !== adSetId);
      updateAndSave({ ...currentCampaign, adSets: updatedAdSets });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Campaign Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-crimson-border bg-gradient-to-br from-[#18181c] via-[#121215] to-[#0d0d10] p-6 shadow-2xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-crimson-red/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-crimson-red/20 text-brand-crimson-red border border-brand-crimson-red/30">
                <Target size={13} />
                <span>Meta Ads • Octubre 2026</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(currentCampaign.status)}`}>
                {currentCampaign.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {currentCampaign.budgetType}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              {currentCampaign.name}
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Objetivo: <strong className="text-gray-200">{currentCampaign.objectiveName}</strong>. Panel de planificación de creativos, audiencias y presupuesto.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportFullCampaign}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-all border border-zinc-700 shadow-sm"
              title="Copiar texto estructurado para el media buyer o Ads Manager"
            >
              {copiedExport ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedExport ? '¡Copiado!' : 'Exportar Ficha para Ads'}</span>
            </button>

            <button
              onClick={() => {
                setEditingAd({
                  name: '',
                  adSetId: currentCampaign.adSets[0]?.id || '',
                  format: 'Reel 9:16',
                  status: 'Idea',
                  angle: '',
                  hookText: '',
                  primaryText: '',
                  headline: '',
                  cta: 'Enviar mensaje de WhatsApp',
                  whatsappPrefill: '',
                  visualConcept: ''
                });
                setIsAdModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all shadow-lg shadow-brand-crimson-red/25"
            >
              <Plus size={14} />
              <span>+ Nuevo Anuncio</span>
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <DollarSign size={13} className="text-emerald-400" />
              <span>Inversión Octubre</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-white">
              {currentCampaign.totalBudget > 0 ? `$${currentCampaign.totalBudget.toLocaleString('es-AR')}` : '$0'} <span className="text-xs text-gray-400 font-normal">ARS</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {currentCampaign.dailyBudget > 0 ? `$${currentCampaign.dailyBudget.toLocaleString('es-AR')} /día` : 'Sin presupuesto fijado'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <MessageCircle size={13} className="text-blue-400" />
              <span>Leads WhatsApp Est.</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-400">
              {currentCampaign.kpis?.estimatedLeads > 0 ? `~${currentCampaign.kpis.estimatedLeads}` : '-'} <span className="text-xs text-gray-400 font-normal">consultas</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {currentCampaign.kpis?.targetCpl > 0 ? `CPL objetivo: $${currentCampaign.kpis.targetCpl.toLocaleString('es-AR')}` : 'Sin CPL objetivo'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <Users size={13} className="text-purple-400" />
              <span>Públicos Definidos</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-white">
              {currentCampaign.adSets.length} {currentCampaign.adSets.length === 1 ? 'conjunto' : 'conjuntos'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              segmentaciones configuradas
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
            <div className="flex items-center space-x-1.5 text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles size={13} className="text-amber-400" />
              <span>Creativos Planificados</span>
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-amber-400">
              {currentCampaign.ads.length} anuncios
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              en la matriz de contenido
            </div>
          </div>
        </div>
      </div>

      {/* 3. Subnavigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'ads'
                ? 'bg-brand-crimson-red text-white shadow-md shadow-brand-crimson-red/20'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Megaphone size={14} />
            <span>Matriz de Creativos & Copies ({currentCampaign.ads.length})</span>
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

      {/* 4. Tab Content: Ads Matrix */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          {currentCampaign.ads.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-black/20 flex flex-col items-center justify-center space-y-3">
              <div className="p-3.5 rounded-full bg-zinc-800/80 text-gray-400">
                <Megaphone size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">No hay anuncios cargados</h4>
                <p className="text-xs text-gray-400 max-w-sm">
                  La lista está vacía para que cargues los anuncios a medida que los vayas definiendo.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingAd({
                    name: '',
                    adSetId: currentCampaign.adSets[0]?.id || '',
                    format: 'Reel 9:16',
                    status: 'Idea',
                    angle: '',
                    hookText: '',
                    primaryText: '',
                    headline: '',
                    cta: 'Enviar mensaje de WhatsApp',
                    whatsappPrefill: '',
                    visualConcept: ''
                  });
                  setIsAdModalOpen(true);
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all shadow"
              >
                + Cargar Primer Anuncio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentCampaign.ads.map((ad) => {
                const matchedAdSet = currentCampaign.adSets.find(s => s.id === ad.adSetId);
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

                      <div className="text-[11px] text-gray-400 flex items-center space-x-1">
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

                      {ad.visualConcept && (
                        <div className="text-[11px] text-gray-400">
                          <strong className="text-gray-300">Rodaje/Visual:</strong> {ad.visualConcept}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentCampaign.ads.length > 0 && (
            <button
              onClick={() => {
                setEditingAd({
                  name: '',
                  adSetId: currentCampaign.adSets[0]?.id || '',
                  format: 'Reel 9:16',
                  status: 'Idea',
                  angle: '',
                  hookText: '',
                  primaryText: '',
                  headline: '',
                  cta: 'Enviar mensaje de WhatsApp',
                  whatsappPrefill: '',
                  visualConcept: ''
                });
                setIsAdModalOpen(true);
              }}
              className="w-full py-4 border-2 border-dashed border-zinc-800 hover:border-brand-crimson-red/50 rounded-2xl flex items-center justify-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition-all bg-black/20 hover:bg-black/40"
            >
              <Plus size={16} className="text-brand-crimson-red" />
              <span>+ Agregar otro Anuncio</span>
            </button>
          )}
        </div>
      )}

      {/* 5. Tab Content: AdSets / Audiences */}
      {activeTab === 'adsets' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Estructura de Audiencias y Segmentación (Conjuntos de Anuncios)
            </h3>
            <button
              onClick={() => {
                setEditingAdSet({
                  name: '',
                  target: '',
                  locations: '',
                  ageRange: '25 - 55 años',
                  gender: 'Todos',
                  interests: '',
                  placements: 'Instagram Reels & Stories',
                  budgetShare: '',
                  dailyBudget: 0,
                  status: 'Borrador'
                });
                setIsAdSetModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all"
            >
              <Plus size={13} />
              <span>+ Nuevo Conjunto de Anuncios</span>
            </button>
          </div>

          {currentCampaign.adSets.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-black/20 flex flex-col items-center justify-center space-y-3">
              <div className="p-3.5 rounded-full bg-zinc-800/80 text-gray-400">
                <Users size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">No hay conjuntos de anuncios definidos</h4>
                <p className="text-xs text-gray-400 max-w-sm">
                  Creá los conjuntos de anuncios para definir las audiencias, ubicaciones geográficas e intereses.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingAdSet({
                    name: '',
                    target: '',
                    locations: '',
                    ageRange: '25 - 55 años',
                    gender: 'Todos',
                    interests: '',
                    placements: 'Instagram Reels & Stories',
                    budgetShare: '',
                    dailyBudget: 0,
                    status: 'Borrador'
                  });
                  setIsAdSetModalOpen(true);
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-crimson-red hover:bg-brand-crimson-darkred text-white transition-all shadow"
              >
                + Cargar Primer Conjunto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                        {adSet.locations && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase block">Ubicaciones Geográficas:</span>
                            <p className="font-medium text-white">{adSet.locations}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase block">Demografía:</span>
                          <p>{adSet.ageRange} • {adSet.gender}</p>
                        </div>
                        {adSet.interests && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase block">Intereses / Segmentación:</span>
                            <p className="text-amber-300/90 leading-snug">{adSet.interests}</p>
                          </div>
                        )}
                        {adSet.placements && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase block">Placements Meta:</span>
                            <p className="text-gray-400">{adSet.placements}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase block">Presupuesto Asignado:</span>
                        <span className="font-bold text-emerald-400">
                          {adSet.budgetShare || '-'} {adSet.dailyBudget > 0 ? `($${adSet.dailyBudget.toLocaleString('es-AR')}/d)` : ''}
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded bg-zinc-800 text-[11px] font-bold text-gray-300">
                        {countAds} {countAds === 1 ? 'anuncio' : 'anuncios'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. Tab Content: Campaign Configuration */}
      {activeTab === 'config' && (
        <div className="rounded-2xl border border-brand-crimson-border bg-brand-crimson-card p-6 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Target size={18} className="text-brand-crimson-red" />
              <span>Ajustes Generales de la Campaña de Octubre</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Podés calibrar el presupuesto, el estado de la campaña y los números de WhatsApp de destino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Nombre de la Campaña:</label>
                <input
                  type="text"
                  value={currentCampaign.name}
                  onChange={(e) => updateAndSave({ ...currentCampaign, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Estado de la Campaña:</label>
                  <select
                    value={currentCampaign.status}
                    onChange={(e) => updateAndSave({ ...currentCampaign, status: e.target.value })}
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
                  <label className="text-gray-300 font-bold block mb-1">Optimización Presupuesto:</label>
                  <select
                    value={currentCampaign.budgetType}
                    onChange={(e) => updateAndSave({ ...currentCampaign, budgetType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="CBO">CBO (Advantage+ Budget a nivel Campaña)</option>
                    <option value="ABO">ABO (A nivel Conjunto de Anuncios)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Presupuesto Diario (ARS):</label>
                  <input
                    type="number"
                    value={currentCampaign.dailyBudget || ''}
                    placeholder="0"
                    onChange={(e) => {
                      const daily = parseInt(e.target.value, 10) || 0;
                      const total = daily * 31;
                      const cpl = currentCampaign.kpis?.targetCpl || 1;
                      updateAndSave({
                        ...currentCampaign,
                        dailyBudget: daily,
                        totalBudget: total,
                        kpis: {
                          ...currentCampaign.kpis,
                          estimatedLeads: cpl > 0 ? Math.round(total / cpl) : 0
                        }
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Inversión Total Mes (ARS):</label>
                  <input
                    type="number"
                    value={currentCampaign.totalBudget || ''}
                    disabled
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-gray-400 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Fecha de Inicio:</label>
                  <input
                    type="date"
                    value={currentCampaign.startDate}
                    onChange={(e) => updateAndSave({ ...currentCampaign, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Fecha de Fin:</label>
                  <input
                    type="date"
                    value={currentCampaign.endDate}
                    onChange={(e) => updateAndSave({ ...currentCampaign, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Objetivo de Campaña Meta:</label>
                <input
                  type="text"
                  value={currentCampaign.objectiveName}
                  onChange={(e) => updateAndSave({ ...currentCampaign, objectiveName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Costo por Lead Objetivo (CPL ARS):</label>
                <input
                  type="number"
                  value={currentCampaign.kpis?.targetCpl || ''}
                  placeholder="0"
                  onChange={(e) => {
                    const cpl = parseInt(e.target.value, 10) || 0;
                    updateAndSave({
                      ...currentCampaign,
                      kpis: {
                        ...currentCampaign.kpis,
                        targetCpl: cpl,
                        estimatedLeads: cpl > 0 ? Math.round(currentCampaign.totalBudget / cpl) : 0
                      }
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Ad */}
      {isAdModalOpen && editingAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#141417] border border-brand-crimson-border rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Megaphone size={16} className="text-brand-crimson-red" />
                <span>{editingAd.id ? 'Editar Anuncio' : 'Nuevo Anuncio'}</span>
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
                  <label className="text-gray-300 font-bold block mb-1">Nombre / Identificador:</label>
                  <input
                    type="text"
                    value={editingAd.name}
                    onChange={(e) => setEditingAd({ ...editingAd, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="Ej. Anuncio 01: Hook Alisados..."
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Conjunto de Anuncios:</label>
                  <select
                    value={editingAd.adSetId}
                    onChange={(e) => setEditingAd({ ...editingAd, adSetId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="">General / Sin conjunto asignado</option>
                    {currentCampaign.adSets.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
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
                    <option value="Reel 9:16">Reel 9:16</option>
                    <option value="Video 4:5">Video 4:5</option>
                    <option value="Carrusel 1:1">Carrusel 1:1</option>
                    <option value="Imagen 1:1">Imagen 1:1</option>
                    <option value="Story 9:16">Story 9:16</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Estado de Producción:</label>
                  <select
                    value={editingAd.status}
                    onChange={(e) => setEditingAd({ ...editingAd, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Guión Listo">Guión</option>
                    <option value="En Grabación">En Grabación</option>
                    <option value="Editado">Editado</option>
                    <option value="Aprobado">Aprobado</option>
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
                    <option value="Contactar">Contactar</option>
                    <option value="Comprar">Comprar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Ángulo de Venta / Propuesta:</label>
                <input
                  type="text"
                  value={editingAd.angle}
                  onChange={(e) => setEditingAd({ ...editingAd, angle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  placeholder="Ej. Rentabilidad de bacha / Reposición express..."
                />
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
                  rows={5}
                  value={editingAd.primaryText}
                  onChange={(e) => setEditingAd({ ...editingAd, primaryText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-sans"
                  placeholder="Escribí el texto persuasivo completo del anuncio..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Headline (Título corto del anuncio):</label>
                  <input
                    type="text"
                    value={editingAd.headline}
                    onChange={(e) => setEditingAd({ ...editingAd, headline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="Ej. Stock directo para Salones"
                  />
                </div>

                <div>
                  <label className="text-emerald-400 font-bold block mb-1">Mensaje Predeterminado WhatsApp:</label>
                  <input
                    type="text"
                    value={editingAd.whatsappPrefill}
                    onChange={(e) => setEditingAd({ ...editingAd, whatsappPrefill: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="El texto que aparecerá al abrir el chat..."
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Concepto Visual / Notas de Rodaje:</label>
                <input
                  type="text"
                  value={editingAd.visualConcept}
                  onChange={(e) => setEditingAd({ ...editingAd, visualConcept: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  placeholder="Qué se filma o qué imagen se muestra..."
                />
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
                Guardar Anuncio
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
                  placeholder="Ej. AdSet 01: Dueños de Salones..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Público / Target:</label>
                  <input
                    type="text"
                    value={editingAdSet.target}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, target: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="B2B Salones / Retargeting"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-bold block mb-1">Ubicaciones Meta (Placements):</label>
                  <input
                    type="text"
                    value={editingAdSet.placements}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, placements: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="Reels & Stories (9:16)"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Ubicaciones Geográficas:</label>
                <input
                  type="text"
                  value={editingAdSet.locations}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, locations: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  placeholder="Córdoba, Santa Fe, Buenos Aires..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Rango de Edad:</label>
                  <input
                    type="text"
                    value={editingAdSet.ageRange}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, ageRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="25 - 55 años"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Género:</label>
                  <input
                    type="text"
                    value={editingAdSet.gender}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="Todos / Mujeres"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Intereses y Palabras Clave de Segmentación:</label>
                <textarea
                  rows={3}
                  value={editingAdSet.interests}
                  onChange={(e) => setEditingAdSet({ ...editingAdSet, interests: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                  placeholder="Peluquería, belleza, alisados..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Porcentaje Presupuesto (%):</label>
                  <input
                    type="text"
                    value={editingAdSet.budgetShare}
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, budgetShare: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none"
                    placeholder="50%"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Presupuesto Diario Sugerido (ARS):</label>
                  <input
                    type="number"
                    value={editingAdSet.dailyBudget || ''}
                    placeholder="0"
                    onChange={(e) => setEditingAdSet({ ...editingAdSet, dailyBudget: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:border-brand-crimson-red focus:outline-none font-mono"
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
