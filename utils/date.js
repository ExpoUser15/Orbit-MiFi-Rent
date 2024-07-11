const formattedDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDate;
}

const finishDate = (planTime) => {
    const currentDate = new Date();
    const dateRange = new Date(currentDate.getTime() + (planTime * 24 * 60 * 60 * 1000));

    const year = dateRange.getFullYear();
    const month = dateRange.getMonth() + 1;
    const day = dateRange.getDate();
    const hours = dateRange.getHours();
    const minutes = dateRange.getMinutes();
    const seconds = dateRange.getSeconds();

    const finishDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return finishDate;
}

function getDatesOfLastWeek() {
    let dates = [];
    let today = new Date();
    let dayOfWeek = today.getDay(); // Hari dalam seminggu (0 untuk Minggu, 1 untuk Senin, dst.)
    let diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Menghitung selisih hari ke Senin
  
    // Loop untuk mengambil tanggal dari Senin sampai Sabtu minggu lalu
    for (let i = 1; i <= 6; i++) {
      let date = new Date(today.setDate(diffToMonday - 8 + i));
      dates.push(date);
    }
  
    // Format tanggal ke dalam timestamp atau tanggal yang diinginkan
    let formattedDates = dates.map(date => formatDate2(date));
    return formattedDates;
  }
  
  // Fungsi untuk memformat tanggal ke dalam format yang diinginkan
//   function formatDate(date) {
//     let day = String(date.getDate()).padStart(2, '0');
//     let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
//     let year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

  function formatDate2(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

module.exports = { formattedDate, finishDate, formatDate2, getDatesOfLastWeek };
