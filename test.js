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
    let formattedDates = dates.map(date => formatDate(date));
    return formattedDates;
  }
  
  // Fungsi untuk memformat tanggal ke dalam format yang diinginkan
  function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatDate2(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  // Contoh penggunaan fungsi getDatesOfLastWeek()
  let datesOfLastWeek = getDatesOfLastWeek();
  console.log("Tanggal pada minggu lalu dari Senin sampai Sabtu:");
  datesOfLastWeek.forEach(date => {
    console.log(date);
  });
  