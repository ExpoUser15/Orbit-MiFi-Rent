const socket = io();

const closeModal = document.querySelector('#closeModal');
const editBtn = document.querySelector('#btnEdit');

editBtn.addEventListener('click', (e) => {
    modal[0].showModal();
});

closeModal.addEventListener('click', (e) => {
    modal[0].close();
});

const editStok = document.getElementById('editStok');

const modem = document.querySelector('select[name="modem"]');
const editJumlah = document.querySelector('input[name="editJumlah"]');

editStok.addEventListener('click', (e) => {
    modal[0].close();
    socket.emit('stokAction', { actionType: 'update', modem: modem.value, jumlah: editJumlah.value });
    editJumlah.value = '';
});

socket.on('status', (data) => {
    if(data.msg){
        alert(data.msg);
    }

    if(data.jumlahModem){
        const getJumlah = data.jumlahModem.jumlah;
        const getModem = data.jumlahModem.modem;

        document.getElementById(getModem === 'N1' ? 'n1' : 'n2').value = getJumlah;
    }
});

const closeAddModal = document.querySelector('#closeAddModal');
const tambahkanBtn = document.querySelector('#btnTambahkan');

const tambahkanStok = document.getElementById('tambahkanStok');

const modemAdd = document.querySelector('select[name="modemTambahkan"]');
const tambahkanJumlah = document.querySelector('input[name="tambahJumlah"]');

tambahkanBtn.addEventListener('click', (e) => {
    modal[1].showModal();
});

closeAddModal.addEventListener('click', (e) => {
    modal[1].close();
});

tambahkanStok.addEventListener('click', () => {
    modal[1].close();

    socket.emit('stokAction', { actionType: 'add', modem: modemAdd.value, jumlah: tambahkanJumlah.value });
    tambahkanJumlah.value = '';
})

const jumlahPesanan = document.getElementById('jumlahPesanan');

const customSocket = io('/penyedia');

customSocket.on('jumlahPesanan', (data) => {
    jumlahPesanan.value = data.countData;
});