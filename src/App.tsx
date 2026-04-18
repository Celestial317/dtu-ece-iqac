import React, { useState } from 'react';
import { 
  Database, Search, LayoutDashboard, Plus, Trash2, 
  Check, ChevronRight, Loader2, Layers, Menu, X
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleSheetSelect = (name: string) => {
    setActiveSheet(name);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F9FBFA] text-slate-900 font-sans">
      <div className="relative flex h-full overflow-hidden">
        {isSidebarOpen && (
          <button
            className="fixed inset-0 z-30 bg-slate-900/35 backdrop-blur-[1px] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-40 h-screen w-[85%] max-w-80 transform bg-white border-r border-mint-200 flex flex-col overflow-hidden shadow-2xl transition-transform duration-300 lg:static lg:z-20 lg:w-80 lg:max-w-none lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-start justify-between gap-4 p-5 sm:p-8 border-b border-mint-100 bg-white">
            <div>
              <div className="flex items-center gap-3 text-mint-700 mb-2">
                <LayoutDashboard size={22} className="bg-mint-600 p-1.5 rounded-lg text-white" />
                <span className="font-black uppercase tracking-tight text-lg sm:text-xl">Monthly Data Portal</span>
              </div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">Version 1.0 (B3 Anchor)</p>
            </div>
            <button
              className="lg:hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-xs focus:ring-4 focus:ring-mint-500/10 focus:border-mint-500 outline-none text-slate-900 font-bold"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 pb-8 sm:pb-10 space-y-1">
            {filteredSheets.map(name => (
              <button
                key={name}
                onClick={() => handleSheetSelect(name)}
                className={`w-full flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-[10px] transition-all group ${
                  activeSheet === name ? 'bg-mint-600 text-white shadow-xl font-black translate-x-1' : 'text-slate-500 hover:bg-mint-50 hover:text-mint-700 font-bold'
                }`}
              >
                <span className="truncate uppercase tracking-tight text-left">{name}</span>
                <ChevronRight size={14} className={activeSheet === name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 h-screen flex flex-col overflow-hidden bg-white">
          <header className="sticky top-0 z-10 bg-white/95 border-b border-mint-100 px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <button
                className="lg:hidden mt-0.5 rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={18} />
              </button>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase break-words">
                  {activeSheet}
                </h2>
              </div>
            </div>
            <div className="self-start sm:self-auto bg-slate-900 text-white px-5 sm:px-6 lg:px-8 py-3 rounded-2xl text-[11px] sm:text-xs font-black shadow-xl flex items-center gap-2 whitespace-nowrap">
              <Database size={14} /> Cloud Ready
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 space-y-8 sm:space-y-9 lg:space-y-10">
            <section className="bg-white border border-mint-100 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-xl shadow-mint-100/10">
              <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-400 mb-6 sm:mb-8 lg:mb-10 flex items-center gap-2">
                <Plus size={16} /> New Record
              </h3>
              {schema.length > 0 ? (
                <form onSubmit={appendToDf} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-8 gap-y-4 sm:gap-y-5">
                  {schema.map(field => (
                    <div key={field.name} className={field.label.toLowerCase().includes('link') ? "md:col-span-2" : "md:col-span-1"}>
                      <label className="block text-sm sm:text-base font-black text-slate-800 uppercase tracking-[0.08em] mb-2 ml-0.5">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base focus:bg-white focus:border-mint-500 focus:ring-4 focus:ring-mint-500/10 outline-none transition-all text-slate-900 font-semibold"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex justify-stretch sm:justify-end mt-2 sm:mt-4">
                    <button type="submit" className="w-full sm:w-auto bg-mint-600 text-white px-6 sm:px-9 lg:px-10 py-3 rounded-xl text-base font-black shadow-2xl hover:bg-mint-700 transition-all">
                      Append to Local Review
                    </button>
                  </div>
                </form>
              ) : <div className="p-8 sm:p-10 text-center font-bold text-slate-300">SELECT SECTION TO START</div>}
            </section>

            <section className="pb-14 sm:pb-20 lg:pb-28">
              <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-400 mb-6 sm:mb-8 flex items-center gap-2">
                <Layers size={16} /> Batch Verification
              </h3>
              {currentDf.length > 0 ? (
                <div className="bg-white border border-mint-100 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-mint-100/5">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-xs">
                      <thead className="bg-slate-900 text-white uppercase font-black">
                        <tr>
                          <th className="px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7">IDX</th>
                          {schema.map(col => <th key={col.name} className="px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7 text-slate-100">{col.label}</th>)}
                          <th className="px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentDf.map((row, i) => (
                          <tr key={row.id} className={`${row.isSynced ? 'bg-mint-50/50 grayscale opacity-60' : 'hover:bg-mint-50/20'}`}>
                            <td className="px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7 font-black text-mint-600 whitespace-nowrap">{i + 1}</td>
                            {schema.map(col => (
                              <td key={col.name} className={`px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7 font-bold italic underline decoration-mint-200 underline-offset-4 max-w-[220px] break-words ${row.isSynced ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {row.data[col.name]}
                              </td>
                            ))}
                            <td className="px-5 sm:px-7 lg:px-10 py-5 sm:py-6 lg:py-7">
                              <div className="flex justify-center gap-3 sm:gap-4">
                                <button onClick={() => syncRow(row.id)} disabled={row.isSynced || row.isSyncing} className={`h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-2xl transition-all shadow-lg ${row.isSynced ? 'bg-mint-500 text-white' : 'bg-white border-2 border-mint-500 text-mint-600 hover:bg-mint-500 hover:text-white'}`}>
                                  {row.isSyncing ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
                                </button>
                                <button onClick={() => setDf(p => ({...p, [activeSheet]: p[activeSheet].filter(r => r.id !== row.id)}))} className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : <div className="h-40 sm:h-48 border-4 border-dotted border-mint-100 rounded-3xl sm:rounded-[2.5rem] flex items-center justify-center text-slate-300 font-black tracking-widest italic bg-white/50 uppercase text-center px-6">No Data Staged</div>}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}