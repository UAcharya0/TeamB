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



// for doctor page and after search


document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const doctorCards = document.querySelectorAll(".doctor-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedSpecialty = button.getAttribute("data-specialty");

      doctorCards.forEach(card => {
        const doctorSpecialty = card.getAttribute("data-specialty");
        if (doctorSpecialty === selectedSpecialty || selectedSpecialty === "All") {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
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




// To handle search on click

document.getElementById("searchButton").addEventListener("click", function () {
  let searchValue = document.getElementById("searchInput").value;
  if (searchValue.trim() !== "") {
    alert("Searching for: " + data - specialty);
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

// When a user books an appointment, store the details in the database
//  and then fetch them dynamically in the My Appointments page

