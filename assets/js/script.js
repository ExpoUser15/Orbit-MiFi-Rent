// Working on brief explanation

const whatBtn = document.getElementById('whatBtn'),
whyBtn = document.getElementById('whyBtn'),
explanationText = document.getElementById('explanationText');

whatBtn.addEventListener('click', function(){
  whyBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  whatBtn.style.backgroundColor = 'rgba(29, 78, 216, 0.8)';

  explanationText.textContent = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, fugit molestias? Quam provident magni culpa autem minima aut tenetur vel odio ab dicta! Ut explicabo possimus est repudiandae? Enim, nobis? Non, quis ipsam numquam recusandae nemo fugiat impedit soluta blanditiis vel sint pariatur.';
});

whyBtn.addEventListener('click', function(){
  whatBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  whyBtn.style.backgroundColor = 'rgba(29, 78, 216, 0.8)';

  explanationText.textContent = 'Fugit molestias? Quam provident magni culpa autem minima aut tenetur vel odio ab dicta! Ut explicabo possimus est repudiandae? Enim, nobis? Non, quis ipsam numquam recusandae nemo fugiat impedit soluta blanditiis vel sint pariatur.';
});


// Working on sections observer

const sectionsAnimation = (el, el2, margin, option, ...val) => {

  const sectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        val.forEach(item =>{
          el2.classList.add(item);
        });
        observer.unobserve(entry.target);
      }
    })
  }, { threshold: option,
    rootMargin: margin
  });

  sectionsObserver.observe(el);
}

const header = document.querySelector('.headSection');
const headPic = document.querySelector('.headPic');
const headText = document.querySelector('.headText');

const briefSection = document.getElementById('briefSection');
const briefPic = document.querySelector('.briefPic');
const briefExplan = document.querySelector('.briefExplan');

const briefSubSection1 = document.querySelector('.briefSubSection1');
const briefSubSection = document.querySelector('.briefSubSection');
const textBrief = document.querySelectorAll('.text');

// observer.observe(briefSubSection);

sectionsAnimation(header, headText, "", 0.5, "translate-y-0", "opacity-100");
sectionsAnimation(header, headPic, "", 0.5, "me-0", "opacity-100");

sectionsAnimation(briefSubSection1, briefPic, "300px 0px 200px 0px", 0.5, "opacity-100");
sectionsAnimation(briefSubSection1, briefExplan, "300px 0px 500px 0px", 1,"translate-x-0", "opacity-100");

textBrief.forEach(item => {
  sectionsAnimation(briefSubSection, item, "-200px", 0, "translate-x-0", "opacity-100");
});

// Working on products section observer

const productSection = document.getElementById('productSection');
const card = document.querySelectorAll('.animation-card');
const planPic = document.querySelector('.planPic');

sectionsAnimation(productSection, planPic, "100px", 0.2, "translate-y-0", "opacity-100");

card.forEach(item => {
  sectionsAnimation(productSection, item, "-50px", 0.2, "translate-x-0", "opacity-100");
});

// Working on testimonials observer

const stepsSection = document.querySelector('#stepsSection');
const stepCards = document.querySelectorAll('.stepCards');

stepCards.forEach(item => {
  sectionsAnimation(stepsSection, item, "-50px", 0.2, "translate-y-0", "opacity-100");
})

// Working on testimonials observer

const testimonialCards = document.querySelectorAll('.testiCard');
const testimonialSection = document.querySelector('#testimonials');

const logo = document.querySelectorAll('.logo');

sectionsAnimation(testimonialSection, testimonialCards[0], "-50px", 0.2, "lg:translate-y-0", "opacity-100");
sectionsAnimation(testimonialSection, testimonialCards[1], "-50px", 0.2, "lg:translate-y-6", "opacity-100");
sectionsAnimation(testimonialSection, testimonialCards[2], "-50px", 0.2, "lg:translate-y-2", "opacity-100");

logo.forEach(item => {
  sectionsAnimation(testimonialSection, item, "-50px", 0.2, "translate-y-0", "opacity-100");
});

// Mobile testimonials slider

