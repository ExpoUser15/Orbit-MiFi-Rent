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