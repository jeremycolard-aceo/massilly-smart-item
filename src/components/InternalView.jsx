import React, { useState, useEffect } from "react";
import { Database, Settings, ClipboardCheck, Info, Loader2, CheckCircle2, ChevronDown, Camera } from "lucide-react";

export default function InternalView({ showToast }) {
  // Configurator steps & accordions
  const [activeStep, setActiveStep] = useState(1); // 1: Référentiel M3, 2: Paramètres Techniques, 3: Validation
  const [activeSection, setActiveSection] = useState(1); // 1, 2, 3

  // Form states
  const [clientCode, setClientCode] = useState("CUST-8829");
  const [metalType, setMetalType] = useState("Fer blanc (Tinplate)");
  const [division, setDivision] = useState("Food Cans");
  const [subType, setSubType] = useState("Boîte 3 pièces");
  
  // Tech parameters
  const [grammage, setGrammage] = useState("2.80");
  const [format, setFormat] = useState("800 x 950");
  const [varnish, setVarnish] = useState("Organosol Gold");

  // Anti-doublon M3 search
  const [antiDuplicateSearch, setAntiDuplicateSearch] = useState("");
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  // Loading state for validation
  const [isValidating, setIsValidating] = useState(false);

  // Sub-type dictionary based on division
  const subTypesByDivision = {
    "Food Cans": ["Boîte 3 pièces", "Boîte 2 pièces", "Fond"],
    Capsules: ["Twist-off", "À vis"],
    "General Line": ["Bidon", "Seau", "Boîte rectangulaire"],
    "Aérosols": ["Boîtier aérosol", "Coupelle", "Diffuseur"]
  };

  // Update subType when division changes
  useEffect(() => {
    const availableTypes = subTypesByDivision[division] || [];
    if (availableTypes.length > 0) {
      setSubType(availableTypes[0]);
    }
  }, [division]);

  // Handle anti-doublon warning
  useEffect(() => {
    if (antiDuplicateSearch.trim() === "Capsule-A12") {
      setShowDuplicateWarning(true);
    } else {
      setShowDuplicateWarning(false);
    }
  }, [antiDuplicateSearch]);

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (sectionId) {
      setActiveStep(sectionId);
    }
  };

  const handleNextStep = (currentSec) => {
    if (currentSec < 3) {
      setActiveSection(currentSec + 1);
      setActiveStep(currentSec + 1);
    }
  };

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      showToast("✅ Article injecté avec succès dans l'ERP M3 via Boomi.", "success");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title section */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary font-bold text-xs tracking-widest uppercase">Espace Configurateur</span>
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
          </div>
          <h2 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Configuration de l'Article</h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">Remplissez les spécifications techniques pour générer la nouvelle référence industrielle dans l'ERP M3.</p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <button className="px-6 py-2.5 text-primary font-bold hover:bg-surface-container-high transition-colors rounded-lg text-sm">Annuler</button>
          <button 
            onClick={handleValidate}
            disabled={isValidating}
            className="px-8 py-2.5 bg-secondary text-white font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Injection...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Valider
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stepper (Connecting Pipe) */}
      <div className="bg-surface-container-low p-6 rounded-xl shadow-sm">
        <div className="relative flex justify-between items-center max-w-3xl mx-auto">
          {/* Connecting Pipe Background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-outline-variant/40 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Active / Completed Pipe Fill */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-500" 
            style={{
              width: activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%"
            }}
          />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <button 
              onClick={() => handleSectionClick(1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                activeStep === 1
                  ? "bg-secondary text-white ring-4 ring-secondary/20"
                  : activeStep > 1
                  ? "bg-primary text-white"
                  : "bg-surface-container-highest text-on-surface-variant border border-outline-variant"
              }`}
            >
              1
            </button>
            <span className={`text-xs font-bold font-headline ${activeStep === 1 ? "text-secondary" : "text-primary"}`}>
              Référentiel M3
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <button 
              onClick={() => handleSectionClick(2)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                activeStep === 2
                  ? "bg-secondary text-white ring-4 ring-secondary/20"
                  : activeStep > 2
                  ? "bg-primary text-white"
                  : "bg-surface-container-highest text-on-surface-variant border border-outline-variant"
              }`}
            >
              2
            </button>
            <span className={`text-xs font-bold font-headline ${activeStep === 2 ? "text-secondary" : activeStep > 2 ? "text-primary" : "text-on-surface-variant"}`}>
              Paramètres Techniques
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <button 
              onClick={() => handleSectionClick(3)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                activeStep === 3
                  ? "bg-secondary text-white ring-4 ring-secondary/20"
                  : "bg-surface-container-highest text-on-surface-variant border border-outline-variant"
              }`}
            >
              3
            </button>
            <span className={`text-xs font-bold font-headline ${activeStep === 3 ? "text-secondary" : "text-on-surface-variant"}`}>
              Validation
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Accordions Column */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          
          {/* Section 1: Référentiel M3 */}
          <div className={`bg-surface-container-low rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${activeSection === 1 ? "ring-2 ring-primary/10" : ""}`}>
            <button 
              onClick={() => handleSectionClick(1)}
              className="w-full flex items-center justify-between p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeSection === 1 ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Section 1</span>
                  <h3 className="text-lg font-bold font-headline text-primary leading-tight">Référentiel M3</h3>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${activeSection === 1 ? "rotate-180" : ""}`} />
            </button>

            {activeSection === 1 && (
              <div className="px-6 pb-8 space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Code Client */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Code Client (ERP)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={clientCode} 
                        onChange={(e) => setClientCode(e.target.value)}
                        className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 transition-all px-2 outline-none rounded-t-md" 
                        placeholder="Ex: CUST-8829" 
                      />
                    </div>
                  </div>

                  {/* Type de Métal */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Type de Métal</label>
                    <select 
                      value={metalType}
                      onChange={(e) => setMetalType(e.target.value)}
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 transition-all px-2 outline-none rounded-t-md"
                    >
                      <option>Fer blanc (Tinplate)</option>
                      <option>Aluminium</option>
                      <option>Acier Chromé (TFS)</option>
                    </select>
                  </div>

                  {/* Division (Interdependent Dropdown 1) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Division</label>
                    <select 
                      value={division} 
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 transition-all px-2 outline-none rounded-t-md"
                    >
                      <option value="Food Cans">Food Cans</option>
                      <option value="Capsules">Capsules</option>
                      <option value="General Line">General Line</option>
                      <option value="Aérosols">Aérosols</option>
                    </select>
                  </div>

                  {/* Sous-type d'article (Interdependent Dropdown 2) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Sous-type d'article</label>
                    <select 
                      value={subType}
                      onChange={(e) => setSubType(e.target.value)}
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 transition-all px-2 outline-none rounded-t-md"
                    >
                      {(subTypesByDivision[division] || []).map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Code Devise */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Code Devise</label>
                    <input 
                      className="w-full bg-surface-container-high/50 border-0 border-b-2 border-outline-variant/20 text-sm py-2.5 text-on-surface-variant cursor-not-allowed px-2 rounded-t-md" 
                      readonly 
                      type="text" 
                      value="EUR" 
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="button" 
                    onClick={() => handleNextStep(1)}
                    className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container text-xs transition-colors"
                  >
                    Étape suivante
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Paramètres Techniques */}
          <div className={`bg-surface-container-low rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${activeSection === 2 ? "ring-2 ring-primary/10" : ""}`}>
            <button 
              onClick={() => handleSectionClick(2)}
              className="w-full flex items-center justify-between p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeSection === 2 ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"}`}>
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest leading-none">Section 2</span>
                  <h3 className="text-lg font-bold font-headline text-primary leading-tight">Paramètres Techniques</h3>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${activeSection === 2 ? "rotate-180" : ""}`} />
            </button>

            {activeSection === 2 && (
              <div className="px-6 pb-8 space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Grammage */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Grammage (GP)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        step="0.01" 
                        value={grammage} 
                        onChange={(e) => setGrammage(e.target.value)}
                        className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 px-2 rounded-t-md" 
                      />
                      <span className="text-xs font-bold text-outline">g/m²</span>
                    </div>
                  </div>

                  {/* Format */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Format (mm)</label>
                    <input 
                      type="text" 
                      value={format} 
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 px-2 rounded-t-md" 
                      placeholder="Ex: 800 x 950" 
                    />
                  </div>

                  {/* Vernis */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">Vernis Intérieur</label>
                    <select 
                      value={varnish} 
                      onChange={(e) => setVarnish(e.target.value)}
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-2.5 px-2 rounded-t-md"
                    >
                      <option>Organosol Gold</option>
                      <option>Epoxy Phenolic</option>
                      <option>BPA-NI White</option>
                      <option>Sans vernis</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 flex items-start gap-4 shadow-inner">
                  <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-on-surface-variant italic">
                    Le choix du vernis influence directement la compatibilité avec les normes de sécurité alimentaire européennes. Vérifiez la fiche technique.
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="button" 
                    onClick={() => handleNextStep(2)}
                    className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container text-xs transition-colors"
                  >
                    Étape suivante
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Contrôle d'unicité ERP & Recherche anti-doublon */}
          <div className={`bg-surface-container-low rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${activeSection === 3 ? "ring-2 ring-primary/10" : ""}`}>
            <button 
              onClick={() => handleSectionClick(3)}
              className="w-full flex items-center justify-between p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeSection === 3 ? "bg-tertiary-container text-white" : "bg-tertiary-container/10 text-tertiary-container"}`}>
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest leading-none">Section 3</span>
                  <h3 className="text-lg font-bold font-headline text-primary leading-tight">Contrôle d'Unicité ERP</h3>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${activeSection === 3 ? "rotate-180" : ""}`} />
            </button>

            {activeSection === 3 && (
              <div className="px-6 pb-8 space-y-6 animate-fadeIn">
                {/* Search Input for Duplicate Check */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">
                    Recherche anti-doublon M3
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={antiDuplicateSearch}
                      onChange={(e) => setAntiDuplicateSearch(e.target.value)}
                      placeholder="Tapez une référence à tester (ex: Capsule-A12)..."
                      className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm py-3 px-3 outline-none rounded-t-md font-mono"
                    />
                    <span className="absolute right-3 top-3.5 text-xs text-on-surface-variant font-bold uppercase tracking-widest">
                      Anti-doublon
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant italic">
                    Astuce démo : Tapez exactement <strong className="text-secondary">Capsule-A12</strong> pour déclencher l'alerte d'existence ERP.
                  </p>
                </div>

                {/* Orange Duplicate Warning Banner */}
                {showDuplicateWarning && (
                  <div className="p-4 bg-[#FFF3CD] text-[#856404] border border-[#FF8800] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-slideIn">
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">⚠️</span>
                      <div className="text-xs font-bold leading-normal">
                        Attention : Une référence proche existe déjà (CAPS-A12-2023). Souhaitez-vous la modifier ?
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button 
                        type="button" 
                        onClick={() => {
                          setAntiDuplicateSearch("");
                          showToast("Dossier existant sélectionné pour modification.", "info");
                        }}
                        className="px-3 py-1 bg-[#FF8800] hover:bg-orange-600 text-white rounded text-[10px] font-bold uppercase transition-colors"
                      >
                        Modifier l'existant
                      </button>
                    </div>
                  </div>
                )}

                {/* ERP Uniqueness Status Card */}
                <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${showDuplicateWarning ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"}`}></div>
                      <span className="text-sm font-bold text-on-surface">
                        Statut : {showDuplicateWarning ? "Référence en conflit" : "Référence unique"}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant italic">
                      {showDuplicateWarning 
                        ? "Doublon détecté. Veuillez résoudre le conflit ou modifier l'existant." 
                        : "L'article configuré n'existe pas encore dans M3. Création possible."
                      }
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="text-[10px] font-bold text-outline-variant uppercase">Code Provisoire</span>
                    <span className="font-mono text-primary font-bold text-lg">
                      {showDuplicateWarning ? "CAPS-A12-2023" : "ART-2026-X88"}
                    </span>
                  </div>
                </div>

                {/* Final Submit Zone in Section 3 */}
                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    type="button"
                    disabled={isValidating}
                    onClick={handleValidate}
                    className="w-full sm:w-auto px-8 py-3 bg-secondary text-white font-bold rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isValidating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Injection ERP en cours...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Valider et Injecter dans M3
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Information Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Real-time Preview Card */}
          <div className="bg-primary text-white p-6 rounded-xl shadow-xl relative overflow-hidden shadow-ambient">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Aperçu Configuration</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-start">
                <span className="text-white/60">Division</span>
                <span className="text-right font-medium">{division}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Sous-type</span>
                <span className="text-right font-medium">{subType}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Type Métal</span>
                <span className="text-right font-medium truncate max-w-[150px]">{metalType}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Grammage</span>
                <span className="text-right font-medium">{grammage ? `${grammage} g/m²` : "—"}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Format</span>
                <span className="text-right font-medium">{format || "—"}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Vernis</span>
                <span className="text-right font-medium">{varnish}</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-secondary-container">Dernier sync ERP</span>
              <span className="text-[10px] text-white/40">Aujourd'hui, {new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>

          {/* Visual Reference (Blueprint Scheme) */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs font-bold text-primary uppercase">Schéma Technique</span>
              <Camera className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="h-48 relative">
              <img 
                alt="Technical Schema" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-3751DkulI8HVDhDXkVcI0BAyn-oRpXVXJiDr-wM5Ma22cROOPq0Ycch_5236MkszrEH5JX1nDyFW2CffgBZfkf2YRp9cgfqwh6hQ_vNbBysAClxTRDgFQa-GSCwzAeQekE-3EVf76Lhm16LWyJf5cEqk5zR6dKfc3at3QBm24no9_F_4_Zq2x2AT6BS9RMBNPvaP-BP6HCLUtaA1X6WP28gb3VSBbR4RFmu0Yzr3AF619LTHSlLcEUuD8MKRy0FyXCi0BnbJsks"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold text-primary shadow-sm uppercase font-mono">
                Modèle 70-TO
              </div>
            </div>
          </div>

          {/* Validation Checklist */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/10 shadow-sm">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-widest">Checklist de validation</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-on-surface-variant">Client validé dans M3</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-on-surface-variant">Coût matière actualisé</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-outline-variant/40"></div>
                <span className="text-xs text-on-surface-variant">Validation Qualité (Pending)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
