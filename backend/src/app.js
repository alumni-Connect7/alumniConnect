const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const eventRoutes = require('./routes/eventRoutes');
const jobRoutes = require('./routes/jobRoutes');
const profileRoutes = require('./routes/profileRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
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
app.use('/api/events', eventRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/stories', successStoryRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;
