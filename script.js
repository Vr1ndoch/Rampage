document.getElementById('submitBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const surname = document.querySelector('input[placeholder="Ваша фамилия"]').value;
    const name = document.querySelector('input[placeholder="Ваше имя"]').value;
    const attendance = document.querySelector('input[name="attendance"]:checked');
    
    if (!surname || !name || !attendance) {
        alert('Заполните все поля!');
        return;
    }

    const BOT_TOKEN = '8269733600:AAFFBq1_6J5SOtDf5Mec2O2E7ym3RGYtapw'; 
    const CHAT_ID = '1734991345'; 
    
    const message = `🎉 НОВЫЙ ОТВЕТ!
    
👤 Фамилия: ${surname}
👤 Имя: ${name}
✅ Статус: ${attendance.value === 'yes' ? 'ПРИДУ' : 'НЕ ПРИДУ'}
🕐 ${new Date().toLocaleString('ru-RU')}`;
    
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
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('✅ Спасибо за ответ! Мы получили ваше подтверждение.');
            document.querySelector('input[placeholder="Ваша фамилия"]').value = '';
            document.querySelector('input[placeholder="Ваше имя"]').value = '';
            document.querySelectorAll('input[name="attendance"]').forEach(radio => radio.checked = false);
        } else {
            alert('❌ Ошибка отправки. Попробуйте еще раз.');
            console.log('Telegram error:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('❌ Ошибка отправки. Проверьте подключение к интернету.');
    });
});
