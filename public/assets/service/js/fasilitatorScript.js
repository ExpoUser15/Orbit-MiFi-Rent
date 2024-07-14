const modalFunction = () => {
    const passport = document.querySelectorAll('.lihat-passport'); 
    const modalImage = document.querySelector('#modalImage');
    const modalImage2 = document.querySelector('#modalImage2');
    const closeBtn = document.querySelector('#closeBtn');
    const modal2 = document.querySelector('dialog');

    const boardingPass = document.querySelectorAll('.lihat-boardingpass');
    const bak = document.querySelectorAll('.lihat-bak');

    passport.forEach(item => {
        item.addEventListener('click', (e) => {
            const data = e.target.dataset.passport;

            const split = data.split(' - ');

            modal2.showModal();
            modalImage.src = `images/passport/${split[0]}`;
            modalImage2.src = `images/passport/${split[1]}`;
        });
    });

    boardingPass.forEach(item => {
        item.addEventListener('click', (e) => {
            const data = e.target.dataset.boardingpass;

            if(data !== '-'){
                modal2.showModal();
                modalImage.src = `images/boardingpass/${data}`;
                modalImage2.src = '';
            }
        });
    });

    bak.forEach(item => {
        item.addEventListener('click', (e) => {
            const data = e.target.dataset.bak;

            if(data !== '-'){
                modal2.showModal();
                modalImage.src = `images/bak/${data}`;
                modalImage2.src = '';
            }
        });
    });

    closeBtn.addEventListener('click', (e) => {
        modal2.close();
    });
}

modalFunction();

const displayFunction = (data, wrapper, val) => {
    wrapper.innerHTML = ' ';

    let html = '';

    for(const item of data){
        html += `<div class="grid grid-cols-9 text-sm mt-5 gap-2">
                    <div class="flex items-center">
                        <p>${item.name}</p>
                    </div>
                    <div class="flex items-center">
                        <p>${item.destination}</p>
                    </div>
                        ${item.bak === '' && val == 'in-progress' ? (
                            `<div class="">--</div>`
                            ) : (
                            `<button class="p-2 bg-sky-400 rounded-sm text-white text-[12px] lihat-bak" data-bak="${item.bak}">Lihat Gambar</button>`
                        )}
                        <div class="flex items-center">
                            <button class="p-2 bg-sky-400 rounded-sm text-white text-[12px] lihat-passport" data-passport="${item.passport}">Lihat Gambar</button>
                        </div>
                        ${item.boarding_passport == '-' ? (
                            `<div class="">--</div>`
                        ) : (
                            `<div class="flex items-center">
                                <button class="p-2 bg-sky-400 rounded-sm text-white text-[12px] lihat-boardingpass" data-boardingpass="${item.boarding_passport}">Lihat Gambar</button>
                            </div>`
                        )}
                    <div class="flex items-center">
                        <p>${item.jenis_modem}</p>
                    </div>
                    <div class="flex items-center">
                        <p>${item.plan}</p>
                    </div>
                    <div>
                        <p class="${val == 'rented' ? 'countdown' : ''}" data-end="${val === 'rented' ? item.finishAt : ''}">${val === 'in progress' ? item.startAt : val === 'finished' ? 'Time\'s Up' : ''}</p>
                    </div>
                    <div class="flex items-center">
                        <p class="${val === 'rented' ? 'text-blue-500' : val === 'in-progress' ? 'text-yellow-500' : 'text-green-500'}">${item.status}</p>
                    </div>
                </div>`;

    }
    return html;
}

const search = (searchName, wrapper, status) => {
    searchName.addEventListener('keyup', () => {
        const data = { search: searchName.value, status };
        
        fetch(`http://localhost:7777/search/${status}`, {
            method: "POST", // Metode HTTP
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            const display = displayFunction(data.data, wrapper, status);
            wrapper.insertAdjacentHTML('beforeend', display);
            modalFunction();

            if(status === 'rented'){
                countdown = document.querySelectorAll('.countdown');
                countdown.forEach(item => {
                    let data = item.dataset.end;
                    data = data.split(' ').join('T');
                    countdownMethod(data, item, 'rented');
                });
            }
        })
        .catch(error => {
            console.error("Error:", error); // Menangani kesalahan
        });
        
    });
}

// in progress search
const inProgressSearch = document.querySelector('input[name="inProgressSearch"]');
const inProgressWrapper = document.querySelector('.in-progress');

search(inProgressSearch, inProgressWrapper, 'in-progress');

// rented search
const rentedSearch = document.querySelector('input[name="rentedSearch"]');
const rentedWrapper = document.querySelector('.rented');

search(rentedSearch, rentedWrapper, 'rented');

// finished search
const finishedSearch = document.querySelector('input[name="finishedSearch"]');
const finishedWrapper = document.querySelector('.finished');

search(finishedSearch, finishedWrapper, 'finished');