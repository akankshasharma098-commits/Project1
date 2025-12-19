import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [view, setView] = useState('landing'); 
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]); // New

  // Forms
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', city: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', image: '' });
  const [newClient, setNewClient] = useState({ name: '', description: '', designation: '', image: '' });
  const [emailSub, setEmailSub] = useState(''); // New

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const p = await axios.get('http://localhost:5000/api/projects'); setProjects(p.data);
      const c = await axios.get('http://localhost:5000/api/clients'); setClients(c.data);
      const m = await axios.get('http://localhost:5000/api/contact'); setMessages(m.data);
      const s = await axios.get('http://localhost:5000/api/subscribe'); setSubscribers(s.data);
    } catch (err) { console.log("Error loading data"); }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/subscribe', { email: emailSub });
    alert('Subscribed Successfully!'); setEmailSub('');
  };

  // ... (Baaki submit functions same rahenge, short mein likh raha hu)
  const handleContactSubmit = async (e) => { e.preventDefault(); await axios.post('http://localhost:5000/api/contact', form); alert('Sent!'); setForm({ fullName: '', email: '', mobile: '', city: '' }); };
  const handleAddProject = async (e) => { e.preventDefault(); await axios.post('http://localhost:5000/api/projects', newProject); alert('Project Added!'); fetchData(); setNewProject({ name: '', description: '', image: '' }); };
  const handleAddClient = async (e) => { e.preventDefault(); await axios.post('http://localhost:5000/api/clients', newClient); alert('Client Added!'); fetchData(); setNewClient({ name: '', description: '', designation: '', image: '' }); };

  return (
    <div className="App">
      <nav>
        <h3>Flipr Assignment</h3>
        <div>
          <button onClick={() => setView('landing')}>Home</button>
          <button onClick={() => setView('admin')}>Admin Panel</button>
        </div>
      </nav>

      {view === 'landing' && (
        <div>
          <header>
            <h1>Consultation, Design, & Marketing</h1>
            <p>We build your dreams with precision and passion.</p>
          </header>

          <section>
            <h2>Our Projects</h2>
            <div className="card-container">
              {projects.map((proj, i) => (
                <div key={i} className="card">
                  <img src={proj.image || 'https://via.placeholder.com/300'} alt="Project" />
                  <h3>{proj.name}</h3>
                  <p>{proj.description}</p>
                  <button className="read-more-btn">READ MORE</button>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: '#fff' }}>
            <h2>Happy Clients</h2>
            <div className="card-container">
              {clients.map((cli, i) => (
                <div key={i} className="card" style={{textAlign: 'center', padding: '20px'}}>
                  <img src={cli.image} style={{width:'80px', height:'80px', borderRadius:'50%', margin:'auto'}} alt="Client"/>
                  <p><i>"{cli.description}"</i></p>
                  <h4>{cli.name}</h4>
                  <small>{cli.designation}</small>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: '#e9ecef' }}>
            <h2>Get a Free Consultation</h2>
            <form onSubmit={handleContactSubmit}>
              <input placeholder="Full Name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
              <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input placeholder="Mobile" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} required />
              <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
              <button type="submit">Get Quick Quote</button>
            </form>
          </section>

          {/* New: Newsletter Section */}
          <section style={{ background: '#333', color: 'white', textAlign: 'center', padding: '40px' }}>
            <h2>Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubscribe} style={{ maxWidth: '400px', margin: 'auto', background: 'transparent', boxShadow: 'none' }}>
              <input placeholder="Enter your email" value={emailSub} onChange={e => setEmailSub(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: 'none' }} />
              <button type="submit" style={{ marginTop: '10px' }}>Subscribe</button>
            </form>
          </section>
        </div>
      )}

      {view === 'admin' && (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: 'auto' }}>
          
          <div style={{marginBottom: '40px', padding:'20px', border:'1px solid #ddd', borderRadius:'8px'}}>
            <h3>1. Add New Project</h3>
            <form onSubmit={handleAddProject} style={{boxShadow:'none', padding:'0'}}>
              <input placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} />
              <input placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} />
              <button type="submit">Add Project</button>
            </form>
          </div>

          <div style={{marginBottom: '40px', padding:'20px', border:'1px solid #ddd', borderRadius:'8px'}}>
            <h3>2. Add Happy Client</h3>
            <form onSubmit={handleAddClient} style={{boxShadow:'none', padding:'0'}}>
              <input placeholder="Name" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
              <input placeholder="Designation" value={newClient.designation} onChange={e => setNewClient({...newClient, designation: e.target.value})} />
              <input placeholder="Review" value={newClient.description} onChange={e => setNewClient({...newClient, description: e.target.value})} />
              <input placeholder="Image URL" value={newClient.image} onChange={e => setNewClient({...newClient, image: e.target.value})} />
              <button type="submit">Add Client</button>
            </form>
          </div>

          <div style={{display:'flex', gap:'20px'}}>
            <div style={{flex:1}}>
              <h3>Contact Messages</h3>
              <ul style={{background:'white', padding:'10px', listStyle:'none', border:'1px solid #ccc'}}>
                {messages.map((m, i) => <li key={i} style={{borderBottom:'1px solid #eee', padding:'5px'}}><b>{m.fullName}</b>: {m.mobile}</li>)}
              </ul>
            </div>
            <div style={{flex:1}}>
              <h3>Subscribers</h3>
              <ul style={{background:'white', padding:'10px', listStyle:'none', border:'1px solid #ccc'}}>
                {subscribers.map((s, i) => <li key={i} style={{borderBottom:'1px solid #eee', padding:'5px'}}>{s.email}</li>)}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;