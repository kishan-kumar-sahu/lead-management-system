import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_URL || '/api')
});

export const getLeads = () => client.get('/leads').then((res) => res.data);
export const createLead = (payload) => client.post('/leads', payload).then((res) => res.data);
export const updateLeadStatus = (id, status) => client.put(`/leads/${id}`, { status }).then((res) => res.data);

