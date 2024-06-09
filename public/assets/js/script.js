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

// Mobile testimonials slider
const testiCard = document.querySelectorAll('.testi-card');

const sliderBtn = document.querySelectorAll('.slider-btn');

let activeCard = '1';

sliderBtn.forEach(item => {
  item.addEventListener('click', (e) => {
    const num = e.target.dataset.num;

    let sliderNum;

    sliderBtn.forEach(el => {
      if(activeCard === el.dataset.num){
        el.classList.replace('w-7', 'w-4');
        el.classList.replace('bg-blue-500', 'bg-slate-200');
        sliderNum = activeCard;
      }
    });

    testiCard.forEach(el => {
      if(sliderNum !== el.dataset.id){
        console.log(el)
        el.classList.replace('block', 'hidden');
      }else{
        el.classList.replace('hidden', 'block');
      }
    });

    item.classList.replace('w-4', 'w-7');
    item.classList.replace('bg-slate-200', 'bg-blue-500');

    activeCard = num;
  });
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
})