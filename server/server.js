import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import registrationRoutes from './routes/registrations.js';
import eventRoutes from './routes/events.js';
import taskRoutes from './routes/tasks.js';
import contactRoutes from './routes/contact.js';
import Event from './models/Event.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(x => x.trim());
app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed by CORS.'));
} }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false }));
app.use('/api/registrations', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'INSIGNIA 2026 API' }));
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: status === 400 ? err.message : 'Server error. Please try again later.' });
});

const port = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    const count = await Event.countDocuments();
    if (!count) {
      await Event.insertMany([
        { title: 'Robo Wars', category: 'Robotics', date: 'September 10, 2026', description: 'Build and battle combat robots.' },
        { title: 'AI Hackathon', category: 'Coding', date: 'September 11, 2026', description: 'A challenge for the next generation of innovators.' },
        { title: 'Startup Pitch', category: 'Business', date: 'September 12, 2026', description: 'Pitch your ideas and turn them into reality.' }
      ]);
      console.log('Default INSIGNIA events inserted.');
    }
    app.listen(port, () => console.log(`API listening on port ${port}`));
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
}

start();
