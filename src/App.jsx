import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ClientView from "./components/ClientView";
import InternalView from "./components/InternalView";
import { X } from "lucide-react";

export default function App() {
  // Navigation State: 'client' or 'internal'
  const [view, setView] = useState("internal");

  // Lifted Articles State
  const [articles, setArticles] = useState([
    {
      id: "ART-8829",
      designation: "Capsule Twist-off 70",
      clientName: "Client Test SAS",
      clientCode: "CLI-4512",
      division: "Capsules",
      subType: "Twist-off",
      diameter: "70",
      height: "10",
      varnish: "Organosol Gold",
      phResistance: "pH 4-6",
      alcoholRate: 12,
      packaging: "Palette Euro x 48",
      status: "En attente"
    },
    {
      id: "ART-4521",
      designation: "Boîte Conserve 3-P",
      clientName: "Conserves du Midi",
      clientCode: "CLI-9912",
      division: "Food Cans",
      subType: "Boîte 3 pièces",
      diameter: "73",
      height: "110",
      varnish: "Epoxy Phenolic",
      phResistance: "Neutre",
      alcoholRate: 0,
      packaging: "Vrac",
      status: "En attente"
    }
  ]);

  // Selected Article for configuration
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" // 'success' | 'info' | 'error'
  });

  // Function to show toast
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type
    });
  };

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen w-full relative overflow-x-hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar currentView={view} setCurrentView={setView} />

      {/* Main Canvas - Offset by sidebar (ml-64) */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* Header - Navy Topbar */}
        <Header currentView={view} setCurrentView={setView} />

        {/* Dynamic Views Pane */}
        <main className="flex-1 p-10 max-w-6xl mx-auto w-full pb-16">
          {/* Transition wrapper (Remounts on key change for a smooth CSS fade-in) */}
          <div key={view} className="animate-fadeIn">
            {view === "client" ? (
              <ClientView 
                showToast={showToast} 
                articles={articles} 
                setArticles={setArticles} 
              />
            ) : (
              <InternalView 
                showToast={showToast} 
                articles={articles} 
                setArticles={setArticles}
                selectedArticleId={selectedArticleId}
                setSelectedArticleId={setSelectedArticleId}
              />
            )}
          </div>
        </main>

        {/* Footer Note */}
        <footer className="mt-auto py-6 px-10 border-t border-outline-variant/10 text-center bg-surface-container-low/50">
          <p className="text-[10px] text-outline uppercase tracking-widest font-medium">
            Massilly Services Industriels — Système de gestion des actifs critiques — © 2026
          </p>
        </footer>
      </div>

      {/* Toast Alert System - Glassmorphism, Slide-in, Shadow Ambient */}
      {toast.show && (
        <div 
          className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl glass-panel shadow-ambient border border-white/20 flex items-start gap-3 animate-slideIn"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)"
          }}
        >
          <div className="flex-1 text-sm font-medium text-primary">
            {toast.message}
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, show: false }))}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
