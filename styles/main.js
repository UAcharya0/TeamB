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
