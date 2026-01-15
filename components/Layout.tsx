
import React from 'react';
import { View } from '../types';
import { 
  Home, 
  PlusSquare, 
  Type as FontIcon, 
  Sparkles, 
  Share2
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-slate-900 overflow-hidden relative border-x border-slate-800 shadow-2xl">
      {/* Header */}
      <header className="p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Share2 size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            BonusPost
          </h1>
        </div>
        <div className="text-[10px] font-bold text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded-full uppercase tracking-widest">
          Free Forever
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex justify-around p-3 pb-6 z-50">
        <NavButton 
          active={activeView === View.HOME} 
          onClick={() => onViewChange(View.HOME)}
          icon={<Home size={22} />}
          label="Explore"
        />
        <NavButton 
          active={activeView === View.BUILDER} 
          onClick={() => onViewChange(View.BUILDER)}
          icon={<PlusSquare size={22} />}
          label="Build"
        />
        <NavButton 
          active={activeView === View.AI} 
          onClick={() => onViewChange(View.AI)}
          icon={<Sparkles size={22} />}
          label="AI Magic"
        />
        <NavButton 
          active={activeView === View.STYLES} 
          onClick={() => onViewChange(View.STYLES)}
          icon={<FontIcon size={22} />}
          label="Fonts"
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;
