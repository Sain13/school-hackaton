let currentQuestionIndex = 0;
let score = 0;

// Загружаем счетчик из sessionStorage или устанавливаем 0, если его там нет
let counter = parseInt(sessionStorage.getItem("counter")) || 0;
const counterElement = document.getElementById("counter");
counterElement.textContent = counter; // Обновляем отображение счетчика

function nextQuestion() {
    const selectedAnswer = document.querySelector('.answer.selected');
    if (selectedAnswer) {
        const isCorrect = selectedAnswer.dataset.answer === 'true';
        if (isCorrect) {
            score++;
            selectedAnswer.classList.add('correct');
        } else {
            selectedAnswer.classList.add('incorrect');
        }
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResult();
            }
        }, 1000);
    }
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const answersContainer = document.querySelector('.answers');
    answersContainer.innerHTML = '';
    question.answers.forEach(answer => {
        const answerLabel = document.createElement('label');
        answerLabel.classList.add('answer');
        answerLabel.innerText = answer.text;
        answerLabel.dataset.answer = answer.correct;
        answerLabel.onclick = selectAnswer;
        answersContainer.appendChild(answerLabel);
    });
    document.querySelectorAll('.answer').forEach(answer => answer.classList.remove('selected'));
}

function selectAnswer(event) {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => answer.classList.remove('selected'));
    event.target.classList.add('selected');
}

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

function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    const resultText = document.getElementById('result-text');
    resultText.innerText = `Ваш результат: ${score} из ${questions.length}`;
    document.getElementById('result-container').classList.remove('hidden');

    localStorage.setItem('score', score);
    localStorage.setItem('lengthOfQuests', questions.length);
    localStorage.setItem('isTestFinished', 'true');

    let totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;  
    let correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;  

    totalAttempts += questions.length;  
    correctAnswers += score;

    localStorage.setItem('totalAttempts', totalAttempts);  
    localStorage.setItem('correctAnswers', correctAnswers);

    let kdRatio = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;  

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

    // ✅ Увеличиваем счетчик только если score === questions.length
    if (score === questions.length) {
        document.querySelector(".retry-btn").style.display = "none";
        document.querySelector(".exit").style.display = "none";
        document.querySelector(".save").style.display = "flex";

        counter++; // Увеличиваем счетчик
        sessionStorage.setItem("counter", counter); // Сохраняем в sessionStorage
        counterElement.textContent = counter; // Обновляем текст

        launchConfetti();
    }
}

function retryTest() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    loadQuestion();
}

loadQuestion();
