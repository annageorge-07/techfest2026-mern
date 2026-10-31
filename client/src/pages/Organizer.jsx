import { useEffect, useState } from 'react';
import { LogOut, Users, ClipboardList, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../services/api';

export default function Organizer() {
  const [token,setToken]=useState(localStorage.getItem('insignia_token'));
  const [login,setLogin]=useState({email:'',password:''});
  const [error,setError]=useState('');
  const [participants,setParticipants]=useState([]);
  const [tasks,setTasks]=useState([]);
  const [taskTitle,setTaskTitle]=useState('');
  async function load(){try{const [p,t]=await Promise.all([api.get('/registrations'),api.get('/tasks')]);setParticipants(p.data.registrations);setTasks(t.data.tasks);}catch(e){setError(e.response?.data?.message||'Could not load dashboard.');}}
  useEffect(()=>{if(token)load();},[token]);
  async function signIn(e){e.preventDefault();setError('');try{const {data}=await api.post('/auth/login',login);localStorage.setItem('insignia_token',data.token);setToken(data.token);}catch(e){setError(e.response?.data?.message||'Login failed.');}}
  function signOut(){localStorage.removeItem('insignia_token');setToken(null);setParticipants([]);setTasks([]);}
  async function addTask(e){e.preventDefault();if(!taskTitle.trim())return;try{await api.post('/tasks',{title:taskTitle});setTaskTitle('');load();}catch(e){setError(e.response?.data?.message||'Could not add task.');}}
  async function deleteTask(id){try{await api.delete(`/tasks/${id}`);load();}catch(e){setError('Could not delete task.');}}
  if(!token)return <><PageHeader title="Organizer access" description="Sign in to manage registrations and festival tasks."/><section className="content-section auth-wrap"><form className="form-card" onSubmit={signIn}><label>Email<input type="email" value={login.email} onChange={e=>setLogin({...login,email:e.target.value})} required/></label><label>Password<input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} required/></label><button className="button primary">Sign in</button>{error&&<p className="form-status error">{error}</p>}<p className="fine-print">The organizer account is created securely from the backend environment using the seed script. No default password is exposed in this frontend.</p></form></section></>;
  return <><PageHeader title="Organizer dashboard" description="A live view of registrations and your team task list."/><section className="content-section dashboard"><div className="dashboard-top"><span className="eyebrow">CONTROL ROOM</span><button className="button ghost dark" onClick={signOut}><LogOut size={16}/> Sign out</button></div>{error&&<p className="form-status error">{error}</p>}<div className="dashboard-stats"><div><Users/><strong>{participants.length}</strong><span>Registrations</span></div><div><ClipboardList/><strong>{tasks.length}</strong><span>Open tasks</span></div></div><div className="dashboard-grid"><section className="panel"><h3>Participants</h3><div className="table-scroll"><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th></tr></thead><tbody>{participants.map(p=><tr key={p._id}><td>{p.name}</td><td>{p.email}</td><td>{p.phone}</td><td>{p.role}</td></tr>)}</tbody></table>{participants.length===0&&<p className="empty">No registrations yet.</p>}</div></section><section className="panel"><h3>Team tasks</h3><form className="task-form" onSubmit={addTask}><input value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} placeholder="Add a task..." required/><button className="button primary"><Plus size={16}/></button></form><ul className="task-list">{tasks.map(t=><li key={t._id}><span>{t.title}</span><button onClick={()=>deleteTask(t._id)} aria-label="Delete task"><Trash2 size={16}/></button></li>)}</ul>{tasks.length===0&&<p className="empty">No tasks added yet.</p>}</section></div></section></>;
}
