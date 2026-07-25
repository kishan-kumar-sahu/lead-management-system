function LeadForm({ form, onChange, onSubmit, loading }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">Add a new lead</h3>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Full name"
          name="name"
          value={form.name}
          onChange={onChange}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Company"
          name="company"
          value={form.company}
          onChange={onChange}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
        />
        <select
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          name="status"
          value={form.status}
          onChange={onChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Won">Won</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          {loading ? 'Saving...' : 'Save lead'}
        </button>
      </form>
    </section>
  );
}

export default LeadForm;
