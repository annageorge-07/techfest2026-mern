import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MapPin, Ticket, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../services/api';

export function About() {
  return <><PageHeader title="About INSIGNIA" description="A meeting ground for curious minds, ambitious builders and the next wave of technology."/><section className="content-section two-col"><div><span className="eyebrow">OUR VISION</span><h2>Ideas deserve<br/><em>a bigger stage.</em></h2></div><div className="prose"><p>INSIGNIA 2026 is a celebration of technology, creativity and entrepreneurial thinking. It brings together students, makers and innovators to explore what is possible when imagination meets engineering.</p><p>From robotics and artificial intelligence to startup thinking, the festival is designed to encourage collaboration, experimentation and meaningful connections.</p><Link className="text-link" to="/register">Be part of it <ArrowRight size={16}/></Link></div></section><section className="stats-strip"><div><strong>03</strong><span>Days of discovery</span></div><div><strong>∞</strong><span>Ideas to explore</span></div><div><strong>01</strong><span>Community</span></div></section></>;
}

export function Schedule() {
  const [events, setEvents] = useState([]);
  useEffect(() => { api.get('/events').then(r => setEvents(r.data.events)).catch(() => setEvents([{_id:'a',title:'Robo Wars',category:'Robotics',date:'September 10',description:'Build and battle combat robots.'},{_id:'b',title:'AI Hackathon',category:'Coding',date:'September 11',description:'A neural-network challenge.'},{_id:'c',title:'Startup Pitch',category:'Business',date:'September 12',description:'Pitch your ideas.'}])); }, []);
  return <><PageHeader title="Event schedule" description="Three days packed with challenges, ideas and experiences."/><section className="content-section"><div className="schedule-list">{events.map((e,i)=><article className="schedule-item" key={e._id}><div className="schedule-day">DAY 0{i+1}<strong>{e.date}</strong></div><div className="schedule-info"><span className="event-category">{e.category}</span><h3>{e.title}</h3><p>{e.description}</p></div><Clock3 className="muted-icon"/></article>)}</div></section></>;
}

export function Tickets() {
  return <><PageHeader title="Your pass to possibility." description="Secure your place at INSIGNIA 2026."/><section className="content-section ticket-wrap"><article className="ticket-card"><Ticket size={30}/><span className="eyebrow">FESTIVAL ACCESS</span><h2>General pass</h2><p>Access to the INSIGNIA experience and listed festival activities. Event-specific participation may require separate confirmation.</p><div className="ticket-price">Registration <small>Open</small></div><Link className="button primary" to="/register">Register now <ArrowRight size={17}/></Link></article><p className="fine-print">Please check event-specific eligibility and instructions before registering.</p></section></>;
}

export function Gallery() {
  return <><PageHeader title="Moments that move us." description="A space for the people, prototypes and ideas behind the festival."/><section className="content-section gallery-grid">{['Build','Create','Collaborate','Compete','Discover','Celebrate'].map((x,i)=><div className={`gallery-tile tile-${i+1}`} key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</section></>;
}

export function Contact() {
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [status,setStatus]=useState('');
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  async function submit(e){e.preventDefault();setStatus('Sending...');try{await api.post('/contact',form);setStatus('Message sent. Thank you!');setForm({name:'',email:'',subject:'',message:''});}catch(err){setStatus(err.response?.data?.message||'Could not send message. Check the API connection.');}}
  return <><PageHeader title="Let's talk." description="Questions, ideas or collaborations? We'd love to hear from you."/><section className="content-section contact-layout"><div className="contact-note"><span className="eyebrow">GET IN TOUCH</span><h2>Start a<br/><em>conversation.</em></h2><p><MapPin size={17}/> Thiruvananthapuram, Kerala, India</p><p>Use the form and the organizing team can follow up with you.</p></div><form className="form-card" onSubmit={submit}><label>Name<input name="name" value={form.name} onChange={update} required minLength="2"/></label><label>Email<input name="email" type="email" value={form.email} onChange={update} required/></label><label>Subject<input name="subject" value={form.subject} onChange={update} required/></label><label>Message<textarea name="message" rows="5" value={form.message} onChange={update} required minLength="10"/></label><button className="button primary" type="submit">Send message <Send size={16}/></button>{status&&<p className="form-status" role="status">{status}</p>}</form></section></>;
}
