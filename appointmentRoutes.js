// http://localhost:3001/api/appointments/book


const express = require('express');
const router = express.Router();
const db = require('./db');
const verifyToken = require('./authMiddleware');

console.log("✅ appointmentRoutes.js loaded");


// ✅ Book Appointment (React frontend compatible)
router.post('/book', verifyToken, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;
  const user_id = req.user.id;

  if (!doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, ?, 'Scheduled')
  `;

  db.query(sql, [user_id, doctor_id, appointment_date, appointment_time], (err, result) => {
    if (err) {
      console.error('❌ Booking error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      appointment_id: result.insertId
    });
  });
});

// ✅ Check Slot Availability
router.post('/check-slot', verifyToken, (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;

  if (!doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const sql = `
    SELECT * FROM appointments
    WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status = 'Scheduled'
  `;

  db.query(sql, [doctor_id, appointment_date, appointment_time], (err, results) => {
    if (err) {
      console.error('❌ Slot check error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: 'Slot not available' });
    }

    res.json({ success: true, message: 'Slot is available' });
  });
});

//Cancel appointment

router.post('/cancel', (req, res) => {
  const { user_id } = req.body;

  console.log("🔥 Cancel route hit");
  console.log("👤 user_id from body:", user_id);

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  // ✅ Get the most recent scheduled appointment for the user
  const sqlGetAppointment = `
    SELECT id FROM appointments 
    WHERE user_id = ? AND status = 'Scheduled'
    ORDER BY appointment_date DESC, appointment_time DESC 
    LIMIT 1
  `;

  db.query(sqlGetAppointment, [user_id], (err, result) => {
    if (err) {
      console.error('❌ Error fetching appointment:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'No scheduled appointments found' });
    }

    const appointment_id = result[0].id;

    const sqlUpdateStatus = `
      UPDATE appointments
      SET status = 'Cancelled'
      WHERE id = ? AND user_id = ?
    `;

    db.query(sqlUpdateStatus, [appointment_id, user_id], (err, result) => {
      if (err) {
        console.error('❌ Cancellation error:', err);
        return res.status(500).json({ success: false, message: 'Database error during cancel' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Appointment not found or not authorized' });
      }

      res.json({ success: true, message: 'Appointment cancelled successfully' });
    });
  });
});


module.exports = db;