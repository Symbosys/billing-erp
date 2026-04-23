import React from "react";
import { 
  Bell, 
  Search, 
  Menu, 
  Zap, 
  Settings, 
  ChevronDown,
  Globe
} from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-white/40 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-[800] transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      
      {/* Left: Mobile Toggle & Brand Identity */}
      <div className="flex items-center gap-4 lg:w-64">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-2xl transition-all duration-300 active:scale-90"
        >
          <Menu size={24} />
        </button>
        
        {/* Minimalist Brand for Navbar (Visible when sidebar is collapsed or on mobile) */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="hidden sm:block text-lg font-black text-slate-800 tracking-tighter">
            Symbo<span className="text-indigo-600">Sys</span>
          </span>
        </div>
      </div>

      {/* Center: Search Engine (The "Box") */}
      <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
        <div className="w-full group">
          <div className="relative">
            {/* Bloom Effect Layer */}
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative flex items-center">
              <Search
                className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300 group-focus-within:scale-110 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                placeholder="Search financial ecosystem..."
                className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl py-3 pl-12 pr-12 text-[13px] font-bold text-slate-600 focus:outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300 placeholder:text-slate-400/80 shadow-sm group-hover:border-slate-300/50"
              />
              {/* Shortcut Tag */}
              <div className="absolute right-4 hidden sm:flex items-center gap-1.5 pointer-events-none">
                <kbd className="h-6 flex items-center px-2 rounded-lg border border-slate-200 bg-white text-[10px] font-black text-slate-400 shadow-sm">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Intelligence & User Profile */}
      <div className="flex items-center gap-3 lg:gap-6 lg:w-auto">
        {/* Status Protocol - Hidden on Mobile */}
        <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100/50">
           <div className="flex items-center gap-2">
             <div className="relative w-2 h-2">
               <div className="absolute inset-0 bg-emerald-500 rounded-full"></div>
               <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
           </div>
           <div className="w-[1px] h-3 bg-slate-200"></div>
           <div className="flex items-center gap-2 text-indigo-600">
             <Globe size={12} className="animate-spin-slow" />
             <span className="text-[10px] font-black uppercase tracking-widest">Syncing</span>
           </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button className="group p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all duration-300 relative">
            <Bell size={20} className="group-hover:rotate-12" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hidden md:block p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
            <Settings size={20} />
          </button>
        </div>

        {/* Executive Profile */}
        <div className="flex items-center gap-3 pl-2 lg:pl-0 cursor-pointer group border-l border-slate-100 lg:ml-2">
          <div className="hidden md:flex flex-col items-end -gap-0.5">
            <span className="text-[13px] font-black text-slate-800 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
              A. Wright
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Master Admin</span>
          </div>
          
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden transition-all duration-500 group-hover:shadow-indigo-500/20 group-hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-indigo-600 transition-all group-hover:translate-y-0.5" strokeWidth={3} />
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
