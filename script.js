document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Кнопка нажата!'); 
            const surnameInput = document.querySelector('input[placeholder="Ваша фамилия"]');
            const nameInput = document.querySelector('input[placeholder="Ваше имя"]');
            const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
            const surname = surnameInput ? surnameInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            let attendance = null;
            for (let radio of attendanceRadios) {
                if (radio.checked) {
                    attendance = radio.value;
                    break;
                }
            }
            if (!surname) {
                alert('Введите фамилию!');
                return;
            }
            if (!name) {
                alert('Введите имя!');
                return;
            }
            if (!attendance) {
                alert('Выберите, придете или нет!');
                return;
            }
            alert('Отправляем данные...');
            const BOT_TOKEN = '8269733600:AAFFBq1_6J5SOtDf5Mec2O2E7ym3RGYtapw';
            const CHAT_ID = '1734991345';
            const message = `НОВЫЙ ОТВЕТ НА ПРИГЛАШЕНИЕ!
    👤 Фамилия: ${surname}
    👤 Имя: ${name}
    ✅ Статус: ${attendance === 'yes' ? 'ПРИДУ' : 'НЕ ПРИДУ'}
    🕐 Время: ${new Date().toLocaleString('ru-RU')}`
        console.log('Отправляем сообщение в Telegram...');
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            })
            .then(response => {
                console.log('Ответ от Telegram:', response);
                return response.json();
            })
            .then(data => {
                console.log('Данные от Telegram:', data);
                if (data.ok) {
                    alert('Спасибо! Ваш ответ отправлен молодоженам!');
                    if (surnameInput) surnameInput.value = '';
                    if (nameInput) nameInput.value = '';
                    attendanceRadios.forEach(radio => radio.checked = false);
                } else {
                    alert('Ошибка: ' + (data.description || 'Неизвестная ошибка'));
                }
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                alert('Не удалось отправить. Проверьте интернет и попробуйте еще раз.');
            });
        });
    } else {
        console.error('Кнопка не найдена! Проверьте id="submitBtn"');
    }
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
