const express = require('express');
const router = express.Router();
const db = require('./db');

// ✅ Book Appointment
router.post('/book', (req, res) => {
  const { user_id, doctor_id, appointment_date, appointment_time, status } = req.body;

  if (!user_id || !doctor_id || !appointment_date || !appointment_time || !status) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, doctor_id, appointment_date, appointment_time, status], (err, result) => {
    if (err) {
      console.error('🛑 Booking failed:', err); // 🔍 LOG FULL ERROR IN TERMINAL
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Appointment booked successfully', appointmentId: result.insertId });
  });
});

// ✅ Reschedule Appointment
router.post('/reschedule', (req, res) => {
  const { appointmentId, newDate, newTime } = req.body;

  if (!appointmentId || !newDate || !newTime) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const sql = `UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE id = ?`;

  db.query(sql, [newDate, newTime, appointmentId], (err) => {
    if (err) {
      console.error('🛑 Rescheduling failed:', err); // Optional: log reschedule errors too
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Appointment rescheduled' });
  });
});

// ✅ Cancel Appointment
router.post('/cancel', (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId) {
    return res.status(400).json({ success: false, message: 'Missing appointmentId' });
  }

  const sql = `DELETE FROM appointments WHERE id = ?`;

  db.query(sql, [appointmentId], (err) => {
    if (err) {
      console.error('🛑 Cancellation failed:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Appointment cancelled' });
  });
});

module.exports = router;
