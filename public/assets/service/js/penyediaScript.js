const closeModal = document.querySelector('#closeModal');
const editBtn = document.querySelector('#btnEdit');

editBtn.addEventListener('click', (e) => {
    modal[0].showModal();
});

closeModal.addEventListener('click', (e) => {
    modal[0].close();
});

const editStok = document.getElementById('editStok');

const closeAddModal = document.querySelector('#closeAddModal');
const tambahkanBtn = document.querySelector('#btnTambahkan');

tambahkanBtn.addEventListener('click', (e) => {
    modal[1].showModal();
});

closeAddModal.addEventListener('click', (e) => {
    modal[1].close();
});