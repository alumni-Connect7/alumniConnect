const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const auth = require('./middleware/auth');

const app = express();

const corsOptions = {
  origin: (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map((o) => o.trim()),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/protected/ping', auth, (req, res) => {
  res.json({ success: true, message: 'Authenticated access confirmed' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentorship', mentorshipRoutes);

app.use(errorHandler);

module.exports = app;
