const dialog = document.querySelectorAll('dialog');
const tambahTestimoniBtn = document.querySelector('#tambahTestimoniBtn');
const closeBtn = document.querySelector('#closeBtn');

tambahTestimoniBtn.addEventListener('click', () => {
    dialog[0].showModal();
});

closeBtn.addEventListener('click', () => {
    dialog[0].close();
});

const divideArray = (arr) => {
    const arr2 = [];

    let start = 0;
    let end = 6;

    let divide = Math.round(arr.length / 6);

    for(var i = 0; i < divide; i++){
        const slice = arr.slice(start, end);
        arr2.push(slice);

        start = start + 6;
        end = end + 6;
    }

    return arr2;
}


const paginationList = () => {
    const lists = document.querySelectorAll('.list');

    lists.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.textContent;
    
            window.location.hash = `#${page}`;
            window.location.reload();
        })
    });
}

paginationList();

let page = window.location.hash;
page = page.split('#')[1];

const wrapper = document.querySelector('.wrapper');
console.log(wrapper.dataset);

const display = (hash) => {
    let html = ``;

    const data = JSON.parse(wrapper.dataset.json);

    const div = divideArray(data.data);

    console.log(div[hash]);

    if(!hash){
        div[0].forEach(item => {
            html += `
                <div class="grid grid-cols-12 mt-10">
                    <div class="w-16 h-16 rounded-full overflow-hidden col-span-2 border-2 border-gray-300 testi-wrapper">
                        <img src="http://localhost:7777/images/testimonials/${item.testimonial}" alt="" class="w-16 m-auto testi-pic">
                    </div>
                    <div class="col-span-10">
                        <h1 class="font-medium">${item.name}</h1>
    
                        <p class="mt-2 italic">${item.text}</p>
    
                        <div class="flex justify-between mt-5">
                            <div>
                                <a href="/superuser/testimonial/delete/${item.testimonial_id}"><i class="fa-solid fa-trash ms-2"></i></a>
                            </div>
                            <p class="text-slate-400 text-[12px] italic">${item.createdAt}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }else{
        div[hash - 1].forEach(item => {
            html += `
                <div class="grid grid-cols-12 mt-10">
                    <div class="w-16 h-16 rounded-full overflow-hidden col-span-2 border-2 border-gray-300 cursor-pointer testi-wrapper">
                        <img src="http://localhost:7777/images/testimonials/${item.testimonial}" alt="" class="w-16 m-auto testi-pic">
                    </div>
                    <div class="col-span-10">
                        <h1 class="font-medium">${item.name}</h1>
    
                        <p class="mt-2 italic">${item.text}</p>
    
                        <div class="flex justify-between mt-5">
                            <div>
                                <a href="/superuser/testimonial/delete/${item.testimonial_id}"><i class="fa-solid fa-trash ms-2"></i></a>
                            </div>
                            <p class="text-slate-400 text-[12px] italic">${item.createdAt}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    

    return html
}

wrapper.innerHTML = display(Number(page));

if (page) {
    const arr = [1, 2, 3, 4, 5];
    const index = arr.indexOf(Number(page));

    let previousPage = null;
    let currentPage = null;
    let nextPage = null;

    let active;

    if (index !== -1) {
        if (arr[index] === 1) {
            previousPage = arr[0];
            currentPage = arr[1];
            nextPage = arr[2];
            active = 'first';
        } else if (arr[index] === 3) {
            previousPage = arr[0];
            currentPage = arr[1];
            nextPage = arr[2];
            active = 'last';
        } else {
            previousPage = arr[index - 1];
            currentPage = arr[index];
            nextPage = arr[index + 1];
            active = 'mid';
        }
    }

    let html = '';
    if (previousPage !== null) {
        html += `<li class="list cursor-pointer">${previousPage}</li>`;
    }
    if (currentPage !== null) {
        html += `<li class="list cursor-pointer">${currentPage}</li>`;
    }
    if (nextPage !== null) {
        html += `<li class="list cursor-pointer">${nextPage}</li>`;
    }

    document.querySelector('.page-list').innerHTML = html;

    if(active === 'mid'){
        document.querySelectorAll('.list')[1].classList.add('text-slate-500');
    }
    if(active === 'first'){
        document.querySelectorAll('.list')[0].classList.add('text-slate-500');
    }
    if(active === 'last'){
        document.querySelectorAll('.list')[2].classList.add('text-slate-500');
    }


    paginationList();
    wrapper.innerHTML = display(Number(page));

    document.querySelectorAll('.testi-wrapper').forEach((item, index) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('dialog')[1].showModal();
            document.getElementById('modalImage').src = document.querySelectorAll('.testi-pic')[index].src;
        });
    });

    document.querySelector('#closeImageBtn').addEventListener('click', () => {
        document.querySelectorAll('dialog')[1].close();
    });
} 
