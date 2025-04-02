// document.addEventListener("DOMContentLoaded", function () {
//   // Get the doctor ID from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const doctorId = urlParams.get("id");

//   // Sample doctor data (replace this with actual data from an API or database)
//   const doctorsData = {
//     doctor1: {
//       name: "Dr. Sunita Khadka",
//       experience: "10 years",
//       location: "Kathmandu, Nepal",
//       specialty: "Dermatologist",
//       fee: "$50",
//       about: "Dr. Sunita Khadka is a skilled dermatologist with over 10 years of experience in skin care.",
//       image: "./images/doc1.jpeg",
//     },
//     doctor2: {
//       name: "Dr. Sanjaya Shrestha",
//       experience: "15 years",
//       location: "Pokhara, Nepal",
//       specialty: "Cardiologist",
//       fee: "$75",
//       about: "Dr. Sanjaya Shrestha is an expert in cardiovascular care, offering personalized heart health solutions.",
//       image: "./images/doc2.jpeg",
//     },
//     // Add more doctor data here...
//   };

//   // Check if doctor ID exists in the doctorsData
//   if (doctorId && doctorsData[doctorId]) {
//     const doctor = doctorsData[doctorId];

//     // Update the profile section with the doctor's data
//     document.getElementById("doctor-name").innerText = doctor.name;
//     document.getElementById("doctor-experience").innerText = doctor.experience;
//     document.getElementById("doctor-location").innerText = doctor.location;
//     document.getElementById("doctor-specialty").innerText = doctor.specialty;
//     document.getElementById("doctor-fee").innerText = doctor.fee;
//     document.getElementById("doctor-about").innerText = doctor.about;
//     document.getElementById("doctor-image").src = doctor.image;

//     // You can add more fields or features as needed
//   } else {
//     // Handle the case where the doctor ID is invalid or not found
//     alert("Doctor not found!");
//   }
// });




// How This Works
// 1️⃣ Extracts id from the URL (e.g., doctor-profile.html?id=1).
// 2️⃣ Sends a request to your backend (/api/doctors/:id) to get doctor data.
// 3️⃣ Updates the profile page dynamically with the received data.


// For example, Backend API Response (JSON):


// {
//   "id": 1,
//   "name": "Dr. John Doe",
//   "experience": 10,
//   "location": "New York",
//   "specialty": "Cardiologist",
//   "fee": 50,
//   "about": "Experienced in heart surgeries and patient care.",
//   "image": "https://your-backend.com/images/doc1.jpg"
// }



// after click doctor redirect to doctor's particular profile

// Extract doctor ID from URL
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");

// Check if doctorId exists, otherwise redirect to the doctors page
if (!doctorId) {
  alert("Invalid doctor profile!");
  window.location.href = "doctors.html";
}

