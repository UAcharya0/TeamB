// Specialty section navigation
document.querySelectorAll('.specialty-item').forEach(item => {
  item.addEventListener('click', () => {
    const specialty = item.querySelector('h3').textContent;
    window.location.href = `/doctors.html?specialty=${encodeURIComponent(specialty)}`;
  });
});

// Doctor card navigation
document.querySelectorAll('.doctor-card').forEach(card => {
  card.addEventListener('click', () => {
    const doctorName = card.querySelector('h3').textContent;
    window.location.href = `/doctor-profile.html?name=${encodeURIComponent(doctorName)}`;
  });
});

// Review interactions
document.querySelectorAll('.like-btn').forEach(button => {
  button.addEventListener('click', function () {
    this.classList.toggle('active');
    const likeCount = this.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);

    if (this.classList.contains('active')) {
      likeCount.textContent = count + 1;
    } else {
      likeCount.textContent = count - 1;
    }
  });
});

document.querySelectorAll('.comment-btn').forEach(button => {
  button.addEventListener('click', function () {
    const reviewCard = this.closest('.review-card');
    const commentsSection = reviewCard.querySelector('.comments-section');
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
  });
});

document.querySelectorAll('.post-comment').forEach(button => {
  button.addEventListener('click', function () {
    const reviewCard = this.closest('.review-card');
    const input = reviewCard.querySelector('.comment-input input');
    const commentsList = reviewCard.querySelector('.comments-list');

    if (input.value.trim() !== '') {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment-item';
      commentItem.textContent = input.value;
      commentsList.appendChild(commentItem);
      input.value = '';
    }
  });
});

// Contact form handling (if exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });
}


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


// for doctor page and after search


document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", function () {
    const specialty = this.getAttribute("data-specialty").toLowerCase();
    document.querySelectorAll(".doctor-card").forEach(card => {
      if (card.getAttribute("data-specialty").toLowerCase() === specialty) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
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


// popup msg login success and fail

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Simple validation check
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  // Mock authentication logic (replace this with your backend logic)
  if (email === "user@example.com" && password === "password123") {
    alert("Login successful! Redirecting to your dashboard...");
    setTimeout(() => {
      window.location.href = "afterlogin.html"; // Redirect after slight delay
    }, 1000); // Smooth transition with slight delay for better UX
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

// To handle search on click

document.getElementById("searchButton").addEventListener("click", function () {
  let searchValue = document.getElementById("searchInput").value;
  if (searchValue.trim() !== "") {
    alert("Searching for: " + data - specialty);
  }
});
