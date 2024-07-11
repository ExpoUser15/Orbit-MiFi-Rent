const countdownMethod = (time, item, status) => {
  // Set the date we're counting down to
  const countdownEndDate = new Date(time).getTime();

  // Update the countdown every 1 second
  const countdownInterval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the countdown end date
      let distance;

      if(status === 'rented'){
        distance = countdownEndDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        item.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      } 
      
      if (distance < 0) {
          clearInterval(countdownInterval);
          item.textContent = `Time's Up`;
      }
  }, 1000);
  
}

let countdown = document.querySelectorAll('.countdown');
countdown.forEach(item => {
  let data = item.dataset.end;
  data = data.split(' ').join('T');
  countdownMethod(data, item, 'rented');
});
