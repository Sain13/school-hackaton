
let currentQuestionIndex = 0;
let score = 0;

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
  confetti.style.left = ${Math.random() * 100}%;
  confetti.style.top = ${Math.random() * 100}%;
  confetti.style.backgroundColor = hsl(${
    Math.random() * 360
  }, 100%, 50%);
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
  console.log(Score: ${score}, Questions Length: ${questions.length});
}
}

function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    const resultText = document.getElementById('result-text');
    resultText.innerText = Ваш результат: ${score} из ${questions.length};
    document.getElementById('result-container').classList.remove('hidden');

    // ✅ Сохраняем результат независимо от количества правильных ответов
    localStorage.setItem('score', score);
    localStorage.setItem('lengthOfQuests', questions.length);
    localStorage.setItem('isTestFinished', 'true');

    // Обновляем значения totalAttempts и correctAnswers в localStorage
    let totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;  
    let correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;  

    // Прибавляем количество вопросов и количество правильных ответов
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
    console.log(Total Attempts: ${totalAttempts}, Correct Answers: ${correctAnswers}, KD Ratio: ${kdRatio.toFixed(2)}%);
    let counter = 0;
    const counterElement = document.getElementById("counter");

    // 🎉 Запускаем конфетти, только если всё правильно
    if (score === questions.length) {
        document.querySelector(".retry-btn").style.display = "none";
        document.querySelector(".exit").style.display = "none";
        document.querySelector(".save").style.display = "flex";
        counter++;
        counterElement.textContent = counter;
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
