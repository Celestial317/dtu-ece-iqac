import React from 'react';
import { Plus } from 'lucide-react';
import type { Field } from '../schema';

interface EntryFormProps {
  fields: Field[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function EntryForm({ fields, onSubmit }: EntryFormProps) {
  if (fields.length === 0) {
    return (
      <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">
        Select a section from the sidebar to begin
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-mint-100 rounded-[2.5rem] p-12 shadow-xl shadow-mint-100/10">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-2">
        <Plus size={16} /> Add Entry to Local Batch
      </h3>
      <div className="grid grid-cols-2 gap-x-12 gap-y-10">
        {fields.map((field: Field) => (
          <div key={field.name} className={field.label.toLowerCase().includes('title') || field.label.toLowerCase().includes('link') ? "col-span-2" : "col-span-1"}>
            <label className="block text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4 ml-1">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              required
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4.5 text-sm focus:bg-white focus:border-mint-500 focus:ring-8 focus:ring-mint-500/5 outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 shadow-inner"
            />
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-end">
        <button type="submit" className="group flex items-center gap-3 bg-mint-600 text-white px-12 py-4.5 rounded-2xl text-sm font-black hover:bg-mint-700 shadow-2xl shadow-mint-200 transition-all active:scale-95">
          Commit to Queue
        </button>
      </div>
    </form>
  );
}