const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.required');

inputs.forEach(item => {
  item.addEventListener('focus', function (e) {
    e.target.classList.add('border-blue-500');
    labels.forEach(el => {
      if (el.getAttribute('for') === item.name) {
        el.classList.add('text-blue-500');

        if (item.classList.contains("border-red-500") || el.classList.contains("text-red-500")) {
          item.classList.remove("border-red-500");
          el.classList.remove("text-red-500");
        }
      }
    })
  });

  item.addEventListener('blur', function (e) {
    e.target.classList.remove('border-blue-500');
    labels.forEach(el => {
      if (el.getAttribute('for') === item.name) {
        el.classList.remove('text-blue-500');
      }
    })
  });
});

const contactSubmitBtn = document.querySelector('#contactForm');

const notifParent = document.getElementById('notif');

let timeOut;

const notification = ({ msg, pic, id }, parent) => {
  const audio = document.createElement('audio');
  audio.src = 'assets/audio/cyan-message.mp3';
  audio.id = 'notifAudio';
  audio.autoplay = true;
  audio.controls = false;

  parent.innerHTML = `<div class="flex justify-between w-full" id=${id}>
                  <div class="flex items-center gap-5">
                      <img src="assets/img/icon/${pic}" alt="" class="w-10">
                      <p class="text-yellow-800 text-sm me-5">${msg}</p>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="cursor-pointer">
                          <i class="fa fa-xmark text-2xl text-red-800" id='closeNotif'></i>
                      </div>
                  </div>
              </div>`;

  parent.classList.remove('translate-x-[1000px]');
  parent.classList.remove('opacity-0');

  timeOut = setTimeout(() => {
    const displayedAudio = document.querySelectorAll('audio');

    displayedAudio.forEach(item => {
      item.remove();
    });

    parent.classList.add('translate-x-[1000px]');
    parent.classList.add('opacity-0');

  }, 10000);

  parent.classList.remove('translate-x-[1000px]');
  parent.classList.remove('opacity-0');
}

contactSubmitBtn.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData();

  for (var i = 0; i < inputs.length; i++) {
    if (i == 2) {
      continue;
    }

    if (inputs[i].value.trim() === "") {
      inputs[i].classList.add("border-red-500");
      labels[i].classList.add("text-red-500");

      clearTimeout(timeOut)
      notification({ msg: 'Marked fields required!', pic: 'alert_10265049.png', id: 'notif' }, notifParent);
    }

    // formData.append(inputs[i].name, inputs[i].value);
  }
});

window.addEventListener('click', function (e) {
  if (e.target.id == 'closeNotif') {
    notifParent.classList.add('translate-x-[1000px]');
    notifParent.classList.add('opacity-0');
    clearTimeout(timeOut);
  }

  if (e.target.classList.contains('required')) {

    e.target.classList.add('border-blue-500');
    labels.forEach(el => {
      if (el.getAttribute('for') === e.target.name) {
        console.log(e.target)
        el.classList.add('text-blue-500');
      }
    });
  }
});