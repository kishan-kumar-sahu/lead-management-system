function Register({ form, onChange, onSubmit, switchToLogin }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/40">
      <h3 className="text-xl font-semibold text-white">Create account</h3>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => onChange('password', e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          placeholder="Confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => onChange('confirmPassword', e.target.value)}
        />
        <button className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-400">
        Already have an account?{' '}
        <button type="button" onClick={switchToLogin} className="font-medium text-cyan-400 hover:text-cyan-300">
          Sign in
        </button>
      </p>
    </section>
  );
}

export default Register;
