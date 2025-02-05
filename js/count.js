// Инициализация переменных
let score = parseInt(localStorage.getItem('score')) || 0;  
let lengthOfQuests = parseInt(localStorage.getItem('lengthOfQuests')) || 0;  
let totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;  
let correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;  

// Функция для запуска конфетти
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Функция для отображения результата теста
function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    const resultText = document.getElementById('result-text');
    resultText.innerText = `Ваш результат: ${score} из ${questions.length}`;
    document.getElementById('result-container').classList.remove('hidden');

    // ✅ Сохраняем результат независимо от количества правильных ответов
    localStorage.setItem('score', score);
    localStorage.setItem('lengthOfQuests', questions.length);
    localStorage.setItem('isTestFinished', 'true');

    // Обновляем значения totalAttempts и correctAnswers в localStorage
    totalAttempts += questions.length;  
    correctAnswers += score;

    // Сохраняем обновленные значения
    localStorage.setItem('totalAttempts', totalAttempts);  
    localStorage.setItem('correctAnswers', correctAnswers);

    // Вычисляем kdRatio
    let kdRatio = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;  

    // Обновляем элементы на странице (если они есть)
    if (document.getElementById('totalAttempts')) {
        document.getElementById('totalAttempts').innerText = totalAttempts;
    }
    if (document.getElementById('correctAnswers')) {
        document.getElementById('correctAnswers').innerText = correctAnswers;
    }
    if (document.getElementById('kdRatio')) {
        document.getElementById('kdRatio').innerText = kdRatio.toFixed(2) + '%';
    }

    // Логируем в консоль для отладки
    console.log(`Total Attempts: ${totalAttempts}, Correct Answers: ${correctAnswers}, KD Ratio: ${kdRatio.toFixed(2)}%`);

    // 🎉 Запускаем конфетти, только если всё правильно
    if (score === questions.length) {
        document.querySelector(".retry-btn").style.display = "none";
        document.querySelector(".exit").style.display = "none";
        document.querySelector(".save").style.display = "flex";
        launchConfetti();
    }
}

// Функция для загрузки данных с localStorage и отображения их на страницах
function loadStatistics() {
    totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;
    correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;

    // Вычисляем и отображаем kdRatio
    let kdRatio = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;

    // Обновляем элементы на странице (если они есть)
    if (document.getElementById('totalAttempts')) {
        document.getElementById('totalAttempts').innerText = totalAttempts;
    }
    if (document.getElementById('correctAnswers')) {
        document.getElementById('correctAnswers').innerText = correctAnswers;
    }
    if (document.getElementById('kdRatio')) {
        document.getElementById('kdRatio').innerText = kdRatio.toFixed(2) + '%';
    }

    console.log(`Total Attempts: ${totalAttempts}, Correct Answers: ${correctAnswers}, KD Ratio: ${kdRatio.toFixed(2)}%`);
}

// Вызов функции загрузки статистики при загрузке страницы
document.addEventListener('DOMContentLoaded', loadStatistics);
