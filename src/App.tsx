import React, { useState } from 'react';
import { 
  Database, Search, LayoutDashboard, Plus, Trash2, 
  Check, ChevronRight, Loader2, RefreshCw, Layers 
} from 'lucide-react';
import { SHEET_CONFIGS, ALL_SHEETS } from './schema';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfjFv-DBdDJcKLn6360U13gBgo5TE2bIlo7s6GF0nAL0WO_KAJGJWeBPQuO24XylDf/exec";

interface DataFrameRow {
  id: string;
  data: Record<string, any>;
  isSyncing: boolean;
  isSynced: boolean;
}

export default function App() {
  const [activeSheet, setActiveSheet] = useState("Detail of Patents filed,publish");
  const [searchQuery, setSearchQuery] = useState("");
  const [df, setDf] = useState<Record<string, DataFrameRow[]>>({});

  const appendToDf = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRow: DataFrameRow = {
      id: Math.random().toString(36).substring(7),
      data: Object.fromEntries(formData.entries()),
      isSyncing: false,
      isSynced: false
    };
    setDf(prev => ({ ...prev, [activeSheet]: [...(prev[activeSheet] || []), newRow] }));
    e.currentTarget.reset();
  };

  const syncRow = async (id: string) => {
    const sheetDf = df[activeSheet] || [];
    const idx = sheetDf.findIndex(r => r.id === id);
    const row = sheetDf[idx];

    setDf(prev => {
      const updated = [...prev[activeSheet]];
      updated[idx] = { ...row, isSyncing: true };
      return { ...prev, [activeSheet]: updated };
    });

    try {
      // Pandas-like .values extraction based on schema order
      const values = SHEET_CONFIGS[activeSheet].map(f => row.data[f.name]);
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ sheetName: activeSheet, data: [values] })
      });

      setTimeout(() => {
        setDf(prev => {
          const updated = [...prev[activeSheet]];
          const i = updated.findIndex(r => r.id === id);
          if (i !== -1) updated[i] = { ...row, isSyncing: false, isSynced: true };
          return { ...prev, [activeSheet]: updated };
        });
      }, 1500);
    } catch (err) {
      alert("Sync error");
      setDf(prev => {
        const updated = [...prev[activeSheet]];
        const i = updated.findIndex(r => r.id === id);
        if (i !== -1) updated[i] = { ...row, isSyncing: false };
        return { ...prev, [activeSheet]: updated };
      });
    }
  };

  const currentDf = df[activeSheet] || [];
  const schema = SHEET_CONFIGS[activeSheet] || [];
  const filteredSheets = ALL_SHEETS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-[#F9FBFA] text-slate-900 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-white border-r border-mint-200 flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-mint-100 bg-white">
          <div className="flex items-center gap-3 text-mint-700 mb-2">
            <LayoutDashboard size={24} className="bg-mint-600 p-1.5 rounded-lg text-white" />
            <span className="font-black uppercase tracking-tight text-xl">USIP Portal</span>
          </div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">Version 1.0 (B3 Anchor)</p>
        </div>

        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-xs focus:ring-4 focus:ring-mint-500/10 focus:border-mint-500 outline-none text-slate-900 font-bold"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-10 space-y-1">
          {filteredSheets.map(name => (
            <button
              key={name}
              onClick={() => setActiveSheet(name)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] transition-all group ${
                activeSheet === name ? 'bg-mint-600 text-white shadow-xl font-black translate-x-1' : 'text-slate-500 hover:bg-mint-50 hover:text-mint-700 font-bold'
              }`}
            >
              <span className="truncate uppercase tracking-tight">{name}</span>
              <ChevronRight size={14} className={activeSheet === name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#FFFFFF]">
        <header className="h-24 bg-white/80 border-b border-mint-100 px-12 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{activeSheet}</h2>
            <div className="flex items-center gap-2 mt-1 text-mint-600 font-black text-[10px] uppercase tracking-widest">
               <RefreshCw size={12} className="animate-spin" /> Row Walker Active
            </div>
          </div>
          <div className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black shadow-xl flex items-center gap-2">
            <Database size={14} /> Cloud Ready
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 space-y-12">
          
          <section className="bg-white border border-mint-100 rounded-[2.5rem] p-12 shadow-xl shadow-mint-100/10">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-2">
              <Plus size={16} /> New Record
            </h3>
            {schema.length > 0 ? (
              <form onSubmit={appendToDf} className="grid grid-cols-2 gap-x-12 gap-y-10">
                {schema.map(field => (
                  <div key={field.name} className={field.label.toLowerCase().includes('link') ? "col-span-2" : "col-span-1"}>
                    <label className="block text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4 ml-1">{field.label}</label>
                    <input
                      name={field.name} type={field.type} required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4.5 text-sm focus:bg-white focus:border-mint-500 focus:ring-8 focus:ring-mint-500/5 outline-none transition-all text-slate-900 font-bold"
                    />
                  </div>
                ))}
                <div className="col-span-2 flex justify-end mt-4">
                  <button type="submit" className="bg-mint-600 text-white px-12 py-4.5 rounded-2xl text-sm font-black shadow-2xl hover:bg-mint-700 transition-all">Append to Local Review</button>
                </div>
              </form>
            ) : <div className="p-10 text-center font-bold text-slate-300">SELECT SECTION TO START</div>}
          </section>

          <section className="pb-32">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
              <Layers size={16} /> Batch Verification
            </h3>
            {currentDf.length > 0 ? (
              <div className="bg-white border border-mint-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-mint-100/5">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white uppercase font-black">
                    <tr>
                      <th className="px-10 py-7">IDX</th>
                      {schema.map(col => <th key={col.name} className="px-10 py-7 text-slate-100">{col.label}</th>)}
                      <th className="px-10 py-7 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentDf.map((row, i) => (
                      <tr key={row.id} className={`${row.isSynced ? 'bg-mint-50/50 grayscale opacity-60' : 'hover:bg-mint-50/20'}`}>
                        <td className="px-10 py-7 font-black text-mint-600">{i + 1}</td>
                        {schema.map(col => <td key={col.name} className={`px-10 py-7 font-bold italic underline decoration-mint-200 underline-offset-4 ${row.isSynced ? 'line-through text-slate-400' : 'text-slate-900'}`}>{row.data[col.name]}</td>)}
                        <td className="px-10 py-7 flex justify-center gap-4">
                          <button onClick={() => syncRow(row.id)} disabled={row.isSynced || row.isSyncing} className={`h-11 w-11 flex items-center justify-center rounded-2xl transition-all shadow-lg ${row.isSynced ? 'bg-mint-500 text-white' : 'bg-white border-2 border-mint-500 text-mint-600 hover:bg-mint-500 hover:text-white'}`}>
                            {row.isSyncing ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
                          </button>
                          <button onClick={() => setDf(p => ({...p, [activeSheet]: p[activeSheet].filter(r => r.id !== row.id)}))} className="h-11 w-11 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <div className="h-48 border-4 border-dotted border-mint-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 font-black tracking-widest italic bg-white/50 uppercase">No Data Staged</div>}
          </section>
        </div>
      </main>
    </div>
  );
}