function AdminDashboard({ leads, onStatusChange }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Lead pipeline</h3>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{leads.length} leads</span>
      </div>
      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{lead.name}</p>
                <p className="text-sm text-slate-400">{lead.company}</p>
                <p className="text-sm text-slate-500">{lead.email}</p>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                {lead.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['New', 'Contacted', 'Qualified', 'Won'].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(lead.id, status)}
                  className={`rounded-full px-3 py-1 text-sm transition ${lead.status === status ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
