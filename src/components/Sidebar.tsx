import { Search, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { ALL_SHEET_NAMES } from '../schema';

export function Sidebar({ active, onSelect }: { active: string, onSelect: (s: string) => void }) {
  const [query, setQuery] = useState("");

  const filtered = ALL_SHEET_NAMES.filter(s => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-72 h-screen bg-white border-r border-mint-100 flex flex-col">
      <div className="p-6 border-b border-mint-50 bg-mint-50/30">
        <div className="flex items-center gap-2 text-mint-800 mb-1">
          <LayoutDashboard size={20} />
          <span className="font-bold tracking-tight uppercase text-sm">USIP Admin</span>
        </div>
        <p className="text-[10px] text-mint-600 font-semibold uppercase tracking-widest">Departmental Data Portal</p>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-mint-400" size={14} />
          <input 
            type="text" 
            placeholder="Filter sections..."
            className="w-full bg-mint-50/50 border border-mint-100 rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-mint-500 outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {filtered.map(name => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs mb-1 transition-all ${
              active === name 
              ? 'bg-mint-600 text-white shadow-md font-medium' 
              : 'text-slate-600 hover:bg-mint-50 hover:text-mint-700'
            }`}
          >
            {name}
          </button>
        ))}
      </nav>
    </div>
  );
}