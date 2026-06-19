import React, { useState } from "react";
import { ShieldCheck, Info, FileText, CheckCircle2 } from "lucide-react";

export default function ClientView({ showToast, articles, setArticles }) {
  // Form State
  const [formData, setFormData] = useState({
    designation: "Boîte Conserve Standard",
    diameter: "73",
    height: "110",
    varnish: "Organosol Gold",
    phResistance: "pH 4-6",
    alcoholRate: 5,
    packaging: "Palette Euro x 48"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      alcoholRate: parseInt(e.target.value, 10)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new article entry
    const newArticle = {
      id: "ART-" + Math.floor(1000 + Math.random() * 9000),
      designation: formData.designation,
      clientName: "Client Test SAS", // Salesforce pre-filled client
      clientCode: "CLI-4512",
      division: "Food Cans", // based on pre-filled division
      subType: "Boîte 3 pièces", // default default sub-type
      diameter: formData.diameter,
      height: formData.height,
      varnish: formData.varnish,
      phResistance: formData.phResistance,
      alcoholRate: formData.alcoholRate,
      packaging: formData.packaging,
      status: "En attente"
    };

    setArticles(prev => [newArticle, ...prev]);

    // Trigger success Toast
    showToast(
      "✅ Succès ! Un email récapitulatif contenant le PDF de configuration vient d'être envoyé au client et le dossier a été transmis à l'Administration Des Ventes (ADV)",
      "success"
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner Client (Salesforce pre-filled data) */}
      <div className="bg-secondary-container text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Salesforce Connect
            </span>
            <span className="text-xs flex items-center gap-1 font-semibold text-primary">
              <ShieldCheck className="w-4 h-4" /> Lien sécurisé — Accès client unique
            </span>
          </div>
          <h2 className="text-2xl font-black font-headline">Formulaire Client — Pré-rempli depuis Salesforce</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-primary/80 font-medium">
            <span>Client : <strong className="text-primary font-bold">Client Test SAS</strong></span>
            <span>Code : <strong className="text-primary font-bold">CLI-4512</strong></span>
            <span>Division : <strong className="text-primary font-bold">Food Cans</strong></span>
          </div>
        </div>
        <div className="hidden md:block">
          <FileText className="w-16 h-16 text-white/20" />
        </div>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-headline text-primary border-b border-outline-variant/15 pb-3">
              Spécifications du Contrat Produit
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Designation */}
              <div className="relative group md:col-span-2">
                <input 
                  type="text" 
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md"
                />
                <label 
                  htmlFor="designation"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-outline peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-secondary pointer-events-none"
                >
                  Désignation produit
                </label>
              </div>

              {/* Diameter */}
              <div className="relative group">
                <input 
                  type="number" 
                  name="diameter"
                  id="diameter"
                  value={formData.diameter}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md"
                />
                <label 
                  htmlFor="diameter"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-outline peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-secondary pointer-events-none"
                >
                  Diamètre (mm)
                </label>
              </div>

              {/* Total Height */}
              <div className="relative group">
                <input 
                  type="number" 
                  name="height"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md"
                />
                <label 
                  htmlFor="height"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-outline peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-secondary pointer-events-none"
                >
                  Hauteur totale (mm)
                </label>
              </div>

              {/* Varnish type */}
              <div className="relative group">
                <select
                  name="varnish"
                  id="varnish"
                  value={formData.varnish}
                  onChange={handleChange}
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md appearance-none"
                >
                  <option value="Organosol Gold">Organosol Gold</option>
                  <option value="Epoxy Phenolic">Epoxy Phenolic</option>
                  <option value="BPA-NI White">BPA-NI White</option>
                  <option value="Sans vernis">Sans vernis</option>
                </select>
                <label 
                  htmlFor="varnish"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all pointer-events-none"
                >
                  Type de vernis intérieur
                </label>
              </div>

              {/* pH Resistance */}
              <div className="relative group">
                <select
                  name="phResistance"
                  id="phResistance"
                  value={formData.phResistance}
                  onChange={handleChange}
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md appearance-none"
                >
                  <option value="pH 2-4">pH 2-4</option>
                  <option value="pH 4-6">pH 4-6</option>
                  <option value="pH 6-8">pH 6-8</option>
                  <option value="Neutre">Neutre</option>
                </select>
                <label 
                  htmlFor="phResistance"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all pointer-events-none"
                >
                  Résistance au pH
                </label>
              </div>

              {/* Packaging */}
              <div className="relative group md:col-span-2">
                <select
                  name="packaging"
                  id="packaging"
                  value={formData.packaging}
                  onChange={handleChange}
                  className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-secondary focus:ring-0 text-sm pt-6 pb-2 transition-all px-2 outline-none rounded-t-md appearance-none"
                >
                  <option value="Palette Euro x 48">Palette Euro x 48</option>
                  <option value="Vrac">Vrac</option>
                  <option value="Caisse carton">Caisse carton</option>
                </select>
                <label 
                  htmlFor="packaging"
                  className="absolute left-2 top-1.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-wide transition-all pointer-events-none"
                >
                  Conditionnement
                </label>
              </div>

              {/* Alcohol Rate Slider */}
              <div className="md:col-span-2 space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">
                    Taux d'alcool (%)
                  </span>
                  <span className="font-mono font-bold text-secondary text-sm bg-surface-container-lowest px-2 py-0.5 rounded">
                    {formData.alcoholRate} %
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0"
                  max="100"
                  value={formData.alcoholRate}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>
            </div>

            {/* Dynamic Banner Interaction */}
            {formData.alcoholRate > 15 && (
              <div className="p-4 bg-secondary text-white rounded-lg flex items-start gap-3 shadow-md animate-slideIn">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-medium leading-relaxed">
                  ℹ️ Un vernis adapté aux produits alcoolisés sera recommandé automatiquement.
                </div>
              </div>
            )}
          </div>

          {/* Form CTA Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button 
              type="button" 
              onClick={() => setFormData({
                designation: "Boîte Conserve Standard",
                diameter: "73",
                height: "110",
                varnish: "Organosol Gold",
                phResistance: "pH 4-6",
                alcoholRate: 5,
                packaging: "Palette Euro x 48"
              })}
              className="px-6 py-2.5 text-primary font-bold hover:bg-surface-container-high transition-colors rounded-lg text-sm"
            >
              Réinitialiser
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-secondary text-white font-bold rounded-lg shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 text-sm"
            >
              Soumettre la Revue de Contrat
            </button>
          </div>
        </form>

        {/* Right Info / Summary Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Live contract preview */}
          <div className="bg-primary text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              Aperçu du Contrat
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-start">
                <span className="text-white/60">Désignation</span>
                <span className="text-right font-medium truncate max-w-[180px]">{formData.designation || "Non renseigné"}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Dimensions</span>
                <span className="text-right font-medium">
                  {formData.diameter && formData.height ? `Ø ${formData.diameter} x H ${formData.height} mm` : "—"}
                </span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Vernis Interne</span>
                <span className="text-right font-medium">{formData.varnish}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">pH</span>
                <span className="text-right font-medium">{formData.phResistance}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Alcool</span>
                <span className="text-right font-medium">{formData.alcoholRate}%</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="text-white/60">Emballage</span>
                <span className="text-right font-medium">{formData.packaging}</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-secondary-container">Statut Soumission</span>
              <span className="text-[10px] text-white/40">Prêt pour envoi</span>
            </div>
          </div>

          {/* Guidelines info card */}
          <div className="bg-surface-container-low p-6 rounded-xl space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              Règles Industrielles
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs text-on-surface-variant">Vérification de la compatibilité chimique</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs text-on-surface-variant">Conformité réglementaire européenne</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs text-on-surface-variant">Exportation PDF validée par l'ADV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
