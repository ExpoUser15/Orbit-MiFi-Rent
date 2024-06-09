const passport = document.querySelectorAll('.lihat-passport'); 
const modalImage = document.querySelector('#modalImage');
const closeBtn = document.querySelector('#closeBtn');
const formCloseBtn = document.querySelector('#formCloseBtn');
const modal = document.querySelectorAll('dialog');
const editStatus = document.querySelectorAll('.editStatus');

passport.forEach(item => {
    item.addEventListener('click', (e) => {
        const data = e.target.dataset.passport;

        modal[1].showModal();
        modalImage.src = data;
    });
});

closeBtn.addEventListener('click', (e) => {
    modal[1].close();
});

formCloseBtn.addEventListener('click', function(e){
    modal[0].close();
})

editStatus.forEach(item => {
    item.addEventListener('click', (e) => {
        modal[0].showModal();
    })
})