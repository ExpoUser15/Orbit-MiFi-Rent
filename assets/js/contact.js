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
});

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

const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.required');

inputs.forEach(item => {
    item.addEventListener('focus', function(e){
        e.target.classList.add('border-blue-500');
        labels.forEach(el => {
            if(el.getAttribute('for') === item.name){
                el.classList.add('text-blue-500');
            }
        })        
    });

    item.addEventListener('blur', function(e){
        e.target.classList.remove('border-blue-500');
        labels.forEach(el => {
            if(el.getAttribute('for') === item.name){
                el.classList.remove('text-blue-500');
            }
        }) 
    });
});

const contactSubmitBtn = document.querySelector('#contactForm');

const notifParent = document.getElementById('notif');

const notification = (...value) => {
  return `<div class="flex justify-between w-full" id=${value[2]}>
              <div class="flex items-center gap-5">
                  <img src="assets/img/icon/${value[1]}" alt="" class="w-10">
                  <p class="text-yellow-800 text-sm me-5">${value[0]}</p>
              </div>
              <div class="flex items-center justify-between">
                  <div class="cursor-pointer">
                      <i class="fa fa-xmark text-2xl text-red-800" id='closeNotif'></i>
                  </div>
              </div>
          </div>`;
}

contactSubmitBtn.addEventListener('submit', function(e){
  e.preventDefault();

  const formData = new FormData();

  for(var i = 0; i < inputs.length; i++){
    if(i == 2){
      continue;
    }

    if(inputs[i].value.trim() === ""){
      inputs[i].classList.add("border-red-500");
      labels[i].classList.add("text-red-500");

      notifParent.innerHTML = notification('Red fields are required!', 'alert_10265049.png', 'warningNotif');
       notifParent.classList.remove('translate-x-[1000px]');
       notifParent.classList.remove('opacity-0');
    }

    // formData.append(inputs[i].name, inputs[i].value);
  }
});

window.addEventListener('click', function(e){
  if(e.target.id == 'closeNotif'){
    notifParent.classList.add('translate-x-[1000px]');
    notifParent.classList.add('opacity-0');
  }
})