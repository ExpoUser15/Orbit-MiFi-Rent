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
  }, { threshold: 0.90 }); // Opsi konfigurasi, misalnya threshold untuk menentukan seberapa banyak elemen yang terlihat
  
  let targetElement = document.querySelector('section');
  
  observer.observe(targetElement);

  
  const menuBtn = document.getElementById('bars');
  const sidebar = document.querySelector('aside');
  const closeBtn = document.querySelector('#xmark');

  menuBtn.addEventListener('click', function(e){
    e.preventDefault();

    sidebar.classList.add('me-[0]');
  })
  closeBtn.addEventListener('click', function(e){
    e.preventDefault();

    sidebar.classList.remove('me-[0]');
  })