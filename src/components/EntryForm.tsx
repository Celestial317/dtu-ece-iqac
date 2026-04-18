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
      <div className="p-8 sm:p-14 lg:p-20 text-center text-slate-300 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">
        Select a section from the sidebar to begin
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-mint-100 rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-xl shadow-mint-100/10">
      <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-400 mb-6 sm:mb-8 lg:mb-10 flex items-center gap-2">
        <Plus size={16} /> Add Entry to Local Batch
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-6 sm:gap-y-8 lg:gap-y-10">
        {fields.map((field: Field) => (
          <div key={field.name} className={field.label.toLowerCase().includes('title') || field.label.toLowerCase().includes('link') ? "md:col-span-2" : "md:col-span-1"}>
            <label className="block text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4 ml-1">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              required
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 text-sm focus:bg-white focus:border-mint-500 focus:ring-8 focus:ring-mint-500/5 outline-none transition-all text-slate-900 font-bold placeholder:text-slate-300 shadow-inner"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-stretch sm:justify-end">
        <button type="submit" className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-mint-600 text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-sm font-black hover:bg-mint-700 shadow-2xl shadow-mint-200 transition-all active:scale-95">
          Commit to Queue
        </button>
      </div>
    </form>
  );
}