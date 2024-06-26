document.querySelectorAll('.testi-wrapper').forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelectorAll('dialog')[0].showModal();
        document.getElementById('modalImage').src = document.querySelectorAll('.testi-pic')[index].src;
    });
});

document.querySelector('#closeImageBtn').addEventListener('click', () => {
    document.querySelectorAll('dialog')[0].close();
});

document.querySelector('.add').addEventListener('click', () => {
    document.querySelectorAll('dialog')[1].showModal();
});

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelectorAll('dialog')[1].close();
});