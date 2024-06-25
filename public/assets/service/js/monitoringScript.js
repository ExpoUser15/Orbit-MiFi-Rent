const modalFunction = () => {
    const passport = document.querySelectorAll('.lihat-passport'); 
    const modalImage = document.querySelector('#modalImage');
    const modalImage2 = document.querySelector('#modalImage2');
    const closeBtn = document.querySelector('#closeBtn');
    const modal2 = document.querySelector('dialog');

    const boardingPass = document.querySelectorAll('.lihat-boardingpass');

    passport.forEach(item => {
        item.addEventListener('click', (e) => {
            const data = e.target.dataset.passport;

            const split = data.split(' - ');

            modal2.showModal();
            modalImage.src = `http://localhost:7777/images/passport/${split[0]}`;
            modalImage2.src = `http://localhost:7777/images/passport/${split[1]}`;
        });
    });

    boardingPass.forEach(item => {
        item.addEventListener('click', (e) => {
            const data = e.target.dataset.boardingpass;

            if(data !== '-'){
                modal2.showModal();
                modalImage.src = `http://localhost:7777/images/boardingpass/${data}`;
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
        html += `<div class="grid grid-cols-${val === 'finished' ? '7' : '9'} text-sm mt-5 gap-2">
                    <div class="flex items-center">
                        <p>${item.name}</p>
                    </div>
                    <div class="flex items-center">
                        <p>${item.destination}</p>
                    </div>
                    ${val !== 'finished' ? (
                        `<div class="flex items-center">
                            <button class="p-2 bg-sky-400 rounded-sm text-white text-[12px] lihat-passport" data-passport="${item.passport}">Lihat Gambar</button>
                        </div>
                        ${item.boarding_passport === '-'? (
                            ` <div class="flex items-center">
                                <button class="ms-5">--</button>
                            </div>`
                        ) : (
                            `<div class="flex items-center">
                                <button class="p-2 bg-sky-400 rounded-sm text-white text-[12px] lihat-boardingpass" data-boardingpass="${item.boarding_passport}">Lihat Gambar</button>
                            </div>`
                        )}`
                    ) : (
                        ''
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
                        <p class="${val === 'rented' ? 'text-blue-500' : val === 'in progress' ? 'text-yellow-500' : 'text-green-500'}">${item.status}</p>
                    </div>
                    <div>
                        ${val === 'finished' ? (
                            `<a class="cursor-pointer delete"><i data-href="monitoring/delete/status/${item.id}" data-name="${item.name}" class="fa-solid fa-trash"></i></a>`
                        ) : (
                            `<a class="me-4 cursor-pointer update"><i data-href="monitoring/update/status/${item.status}/${item.id}"  data-name="${item.name}" class="fa-solid fa-pen-to-square"></i></a>
                            <a class="cursor-pointer delete"><i data-href="monitoring/delete/status/${item.id}" data-name="${item.name}" class="fa-solid fa-trash"></i></a>`
                        )}
                    </div>
                </div>`;
    }

    return html;
}

const actionMethod = () => {
    const update = document.querySelectorAll('.update');
    const deleteStatus = document.querySelectorAll('.delete');

    update.forEach(item => {
        item.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const href = e.target.dataset.href;
            const split = href.split('/')[3];
            console.log(split)
            let conf;

            if(split === 'Rented'){
                conf = confirm(`Apakah anda yakin ingin mengubah status penyewa ${name} ke "Finished"?`);
            }else if(split === 'In Progress'){
                conf = confirm(`Apakah anda yakin ingin mengubah status penyewa ${name} ke "Rented"?`);
            }

            if(conf){
                window.location.href = href;
            }
        });
    });

    deleteStatus.forEach(item => {
        item.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const conf = confirm(`Apakah anda yakin ingin menghapus penyewa ${name}?`);

            if(conf){
                window.location.href = e.target.dataset.href;
            }
        })
    });
}

actionMethod();

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
            actionMethod();

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

search(inProgressSearch, inProgressWrapper, 'in progress');

// rented search
const rentedSearch = document.querySelector('input[name="rentedSearch"]');
const rentedWrapper = document.querySelector('.rented');

search(rentedSearch, rentedWrapper, 'rented');

// finished search
const finishedSearch = document.querySelector('input[name="finishedSearch"]');
const finishedWrapper = document.querySelector('.finished');

search(finishedSearch, finishedWrapper, 'finished');