const modem = document.querySelector('.required[name="modem"]');
const modemPrice = document.querySelector('.required[name="modemPrice"]');
const plan = document.querySelector('.required[name="plan"]');
const price = document.querySelector('.required[name="price"]');
const totalPrice = document.querySelector('.required[name="total"]');

modem.addEventListener('change', () => {
    if (modem.value === 'N1') {
        modemPrice.value = "IDR 675,000";
    } else if (modem.value === 'N2') {
        modemPrice.value = "IDR 700,000"
    }

    if (price.value !== "") {
        const modemPriceSplit = modemPrice.value.split(' ');
        const priceSplit = price.value.split(' ');
        let numberWithoutCommas = modemPriceSplit[1].replace(/,/g, '');  
        let numberWithoutCommas2 = priceSplit[1].replace(/,/g, '');  
        let numericValue = parseInt(numberWithoutCommas);
        let numericValue2 = parseInt(numberWithoutCommas2);
        const add = numericValue + numericValue2;
        const strResult = add.toLocaleString();
        totalPrice.value =  `IDR ${strResult}`;
    } else {
        totalPrice.value = modemPrice.value;
    }
});

plan.addEventListener('change', () => {
    console.log(plan.value.split('-')[0])
    if (plan.value.split('-')[0] === 'Orbit MiFi 2GB (3 Days)') {
        price.value = "IDR 20,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 6GB (3 Days)') {
        price.value = "IDR 40,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 2.5GB (7 Days)') {
        price.value = "IDR 35,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 12GB (7 Days)') {
        price.value = "IDR 75,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 18GB (30 Days)') {
        price.value = "IDR 115,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 50GB (30 Days)') {
        price.value = "IDR 240,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 85GB (30 Days)') {
        price.value = "IDR 360,000";
    } else if (plan.value.split('-')[0] === 'Orbit MiFi 120GB (30 Days)') {
        price.value = "IDR 475,000"
    }

    if (modemPrice.value !== "") {
        const modemPriceSplit = modemPrice.value.split(' ');
        const priceSplit = price.value.split(' ');
        let numberWithoutCommas = modemPriceSplit[1].replace(/,/g, '');  
        let numberWithoutCommas2 = priceSplit[1].replace(/,/g, '');  
        let numericValue = parseInt(numberWithoutCommas);
        let numericValue2 = parseInt(numberWithoutCommas2);
        const add = numericValue + numericValue2;
        const strResult = add.toLocaleString();
        totalPrice.value =  `IDR ${strResult}`;
    } else {
        totalPrice.value = modemPrice.value;
    }
});


const modemPriceSplit = modemPrice.value.split(' ');
const priceSplit = price.value.split(' ');
let numberWithoutCommas = modemPriceSplit[1].replace(/,/g, ''); 
let numberWithoutCommas2 = priceSplit[1].replace(/,/g, '');  
let numericValue = parseInt(numberWithoutCommas);
let numericValue2 = parseInt(numberWithoutCommas2);
const add = numericValue + numericValue2;
const strResult = add.toLocaleString();
totalPrice.value =  `IDR ${strResult}`;

const availableStok = () => {
    fetch('http://localhost:7777/rent/location')
    .then(res => res.json())
    .then(res => {
        const data = res.data[0];
        const destination = document.querySelector('.destination');
        
        const n1 = document.querySelector('.n1');
        const n2 = document.querySelector('.n2');
   
        let option = '';
    
        data.forEach(el => {
            option += `
                <option class="bg-[#0B0610]" value="${el.location}">${el.location}</option>
            `;
        });
        
        destination.insertAdjacentHTML('beforeend', option);

        destination.addEventListener('change', (e) => {
            data.forEach(item => {
                if(e.target.value === item.location){
                    n1.textContent = item.n1;
                    n2.textContent = item.n2;
                }
                if(e.target.value === ""){
                    n1.textContent = '0';
                    n2.textContent = '0';
                }
            })
        });
    });
}

availableStok();
