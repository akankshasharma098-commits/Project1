// server.js - Final Backend (All Features)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- APNA SAHI LINK YAHAN PASTE KAREIN ---
// <password> mein admin123 hona chahiye
const MONGO_URL = 'mongodb+srv://admin:admin123@cluster0.xt4yjri.mongodb.net/?appName=Cluster0';

mongoose.connect('mongodb+srv://admin:admin123@cluster0.xt4yjri.mongodb.net/?appName=Cluster0')
    .then(() => console.log('✅ Database Connected Successfully!'))
    .catch(err => console.log('❌ Database Error:', err.message));

// --- SCHEMAS ---
const ProjectSchema = new mongoose.Schema({ image: String, name: String, description: String });
const Project = mongoose.model('Project', ProjectSchema);

const ClientSchema = new mongoose.Schema({ image: String, name: String, description: String, designation: String });
const Client = mongoose.model('Client', ClientSchema);

const ContactSchema = new mongoose.Schema({ fullName: String, email: String, mobile: String, city: String });
const Contact = mongoose.model('Contact', ContactSchema);

// New: Newsletter Schema
const SubscriberSchema = new mongoose.Schema({ email: String });
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// --- ROUTES ---

// Projects
app.get('/api/projects', async (req, res) => { const d = await Project.find(); res.json(d); });
app.post('/api/projects', async (req, res) => { await new Project(req.body).save(); res.json({msg:"Saved"}); });

// Clients
app.get('/api/clients', async (req, res) => { const d = await Client.find(); res.json(d); });
app.post('/api/clients', async (req, res) => { await new Client(req.body).save(); res.json({msg:"Saved"}); });

// Contact
app.get('/api/contact', async (req, res) => { const d = await Contact.find(); res.json(d); });
app.post('/api/contact', async (req, res) => { await new Contact(req.body).save(); res.json({msg:"Saved"}); });

// New: Newsletter Routes
app.get('/api/subscribe', async (req, res) => { const d = await Subscriber.find(); res.json(d); });
app.post('/api/subscribe', async (req, res) => { await new Subscriber(req.body).save(); res.json({msg:"Saved"}); });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
