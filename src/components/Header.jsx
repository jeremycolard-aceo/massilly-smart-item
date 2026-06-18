import React from "react";
import { Bell, Settings } from "lucide-react";

export default function Header({ currentView, setCurrentView }) {
  return (
    <header className="sticky top-0 z-30 bg-primary dark:bg-slate-950 flex justify-between items-center w-full px-10 h-16 shadow-lg shadow-primary/20">
      {/* Brand logo and switch toggle */}
      <div className="flex items-center gap-12">
        <span className="text-xl font-black text-white tracking-tighter font-headline">SMART ITEM</span>
        
        {/* Visual Switch Toggle */}
        <div className="relative flex items-center bg-primary-container p-1 rounded-full w-[360px] h-10 shadow-inner">
          {/* Sliding active background */}
          <div 
            className="absolute top-1 bottom-1 rounded-full bg-secondary-container transition-all duration-300 ease-out shadow-sm"
            style={{
              left: currentView === "client" ? "4px" : "calc(50% + 2px)",
              width: "calc(50% - 6px)"
            }}
          />
          
          {/* Left Button */}
          <button 
            type="button"
            onClick={() => setCurrentView("client")}
            className={`relative flex-1 z-10 flex items-center justify-center gap-2 text-xs font-bold font-headline transition-colors duration-300 ${
              currentView === "client" ? "text-primary" : "text-slate-300 hover:text-white"
            }`}
          >
            <span>👤</span>
            <span>Vue Client Externe</span>
          </button>
          
          {/* Right Button */}
          <button 
            type="button"
            onClick={() => setCurrentView("internal")}
            className={`relative flex-1 z-10 flex items-center justify-center gap-2 text-xs font-bold font-headline transition-colors duration-300 ${
              currentView === "internal" ? "text-primary" : "text-slate-300 hover:text-white"
            }`}
          >
            <span>🏭</span>
            <span>Vue Interne Massilly</span>
          </button>
        </div>
      </div>

      {/* Right controls: notification, settings, avatar */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <button className="text-secondary-container hover:bg-white/10 rounded-full p-2 transition-colors duration-200">
            <Bell className="w-5 h-5 text-current" />
          </button>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </div>
        
        <button className="text-secondary-container hover:bg-white/10 rounded-full p-2 transition-colors duration-200">
          <Settings className="w-5 h-5 text-current" />
        </button>

        <div className="h-8 w-8 rounded-full overflow-hidden border border-secondary-container/30">
          <img 
            alt="User profile avatar" 
            className="object-cover w-full h-full" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcD-g8WqmL-JflQwI6W5JcSdwJam4_1k8FOmcsR_rFETrdxMAEejqSPhAQ3Tqrn9NIrNAeB3PUu7hUmlR9qEBzKRJ0aEtftqWfUKnYve_e2NAcesdVmDHhYCw9uD7_Q3vgCGvFpj_crQ36cuCz-K3_N49qnhmGr-OBXZgaqXfIDbdgfG8kFPzM2Sh6M3qPbx2IgVBp_V4Q90q_HxbPfTqS5Jn8OXpD2ZLX214u1Fy-hUHudNI450SYgHXJdG7sjlizVBFxOP7vv48"
          />
        </div>
      </div>
    </header>
  );
}
