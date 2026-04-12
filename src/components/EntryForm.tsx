import { Field } from '../schema';

export function EntryForm({ fields, onSubmit }: { fields: Field[], onSubmit: (d: any) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData.entries()));
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-mint-100 rounded-xl p-8 shadow-sm">
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {fields.map(field => (
          <div key={field.name} className={field.name.includes('Title') ? "col-span-2" : "col-span-1"}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              required
              className="w-full bg-white border border-slate-200 rounded-md px-4 py-2 text-sm focus:border-mint-500 focus:ring-1 focus:ring-mint-500 outline-none transition-all"
              placeholder={`Enter value...`}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-slate-900 text-white px-10 py-2.5 rounded-md text-sm font-bold hover:bg-slate-800 transition-all shadow-lg">
          Add Entry
        </button>
      </div>
    </form>
  );
}