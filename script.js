function updateTimer() {
    const weddingDate = new Date('2026-07-11T13:00:00'); 
    const now = new Date();
    const diff = weddingDate - now;      
    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    var form = this;
    var resultDiv = document.getElementById('result-message');
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        resultDiv.style.color = 'green';
        resultDiv.textContent = 'Спасибо! Ответ записан.';
        form.reset(); 
    })
    .catch(error => {
        resultDiv.style.color = 'red';
        resultDiv.textContent = 'Ошибка. Попробуйте позже.';
    });
  });
