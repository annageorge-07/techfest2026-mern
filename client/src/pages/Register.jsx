import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../services/api';

const initial = { name:'', email:'', phone:'', role:'' };
export default function Register() {
  const [form,setForm]=useState(initial);
  const [status,setStatus]=useState('');
  const [error,setError]=useState(false);
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  console.log('API BASE URL:', api.defaults.baseURL);
  console.log('ACTUAL REQUEST URL:', api.getUri({ url: '/registrations' }));
  async function submit(e){
    e.preventDefault();setStatus('Submitting...');setError(false);
    try { const {data}=await api.post('/registrations',form);setStatus(data.message||'Registration successful.');setForm(initial); }
    catch(err){
      console.error('REGISTRATION ERROR:', err);
      console.error('ERROR RESPONSE:', err.response?.data);

      setError(true);

      setStatus(
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.'
      );
}  }
  return <><PageHeader title="Make it official." description="Take your place at INSIGNIA 2026. Complete the form to register."/><section className="content-section register-layout"><div className="register-aside"><span className="eyebrow">REGISTRATION / 2026</span><h2>Your next idea<br/>starts <em>here.</em></h2><p>Enter your details accurately. Your email address will be used to identify your registration.</p><div className="aside-index">INSIGNIA <span>2026</span></div></div><form className="form-card" onSubmit={submit}><label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your full name" required minLength="2" maxLength="60"/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="name@example.com" required/></label><label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} placeholder="10-digit phone number" pattern="[0-9]{10}" required/></label><label>Register as<select name="role" value={form.role} onChange={update} required><option value="">Select your role</option><option value="student">Student</option><option value="faculty">Faculty</option><option value="professional">Professional</option><option value="other">Other</option></select></label><button className="button primary" type="submit">Submit registration <ArrowRight size={17}/></button>{status&&<p className={`form-status ${error?'error':''}`} role="status">{status}</p>}</form></section></>;
}
