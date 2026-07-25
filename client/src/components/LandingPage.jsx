function LandingPage({ onGetStarted }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">LeadDesk Mini</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Turn interest into action with a lean lead pipeline.</h2>
      <p className="mt-4 max-w-2xl text-slate-400">
        Capture inbound interest, review each lead, and move promising opportunities through your sales workflow.
      </p>
      <button
        onClick={onGetStarted}
        className="mt-6 rounded-lg bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
      >
        Start with a lead
      </button>
    </section>
  );
}

export default LandingPage;
