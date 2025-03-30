document.addEventListener("DOMContentLoaded", function () {
  // Get the doctor ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const doctorId = urlParams.get("id");

  // Sample doctor data (replace this with actual data from an API or database)
  const doctorsData = {
    doctor1: {
      name: "Dr. Sunita Khadka",
      experience: "10 years",
      location: "Kathmandu, Nepal",
      specialty: "Dermatologist",
      fee: "$50",
      about: "Dr. Sunita Khadka is a skilled dermatologist with over 10 years of experience in skin care.",
      image: "./images/doc1.jpeg",
    },
    doctor2: {
      name: "Dr. Sanjaya Shrestha",
      experience: "15 years",
      location: "Pokhara, Nepal",
      specialty: "Cardiologist",
      fee: "$75",
      about: "Dr. Sanjaya Shrestha is an expert in cardiovascular care, offering personalized heart health solutions.",
      image: "./images/doc2.jpeg",
    },
    // Add more doctor data here...
  };

  // Check if doctor ID exists in the doctorsData
  if (doctorId && doctorsData[doctorId]) {
    const doctor = doctorsData[doctorId];

    // Update the profile section with the doctor's data
    document.getElementById("doctor-name").innerText = doctor.name;
    document.getElementById("doctor-experience").innerText = doctor.experience;
    document.getElementById("doctor-location").innerText = doctor.location;
    document.getElementById("doctor-specialty").innerText = doctor.specialty;
    document.getElementById("doctor-fee").innerText = doctor.fee;
    document.getElementById("doctor-about").innerText = doctor.about;
    document.getElementById("doctor-image").src = doctor.image;

    // You can add more fields or features as needed
  } else {
    // Handle the case where the doctor ID is invalid or not found
    alert("Doctor not found!");
  }
});



// doctorpage

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





// doctor profile

// document.addEventListener("DOMContentLoaded", async function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const doctorId = urlParams.get("id");

//   if (!doctorId) {
//     document.querySelector(".doctor-details").innerHTML = "<h2>Doctor not found</h2>";
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`); // Adjust API URL
//     const doctor = await response.json();

//     document.getElementById("doctor-image").src = doctor.image;
//     document.getElementById("doctor-name").textContent = doctor.name;
//     document.getElementById("doctor-experience").textContent = doctor.experience;
//     document.getElementById("doctor-location").textContent = doctor.location;
//     document.getElementById("doctor-specialty").textContent = doctor.specialty;
//     document.getElementById("doctor-fee").textContent = doctor.fee;
//     document.getElementById("doctor-about").textContent = doctor.about;
//   } catch (error) {
//     console.error("Error fetching doctor details:", error);
//     document.querySelector(".doctor-details").innerHTML = "<h2>Doctor not found</h2>";
//   }
// });



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
  document.getElementById("submit-appointment").addEventListener("click", function () {
    const selectedDate = document.getElementById("booking-date").value;
    const selectedTimeSlot = document.querySelector(".time-slot.selected")?.textContent;

    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    alert(`Appointment booked for ${selectedDate} at ${selectedTimeSlot}`);
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


// updates doctor details dynamically
document.addEventListener('DOMContentLoaded', async () => {
  const doctorId = new URLSearchParams(window.location.search).get('id') || 1; // Example ID retrieval
  const apiUrl = `/api/doctor/${doctorId}`;

  try {
    const response = await fetch(apiUrl);
    const doctorData = await response.json();

    // Update profile details
    document.getElementById('doctor-name').textContent = doctorData.name;
    document.getElementById('doctor-experience').textContent = `${doctorData.experience} years`;
    document.getElementById('doctor-location').textContent = doctorData.location;
    document.getElementById('doctor-specialty').textContent = doctorData.specialty;
    document.getElementById('doctor-fee').textContent = `$${doctorData.fee}`;
    document.getElementById('doctor-about').textContent = doctorData.about;

    // Update profile image
    document.getElementById('doctor-image').src = doctorData.image || 'images/default-doctor.png';

  } catch (error) {
    console.error('Error fetching doctor data:', error);
    document.getElementById('doctor-about').textContent = "Error loading doctor details.";
  }
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

function showPastHistory() {
  const appointmentsContainer = document.getElementById('appointmentsContainer');
  // appointmentsContainer.style.display = 'none'; // Hides current appointments
  alert('Feature for viewing past history is under development.');
}



// the booking logic so that instead of just saving to localStorage, it sends data to the backend


document.getElementById("submit-appointment").addEventListener("click", async function () {
  const selectedDate = document.getElementById("booking-date").value;
  const selectedTimeSlot = document.querySelector(".time-slot.selected")?.textContent;

  if (!selectedDate || !selectedTimeSlot) {
    alert("Please select a date and time slot.");
    return;
  }

  // Get doctor and user details
  const doctorId = new URLSearchParams(window.location.search).get("id");
  const userId = localStorage.getItem("userId"); // Assuming user is logged in

  const appointmentDetails = {
    userId: userId,
    doctorId: doctorId,
    doctorName: document.getElementById("doctor-name").textContent,
    date: selectedDate,
    time: selectedTimeSlot
  };

  try {
    const response = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointmentDetails)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Appointment booked successfully!");
      window.location.href = "/my-appointments.html"; // Redirect to My Appointments page
    } else {
      alert("Booking failed: " + result.message);
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Something went wrong. Please try again.");
  }
});


// fetch only the logged-in user's booked appointments



document.addEventListener("DOMContentLoaded", async function () {
  const userId = localStorage.getItem("userId"); // Get the logged-in user ID

  if (!userId) {
    alert("Please log in to see your appointments.");
    window.location.href = "/login.html"; // Redirect to login page
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/appointments?userId=${userId}`);
    const appointments = await response.json();

    const appointmentsContainer = document.getElementById("appointments-container");
    appointmentsContainer.innerHTML = ""; // Clear previous content

    if (appointments.length === 0) {
      appointmentsContainer.innerHTML = "<p>No appointments booked yet.</p>";
      return;
    }

    appointments.forEach(appointment => {
      const appointmentDiv = document.createElement("div");
      appointmentDiv.classList.add("appointment-item");

      appointmentDiv.innerHTML = `
              <p><strong>${appointment.doctorName}</strong> - ${appointment.date} at ${appointment.time}</p>
              <button onclick="rescheduleAppointment('${appointment.doctorId}')">Reschedule</button>
          `;

      appointmentsContainer.appendChild(appointmentDiv);
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    alert("Failed to load appointments.");
  }
});

