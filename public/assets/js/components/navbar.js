// Working on Navbar obeserver
const sectionContainer = document.getElementById('sectionContainer');

const footer = document.querySelector('footer');

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
}, { rootMargin: "-200px" }); // Opsi konfigurasi, misalnya threshold untuk menentukan seberapa banyak elemen yang terlihat

observer.observe(sectionContainer);