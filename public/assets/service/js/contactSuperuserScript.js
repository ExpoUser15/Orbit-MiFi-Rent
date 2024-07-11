const displayFunction = (data, wrapper) => {
    wrapper.innerHTML = ' ';

    let html = '';

    let no = 1;
    for(const item of data){
        html += `
            <div class="grid grid-cols-9 text-sm mt-5 gap-2">
                <div class="flex items-center">
                    <p>${no++}</p>
                </div>
                <div class="flex items-center">
                    <p>${item.name}</p>
                </div>
                <div class="flex items-center">
                    <p>${item.phone}</p>
                </div>
                <div class="flex items-center col-span-2">
                    <p>${item.email}</p>
                </div>
                <div class="flex items-center col-span-2 overflow-auto text-wrap">
                    <p>${item.message}</p>
                </div>
                <div class="flex items-center">
                    <p>${item.createdAt}</p>
                </div>
            </div>
        `;

    }

    return html;
}

const search = (searchName, wrapper) => {
    searchName.addEventListener('keyup', () => {
        const data = { search: searchName.value };
        
        fetch(`http://localhost:7777/search/contact/1`, {
            method: "POST", // Metode HTTP
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            const display = displayFunction(data.data, wrapper);
            wrapper.insertAdjacentHTML('beforeend', display);
        })
        .catch(error => {
            console.error("Error:", error); // Menangani kesalahan
        });
        
    });
}

const finishedSearch = document.querySelector('input[name="search"]');
const wrapper = document.querySelector('.wrapper');

search(finishedSearch, wrapper);