// function rescheduleAppointment(doctorId,) {
//   window.location.href = `/doctor-profile.html?id=${doctorId}`;
// }



// 1️⃣ When you book an appointment (POST request), the backend generates a unique ID for that appointment and saves it in the database.
// 2️⃣ When fetching booked appointments (GET request), the backend includes this ID in the response.
// 3️⃣ When rescheduling (PUT request), the frontend must send this appointmentId back to the backend so it knows which appointment to update.

// ✅ Now, when a user clicks "Reschedule", it sends the appointmentId in the URL.
// ✅ Doctor profile page detects this and sends a PUT request instead of POST.

function rescheduleAppointment(doctorId, appointmentId) {
  window.location.href = `/doctor-profile.html?id=${doctorId}&appointmentId=${appointmentId}`;
}

// How This Works
// ✅ If appointmentId exists in the URL → Sends PUT request to update the appointment.
// ✅ If appointmentId is missing → Sends POST request to create a new appointment.
// ✅ After success, redirects to /my-appointments.html page.



//Handles Both New Booking & Reschedule

document.getElementById("submit-appointment").addEventListener("click", async function () {
  const selectedDate = document.getElementById("booking-date").value;
  const selectedTimeSlot = document.querySelector(".time-slot.selected")?.textContent;

  if (!selectedDate || !selectedTimeSlot) {
    alert("Please select a date and time slot.");
    return;
  }

  // Get doctor and user details
  const doctorId = new URLSearchParams(window.location.search).get("id");
  const userId = localStorage.getItem("userId"); // Assuming user is logged in

  // Check if the user is rescheduling
  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get("appointmentId"); // If available, it's a reschedule

  const appointmentDetails = {
    userId: userId,
    doctorId: doctorId,
    doctorName: document.getElementById("doctor-name").textContent,
    date: selectedDate,
    time: selectedTimeSlot
  };

  try {
    let response;
    if (appointmentId) {
      // Reschedule (PUT request)
      response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentDetails)
      });
    } else {
      // New booking (POST request)
      response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentDetails)
      });
    }

    const result = await response.json();

    if (response.ok) {
      alert(appointmentId ? "Appointment rescheduled successfully!" : "Appointment booked successfully!");
      window.location.href = "/my-appointments.html"; // Redirect to My Appointments page
    } else {
      alert("Failed: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