// Function to fetch doctor details
async function fetchDoctorDetails() {
  try {
    const response = await fetch(`https://your-backend.com/api/doctors/${doctorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor details");
    }
    const doctor = await response.json();

    // Populate profile page with fetched data
    document.getElementById("doctor-image").src = doctor.image;
    document.getElementById("doctor-name").textContent = doctor.name;
    document.getElementById("doctor-experience").textContent = doctor.experience + " years";
    document.getElementById("doctor-location").textContent = doctor.location;
    document.getElementById("doctor-specialty").textContent = doctor.specialty;
    document.getElementById("doctor-fee").textContent = "$" + doctor.fee;
    document.getElementById("doctor-about").textContent = doctor.about;

  } catch (error) {
    console.error(error);

    document.getElementById("doctor-name").textContent = "Doctor not found";
    document.getElementById("doctor-about").textContent = "We couldn't fetch doctor details at the moment.";
  }
}

// Call function on page load
fetchDoctorDetails();




// doctor profile page booking slots part


// Your current doctor-profile.js already handles:
// ✅ Date Selection (Flatpickr Calendar)
// ✅ Time Slot Selection
// ✅ Modal Opening & Closing
// ✅ Basic Booking Confirmation (Alerts User)
// ✅Sending appointment details to the backend (so the booking is actually saved).



document.addEventListener("DOMContentLoaded", function () {
  // Initialize Flatpickr (Calendar)
  flatpickr("#booking-date", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today"
  });

  // Handle booking confirmation
  document.getElementById("confirm-booking").addEventListener("click", function () {
    let selectedDate = document.getElementById("booking-date").value;
    if (selectedDate) {
      alert("Appointment booked for: " + selectedDate);
    } else {
      alert("Please select a date first!");
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Initialize Flatpickr for date selection
  flatpickr("#booking-date", {
    enableTime: false,
    dateFormat: "Y-m-d",
  });

  // Time slots
  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM",
    "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM",
    "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM",
    "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  const timeSlotsContainer = document.querySelector(".time-slots");

  // Generate time slots dynamically
  timeSlots.forEach(time => {
    const slot = document.createElement("div");
    slot.classList.add("time-slot");
    slot.textContent = time;

    slot.addEventListener("click", function () {
      // Remove selected class from previously selected slot
      document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));

      // Add selected class to clicked slot
      slot.classList.add("selected");
    });

    timeSlotsContainer.appendChild(slot);
  });


  // Submit button click event

  document.getElementById("submit-appointment").addEventListener("click", async function () {
    const selectedDate = document.getElementById("booking-date").value;
    const selectedTimeSlot = document.querySelector(".time-slot.selected")?.textContent;

    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get("id"); // Get doctor ID from URL
    const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage after login

    if (!userId) {
      alert("Please log in to book an appointment.");
      return;
    }

    // Constant location for all doctors
    const doctorLocation = "Naxal, Kathmandu";

    const doctorName = document.getElementById("doctor-name").textContent;
    const doctorSpecialty = document.getElementById("doctor-specialty").textContent;

    const appointmentData = {
      userId: userId,
      doctorId: doctorId,
      doctorName: doctorName,
      specialty: doctorSpecialty,
      date: selectedDate,
      time: selectedTimeSlot,
      location: doctorLocation, // Adding location here
    };

    try {
      const response = await fetch("https://your-backend.com/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Appointment Confirmed!");
        window.location.href = "appointments.html"; // Redirect to My Appointments page
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });

});


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("booking-modal");
  const openBtn = document.getElementById("open-booking");
  const closeBtn = document.getElementById("close-booking");

  // Open modal
  openBtn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});





// Dropdown Functionality

function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown when clicking outside
window.addEventListener('click', function (event) {
  const dropdownMenu = document.getElementById('dropdownMenu');
  const userIcon = document.querySelector('.user-icon');

  if (!userIcon.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});





// for myappointment page

window.onload = function () {
  document.getElementById('appointmentsContainer').style.display = 'block';
};

function toggleAppointments() {
  const appointmentsContainer = document.getElementById('appointmentsContainer');
  appointmentsContainer.style.display = 'block'; // Ensures it shows again after clicking 'Past History'
}


// Ensure Users Can Only See Their Past History


async function showPastHistory() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please log in to view your past history.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`https://your-backend.com/api/get-appointments?userId=${userId}`);
    const appointments = await response.json();

    if (!response.ok) {
      console.error("Error fetching appointments:", appointments.message);
      alert("Failed to load past history.");
      return;
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Filter past appointments (where date is earlier than today)
    const pastAppointments = appointments.filter(appointment => appointment.date < today);

    // Display filtered past appointments
    displayAppointments(pastAppointments);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
}

// Fetch and Display Only Logged-in User's Appointments in users myappointments page

//  example for backend

// [
//   {
//       "id": "123",
//       "doctorId": "456",
//       "doctorName": "Dr. John Doe",
//       "specialty": "Cardiologist",
//       "location": "Naxal, Kathmandu",
//       "date": "2024-07-25",
//       "time": "8:30 PM"
//   }
// ]

document.addEventListener("DOMContentLoaded", async function () {
  const userId = localStorage.getItem("userId"); // Get logged-in user ID

  if (!userId) {
    alert("Please log in to view your appointments.");
    window.location.href = "login.html"; // Redirect to login if not logged in
    return;
  }

  try {
    // Just replace "https://your-backend.com/api/get-appointments" with your actual backend URL
    const response = await fetch(`https://your-backend.com/api/get-appointments?userId=${userId}`);
    const appointments = await response.json();

    if (response.ok) {
      displayAppointments(appointments);
    } else {
      console.error("Error fetching appointments:", appointments.message);
      alert("Failed to load appointments.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});

function displayAppointments(appointments) {
  const appointmentsContainer = document.getElementById("appointmentsContainer");
  appointmentsContainer.innerHTML = ""; // Clear existing appointments

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  appointments.forEach(appointment => {
    const appointmentCard = document.createElement("div");
    appointmentCard.classList.add("appointment-card");

    appointmentCard.innerHTML = `
          <img src="./images/doctor.jpg" alt="Doctor Picture" class="doctor-image">
          <div class="doctor_details">
              <h3>${appointment.doctorName}</h3>
              <p class="specialty">${appointment.specialty}</p>
              <p class="address"><b>Address:</b> ${appointment.location}</p>
              <p class="date-time"><b>Date & Time:</b> ${appointment.date} | ${appointment.time}</p>
          </div>
          <div class="appointment-actions">
              <button class="btn reschedule-btn" onclick="rescheduleAppointment('${appointment.doctorId}')">Reschedule Appointment</button>
              <button class="btn cancel-btn" onclick="cancelAppointment('${appointment.id}')">Cancel Appointment</button>
          </div>
      `;

    appointmentsContainer.appendChild(appointmentCard);
  });
}

// Redirect to doctor profile for rescheduling
function rescheduleAppointment(doctorId, appointmentId) {
  window.location.href = `doctor-profile.html?doctorId=${doctorId}&appointmentId=${appointmentId}`;
}


// Load Existing Appointment Details (If Rescheduling)

// ✅ This function fetches the existing appointment details and fills in the date & time fields.

async function loadExistingAppointmentDetails(appointmentId) {
  try {
    const response = await fetch(`https://your-backend.com/api/get-appointment?appointmentId=${appointmentId}`);
    const appointment = await response.json();

    if (response.ok) {
      document.getElementById("appointment-date").value = appointment.date;
      document.getElementById("appointment-time").value = appointment.time;
    } else {
      console.error("Failed to fetch appointment details:", appointment.message);
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
  }
}

// Send Updated Appointment Data to Backend
// When the user submits the reschedule form, we update the existing appointment instead of creating a new one.


document.getElementById("booking-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const date = document.getElementById("appointment-date").value;
  const time = document.getElementById("appointment-time").value;

  const { doctorId, appointmentId } = getQueryParams();

  const requestBody = { doctorId, date, time };

  const url = appointmentId
    ? `https://your-backend.com/api/reschedule-appointment`
    : `https://your-backend.com/api/book-appointment`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...requestBody, appointmentId }), // Include appointmentId only if rescheduling
    });

    const result = await response.json();
    if (response.ok) {
      alert(appointmentId ? "Appointment rescheduled!" : "Appointment booked!");
      window.location.href = "appointments.html"; // Redirect to My Appointments page
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
});




// Cancel appointment
async function cancelAppointment(appointmentId) {
  if (!confirm("Are you sure you want to cancel this appointment?")) return;

  try {
    const response = await fetch(`https://your-backend.com/api/cancel-appointment/${appointmentId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Appointment cancelled successfully.");
      window.location.reload(); // Refresh the page to update appointments
    } else {
      const result = await response.json();
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
}

