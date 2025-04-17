const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3033;

const bcrypt = require("bcryptjs");
const hashedPassword = await bcrypt.hash(password, 10); // before saving
const newUser = new User({ username, password: hashedPassword });


app.use(express.json()); // for POST requests

// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",       
    password: "",       
    database: "doctorappointments",
    socketPath: "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock"
});

// Connect to DB
db.connect(err => {
    if (err) {
        console.error("Error connecting to DB:", err);
        return;
    }
    console.log("Connected to MySQL DB ✅");

    db.query("SELECT DATABASE()", (err, result) => {
        if (!err) console.log("📌 Connected to database:", result[0]['DATABASE()']);
    });
    
    // Test query right after connection
    db.query("SELECT * FROM doctorlist", (err, results) => {
        if (err) console.error("Test query error:", err);
        //console.log("Test query results:", results);
    });
});

//Login with authentication

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user exists and password matches
    if (username === user.username && password === user.password) {
      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ message: 'Login successful', token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  // Protected route
  app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
  });
  
  // Middleware to verify token
  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
      });
    } else {
      res.sendStatus(403);
    }
  }

  


// Check doctor availability (based on time)
app.get("/doctor-availability", (req, res) => {
    const now = new Date();
    const hour = now.getHours();
    const isAvailable = hour >= 9 && hour < 18;
    res.json({
        status: isAvailable ? "Doctor is Available" : "Doctor is Unavailable"
    });
});

// Get all doctors
app.get("/doctors", (req, res) => {
    console.log("Fetching doctors..."); // Check if route is hit
    db.query("SELECT * FROM doctorlist", (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Get one doctor by ID
app.get("/doctors/:id", (req, res) => {
    const doctorId = req.params.id;
    db.query("SELECT * FROM doctorlist WHERE id = ?", [doctorId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(results[0]);
    });
});

// Book an appointment
// Book an appointment
app.post("/appointments", (req, res) => {
    const { user_id, doctor_id, appointment_time } = req.body;

    // Basic validation
    if (!user_id || !doctor_id || !appointment_time) {
        return res.status(400).json({ message: "Missing fields" });
    }

    // Step 1: Check if the doctor already has an appointment at that time
    const checkSql = `
        SELECT * FROM appointmentlist 
        WHERE doctor_id = ? AND appointment_time = ?
    `;

    db.query(checkSql, [doctor_id, appointment_time], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length > 0) {
            return res.status(409).json({ message: "Appointment slot already booked for this doctor." });
        }

        // Step 2: Insert new appointment
        const insertSql = `
            INSERT INTO appointmentlist (user_id, doctor_id, appointment_time)
            VALUES (?, ?, ?)
        `;

        db.query(insertSql, [user_id, doctor_id, appointment_time], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ message: "Appointment booked successfully", appointmentId: result.insertId });
        });
    });
});




// Get appointments for a specific user
app.get("/appointments/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT a.id, a.appointment_time, d.name AS doctor_name
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.user_id = ?
    `;
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});



// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});






/*
Doctor availability
Fetching all/specific doctors
Booking appointments
Viewing user’s appointments
Getting doctor by ID
*/
