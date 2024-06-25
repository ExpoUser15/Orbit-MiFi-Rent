// Working on brief explanation

const whatBtn = document.getElementById('whatBtn'),
whyBtn = document.getElementById('whyBtn'),
explanationText = document.getElementById('explanationText');

whatBtn.addEventListener('click', function(){
  whyBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  whatBtn.style.backgroundColor = 'rgba(29, 78, 216, 0.8)';

  explanationText.textContent = 'Orbit MiFi is a portable internet modem device with a battery, supported by Telkomsel 4G LTE signals along with special MiFi data packages by applying variants and package tariffs according to customer needs.'
});

whyBtn.addEventListener('click', function(){
  whatBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  whyBtn.style.backgroundColor = 'rgba(29, 78, 216, 0.8)';

  explanationText.textContent = 'Orbit MiFi provides portable internet access with features such as checking remaining data packages, purchasing additional packages, and monitoring usage statistics. Portability and built-in batteries ensure users stay connected wherever they are, without the need for an external power source.';
});

// See testimonial
const modal = document.querySelector('dialog'),
testiImg = document.getElementById('testimonialImg'),
closeSeeBtn = document.querySelector('.close-btn'),
seeBtn = document.querySelectorAll('.see');

seeBtn.forEach(item => {
  item.addEventListener('click', (e) => {
    modal.showModal();
    const dataImage = e.target.dataset.img;
    testiImg.src = `images/testimonials/${dataImage}`;
  });
});

closeSeeBtn.addEventListener('click', () => {
  modal.close();
});