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
