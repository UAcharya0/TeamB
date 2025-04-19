const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./appointmentRoutes');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors());

// ✅ Updated bodyParser limits to avoid "Payload Too Large" error
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Connect appointment routes
app.use('/api/appointments', appointmentRoutes);

// ✅ Connect auth routes (register/login/profile update)
app.use('/api/auth', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
