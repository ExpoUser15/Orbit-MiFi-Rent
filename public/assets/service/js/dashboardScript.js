document.querySelectorAll('.testi-wrapper').forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelector('dialog').showModal();
        document.getElementById('modalImage').src = document.querySelectorAll('.testi-pic')[index].src;
    });
});

document.querySelector('#closeImageBtn').addEventListener('click', () => {
    document.querySelector('dialog').close();
});