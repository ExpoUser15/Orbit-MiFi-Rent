const modalFunction = () => {
    const formEdit = document.querySelectorAll('.lihat-formEdit');  
    const addUserBtn = document.querySelector('.add-user');
    const formCloseBtn = document.querySelector('#formCloseBtn');
    const closeBtn = document.querySelector('#closeBtn');
    const modal = document.querySelectorAll('dialog');

    formEdit.forEach(item => {
        item.addEventListener('click', (e) => {
            modal[0].showModal();
            const username = document.querySelector('.username');
            username.textContent = e.target.dataset.name;
            document.querySelector('input[name="id"]').value = e.target.dataset.id;
            document.querySelector('input[name="username"]').value = e.target.dataset.name;
        })
    });

    formCloseBtn.addEventListener('click', function(e){
        modal[0].close();
    });

    addUserBtn.addEventListener('click', () => {
        modal[1].showModal();
    });

    closeBtn.addEventListener('click', function(e){
        modal[1].close();
    });
}

modalFunction();

const displayFunction = (data, wrapper) => {
    wrapper.innerHTML = ' ';

    let html = '';
    let no = 1;

    for(const item of data){
        html += `<div class="grid grid-cols-4 text-sm mt-5">
        <div class="flex items-center">
            <p>${no++}</p>
        </div>
        <div class="flex items-center">
            <p>${item.username}</p>
        </div>
        <div class="flex items-center">
            <p>${item.user_level}</p>
        </div>
        <div>
            <a class="me-4 cursor-pointer lihat-formEdit"><i data-name="${item.username}" data-id="${item.id}" class="fa-solid fa-pen-to-square"></i></a>
            <a class="cursor-pointer" href="/superuser/users/delete/${item.id}"><i class="fa-solid fa-trash"></i></a>
        </div>
    </div>`;
    }

    return html;
}


const search = (searchName, wrapper, id) => {
    searchName.addEventListener('keyup', () => {
        const data = { search: searchName.value };
        
        fetch(`http://localhost:7777/search/users/${id}`, {
            method: "POST", // Metode HTTP
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            const display = displayFunction(data.searchQuery, wrapper);
            wrapper.insertAdjacentHTML('beforeend', display);
            modalFunction();
        })
        .catch(error => {
            console.error("Error:", error); // Menangani kesalahan
        });
        
    });
}

const searchEl = document.querySelector('input[name="search"]'); 
const wrapper = document.querySelector('.wrapper');

search(searchEl, wrapper, 1);