import { useEffect, useState } from 'react';
import axios from 'axios';

const initialLeadForm = { name: '', email: '', budget: '', message: '' };
const initialAuthForm = { email: '', password: '' };
const CURRENT_USER_KEY = 'leaddesk-current-user';

function App() {

  const [view, setView] = useState(() => {
    if (typeof window === 'undefined') {
      return 'landing';
    }

    const savedUser = window.localStorage.getItem(CURRENT_USER_KEY);
    return savedUser ? 'dashboard' : 'landing';
  });
  const [leadForm, setLeadForm] = useState(initialLeadForm);
  const [authForm, setAuthForm] = useState(initialAuthForm);
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const savedUser = window.localStorage.getItem(CURRENT_USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [leadMessage, setLeadMessage] = useState('');

  const fetchLeads = async () => {
    try {
      const response = await axios.get('/api/leads');
      setLeads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLeadMessage('');

    try {
      await axios.post('/api/leads', {
        name: leadForm.name.trim(),
        email: leadForm.email.trim(),
        budget: leadForm.budget.trim(),
        message: leadForm.message.trim(),
        status: 'New',
      });

      setLeadForm(initialLeadForm);
      setLeadMessage('Thanks! Your lead has been saved successfully. We will contact you shortly.');
      if (currentUser) {
        await fetchLeads();
      }
    } catch (error) {
      setLeadMessage(error.response?.data?.message || 'Unable to save your lead right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email: authForm.email.trim().toLowerCase(),
        password: authForm.password,
      });

      const user = response.data.user;
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setCurrentUser(user);
      setView('dashboard');
      setAuthForm(initialAuthForm);
      await fetchLeads();
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Invalid admin credentials.');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
    setView('landing');
    setAuthForm(initialAuthForm);
    setAuthError('');
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await axios.put(`/api/leads/${id}`, { status });
      await fetchLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const query = searchTerm.toLowerCase();
    return [lead.name, lead.email, lead.message, lead.status]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">LeadDesk Mini</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Web development leads, managed simply</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Customers submit their project details here, and admins can review and update every lead from one dashboard.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentUser ? (
                <>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">Hello, {currentUser.name}</span>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setView(view === 'login' ? 'landing' : 'login')}
                  className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                >
                  {view === 'login' ? 'Back to form' : 'Admin Login'}
                </button>
              )}
            </div>
          </div>
        </header>

        {view === 'landing' && !currentUser ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold">Request a web development service</h2>
              <p className="mt-2 text-sm text-slate-400">Tell us about your idea and we will follow up with a tailored proposal.</p>

              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                  placeholder="Name"
                  value={leadForm.name}
                  onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })}
                />
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                  placeholder="Email"
                  type="email"
                  value={leadForm.email}
                  onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })}
                />
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                  placeholder="Budget"
                  value={leadForm.budget}
                  onChange={(event) => setLeadForm({ ...leadForm, budget: event.target.value })}
                />
                <textarea
                  className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                  placeholder="Project details"
                  value={leadForm.message}
                  onChange={(event) => setLeadForm({ ...leadForm, message: event.target.value })}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit lead'}
                </button>
              </form>

              {leadMessage ? <p className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">{leadMessage}</p> : null}
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="text-xl font-semibold">What happens next?</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>• Every submission becomes a new lead inside MongoDB.</li>
                <li>• The admin can review each lead from the dashboard.</li>
                <li>• Leads can be updated from New to Contacted to Closed.</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Demo admin credentials</p>
                <p className="mt-2 font-medium text-white"> email : kishan@gmail.com / password:  kishan123</p>
              </div>
            </section>
          </div>
        ) : null}

        {view === 'login' && !currentUser ? (
          <section className="mx-auto mt-4 max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold">Admin login</h2>
            <p className="mt-2 text-sm text-slate-400">Only authorized admins can open the lead dashboard.</p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                placeholder="Email"
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
              />
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                placeholder="Password"
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
              />
              <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Sign in
              </button>
            </form>

            {authError ? <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{authError}</p> : null}
          </section>
        ) : null}

        {view === 'dashboard' && currentUser ? (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Admin dashboard</h2>
                <p className="mt-1 text-sm text-slate-400">Review new leads, search them, and update their progress.</p>
              </div>
              <div className="w-full max-w-md">
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
                  placeholder="Search leads"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-950/70">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-300">Name</th>
                    <th className="px-4 py-3 font-medium text-slate-300">Email</th>
                    <th className="px-4 py-3 font-medium text-slate-300">Budget</th>
                    <th className="px-4 py-3 font-medium text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{lead.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{lead.message}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{lead.email}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.budget || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {['New', 'Contacted', 'Closed'].map((status) => (
                            <button
                              key={status}
                              onClick={() => updateLeadStatus(lead.id, status)}
                              className={`rounded-full px-3 py-1 text-sm transition ${lead.status === status ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default App;
