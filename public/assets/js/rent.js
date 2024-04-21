const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.input');

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
