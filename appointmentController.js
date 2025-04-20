import appointmentModel from "../models/appointmentModel.js";

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    res.status(201).json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ Reschedule Appointment
export const rescheduleAppointment = async (req, res) => {
  const { appointmentId, slotDate, time } = req.body;
  if (!appointmentId || !slotDate || !time) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    await appointmentModel.findByIdAndUpdate(appointmentId, { slotDate, time });
    res.json({ success: true, message: 'Appointment rescheduled successfully' });
  } catch (error) {
    console.error('Reschedule error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ Cancel Appointment
export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  if (!appointmentId) {
    return res.status(400).json({ success: false, message: 'Missing appointmentId' });
  }

  try {
    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
