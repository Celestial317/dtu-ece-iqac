import { useState } from 'react';
import { Search, LayoutDashboard, ChevronRight } from 'lucide-react';
import { ALL_SHEETS } from '../schema';

interface SidebarProps {
  active: string;
  onSelect: (sheetName: string) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = ALL_SHEETS.filter((s: string) => 
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-80 bg-white border-r border-mint-200 flex flex-col shadow-2xl z-20">
      <div className="p-8 border-b border-mint-100 bg-white">
        <div className="flex items-center gap-3 text-mint-700 mb-2">
          <div className="bg-mint-600 p-2.5 rounded-2xl text-white shadow-lg shadow-mint-100">
            <LayoutDashboard size={22} />
          </div>
          <span className="font-black uppercase tracking-tight text-xl">USIP Portal</span>
        </div>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">DataFrame Controller</p>
      </div>

      <div className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search sheets..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:ring-4 focus:ring-mint-500/10 focus:border-mint-500 outline-none transition-all text-slate-900 font-bold"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-10 space-y-1 custom-scrollbar">
        {filtered.map((name: string) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] transition-all group ${
              active === name 
              ? 'bg-mint-600 text-white shadow-xl shadow-mint-200 font-bold translate-x-1' 
              : 'text-slate-500 hover:bg-mint-50 hover:text-mint-700 font-bold'
            }`}
          >
            <span className="truncate uppercase tracking-tight text-left">{name}</span>
            <ChevronRight size={14} className={active === name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
          </button>
        ))}
      </nav>
    </aside>
  );
}