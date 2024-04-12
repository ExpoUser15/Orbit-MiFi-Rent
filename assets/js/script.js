// Working on Navbar obeserver
const briefSection = document.getElementById('briefSection');

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelector('nav').classList.add('bg-[#0B0610]');
      document.querySelector('nav').classList.add('shadow');
    }else{
      document.querySelector('nav').classList.remove('bg-[#0B0610]');
      document.querySelector('nav').classList.remove('shadow');
    }
  });
}, { rootMargin: "300px" }); // Opsi konfigurasi, misalnya threshold untuk menentukan seberapa banyak elemen yang terlihat

observer.observe(briefSection);

// Working on Sidebar

const menuBtn = document.getElementById('bars');
const sidebar = document.querySelector('aside');
const closeBtn = document.querySelector('#xmark');

window.addEventListener('click', function(e){
  if(sidebar.classList.contains('me-[0]' && e.target != menuBtn)){
    sidebar.classList.remove('me-[0]');
  }
})

menuBtn.addEventListener('click', function(e){
  e.preventDefault();

  sidebar.classList.add('me-[0]');
})
closeBtn.addEventListener('click', function(e){
  e.preventDefault();

  sidebar.classList.remove('me-[0]');
})

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
        console.log(entry.isIntersecting)
        val.forEach(item =>{
          el2.classList.add(item);
          
        })
      }else{
        val.forEach(item =>{
          el2.classList.remove(item);
        })
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

const briefPic = document.querySelector('.briefPic');
const briefExplan = document.querySelector('.briefExplan');

const briefSubSection1 = document.querySelector('.briefSubSection1');
const briefSubSection = document.querySelector('.briefSubSection');
const textBrief = document.querySelectorAll('.text');

observer.observe(briefSubSection);

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

observer.observe(productSection);

sectionsAnimation(productSection, planPic, "100px", 0.2, "translate-y-0", "opacity-100");

card.forEach(item => {
  sectionsAnimation(productSection, item, "-50px", 0.2, "translate-x-0", "opacity-100");
});

