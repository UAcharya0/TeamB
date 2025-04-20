// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const appointmentRoutes = require('./appointmentRoutes'); // <-- Appointment APIs
// const authRoutes = require('./authRoutes'); // <-- Auth APIs (register/login/profile)
// const db = require('./db'); // <-- Make sure DB is initialized

// const app = express();
// app.use(cors());

// // ✅ Handle JSON body size
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// // ✅ Routes
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/auth', authRoutes);

// // ✅ Server
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//   // Optional DB check:
//   db.connect(err => {
//     if (err) {
//       console.error('❌ Database connection failed:', err);
//     } else {
//       console.log('✅ Connected to database');
//     }
//   });
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./appointmentRoutes');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
