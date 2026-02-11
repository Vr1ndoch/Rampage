document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', function() {
        const surname = document.querySelector('input[placeholder="Ваша фамилия"]').value;
        const name = document.querySelector('input[placeholder="Ваше имя"]').value;
        const attendance = document.querySelector('input[name="attendance"]:checked');
        
        if (!surname || !name || !attendance) {
            alert('Пожалуйста, заполните все поля');
            return;
        }        
        fetch('/save_guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                surname: surname,
                name: name,
                attendance: attendance.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Спасибо за ответ!');
                document.querySelector('input[placeholder="Ваша фамилия"]').value = '';
                document.querySelector('input[placeholder="Ваше имя"]').value = '';
                document.querySelectorAll('input[name="attendance"]').forEach(radio => radio.checked = false);
            } 
            else {
                alert('Ошибка при сохранении данных');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка при отправке данных');
        });
    });
});

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

