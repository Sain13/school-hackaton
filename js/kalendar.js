// 1. Настройка начальных значений
let currentDate = new Date(); // Текущая дата (сегодня)
let selectedDate = null; // Здесь будем хранить выбранную дату
let isMarkingMode = false; // Режим пометки дней (вкл/выкл)
let notes = JSON.parse(localStorage.getItem('notes')) || {}; // Заметки из памяти
let markedDays = JSON.parse(localStorage.getItem('markedDays')) || []; // Помеченные дни из памяти

// 2. Функция создания календаря
function generateCalendar() {
    const calendar = document.getElementById('calendar'); // Находим место для календаря
    calendar.innerHTML = ''; // Очищаем предыдущий календарь

    // 3. Добавляем названия дней недели
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // 4. Настраиваем даты для текущего месяца
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // 5. Добавляем пустые ячейки для дней прошлого месяца
    for (let i = 0; i < (firstDay.getDay() || 7) - 1; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendar.appendChild(emptyDay);
    }

    // 6. Создаем ячейки для всех дней текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day${markedDays.includes(date.toDateString()) ? ' marked' : ''}`;
        dayElement.innerHTML = `<div>${day}</div>${notes[date.toDateString()] ? `<small>${notes[date.toDateString()]}</small>` : ''}`;
        dayElement.addEventListener('click', () => handleDayClick(date));
        calendar.appendChild(dayElement);
    }

    // 7. Добавляем пустые ячейки для выравнивания сетки
    const totalCells = document.querySelectorAll('.calendar-day, .calendar-day-header').length;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remaining; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendar.appendChild(emptyDay);
    }

    // 8. Обновляем заголовок с месяцем и годом
    document.getElementById('currentDate').textContent = 
        currentDate.toLocaleDateString('ru', { month: 'long', year: 'numeric' });
}

// 9. Обработчик клика по дню
function handleDayClick(date) {
    if (date.getMonth() !== currentDate.getMonth()) return;
    
    if (isMarkingMode) {
        markedDays.push(date.toDateString());
        localStorage.setItem('markedDays', JSON.stringify(markedDays));
        generateCalendar();
        isMarkingMode = false;
    } else {
        selectedDate = date;
        document.getElementById('noteText').value = notes[date.toDateString()] || '';
        document.getElementById('noteInput').style.display = 'block';
    }
}

// 10. Переключение на предыдущий месяц
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

// 11. Переключение на следующий месяц
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

// 12. Включение режима пометки
function enableMarking() {
    isMarkingMode = true;
    alert('Выберите день для пометки');
}

// 13. Сохранение заметки и добавление пометки
function saveNote() {
    notes[selectedDate.toDateString()] = document.getElementById('noteText').value;
    localStorage.setItem('notes', JSON.stringify(notes));

    // Добавляем день в помеченные, если его еще нет
    if (!markedDays.includes(selectedDate.toDateString())) {
        markedDays.push(selectedDate.toDateString());
        localStorage.setItem('markedDays', JSON.stringify(markedDays));
    }

    closeNote();
    generateCalendar();
}

 
// 14. Удаление заметки
function deleteNote() {
    if (selectedDate && notes[selectedDate.toDateString()]) {
        delete notes[selectedDate.toDateString()]; // Удаление заметки
        localStorage.setItem('notes', JSON.stringify(notes));

        // Удаление пометки дня, если он был помечен
        const index = markedDays.indexOf(selectedDate.toDateString());
        if (index !== -1) {
            markedDays.splice(index, 1); // Удаляем день из списка помеченных
            localStorage.setItem('markedDays', JSON.stringify(markedDays));
        }

        closeNote();
        generateCalendar();
    }
}


// 15. Закрытие формы с заметкой
function closeNote() {
    document.getElementById('noteInput').style.display = 'none';
}

// 16. Запуск календаря при загрузке страницы
generateCalendar();