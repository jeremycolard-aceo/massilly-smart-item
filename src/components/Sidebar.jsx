import React from "react";
import { LayoutDashboard, FileText, Sliders, RefreshCw, History, PlusCircle, HelpCircle, LogOut } from "lucide-react";

export default function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col py-6 bg-surface-container-low dark:bg-slate-900 z-40">
      {/* Brand Logo */}
      <div className="px-6 mb-8 flex items-center justify-start">
        <img 
          alt="Massilly Services" 
          className="h-12 w-auto object-contain" 
          src="./logo_main.png"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <button 
          onClick={() => setCurrentView("internal")} 
          className={`w-[calc(100%-16px)] flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors font-medium text-sm text-left group ${
            currentView === "dashboard"
              ? "bg-secondary text-white shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-700"
          }`}
        >
          <LayoutDashboard className="w-5 h-5 text-current" />
          Dashboard
        </button>

        <button 
          onClick={() => setCurrentView("client")} 
          className={`w-[calc(100%-16px)] flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors font-medium text-sm text-left group ${
            currentView === "client"
              ? "bg-secondary text-white shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-700"
          }`}
        >
          <FileText className="w-5 h-5 text-current" />
          Client Requests
        </button>

        <button 
          onClick={() => setCurrentView("internal")} 
          className={`w-[calc(100%-16px)] flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md transition-colors font-medium text-sm text-left group ${
            currentView === "internal"
              ? "bg-secondary text-white shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-700"
          }`}
        >
          <Sliders className="w-5 h-5 text-current" />
          Article Config
        </button>

        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors font-medium text-sm group"
        >
          <RefreshCw className="w-5 h-5 text-current" />
          M3 Sync
        </a>

        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors font-medium text-sm group"
        >
          <History className="w-5 h-5 text-current" />
          Logs
        </a>
      </nav>

      {/* Footer / Extra Actions */}
      <div className="px-4 mt-auto space-y-1">
        <button 
          onClick={() => setCurrentView(currentView === "client" ? "client" : "internal")} 
          className="w-full flex items-center justify-center gap-2 py-3 mb-4 bg-primary text-white rounded-lg font-semibold text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-container"
        >
          <PlusCircle className="w-4.5 h-4.5 text-white" />
          New Request
        </button>
        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary font-medium text-sm"
        >
          <HelpCircle className="w-5 h-5 text-current" />
          Support
        </a>
        <a 
          href="#" 
          className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error font-medium text-sm"
        >
          <LogOut className="w-5 h-5 text-current" />
          Logout
        </a>
      </div>
    </aside>
  );
}
