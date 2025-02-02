
const image = document.getElementById('animatedImage');
setTimeout(() => {
 
  image.style.display = 'block'; // Показываем картинку
}, Math.random() * (60000 - 30000) + 30000); // случайная задержка от 30 до 60 секунд

// Обработчик клика по картинке, который откроет модальное окно
image.addEventListener("click", function() {
  // Показываем модальное окно
  document.getElementById("modal1").style.display = "block";
  image.style.display="none"
});



// Закрытие модального окна
document.getElementById("closeModal1").addEventListener("click", function() {
  document.getElementById("modal1").style.display = "none";
});

// Закрытие модального окна, если кликнуть по фону
window.addEventListener("click", function(event) {
  if (event.target === document.getElementById("modal1")) {
      document.getElementById("modal1").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("username");

  if (username) {
      document.getElementById("userName").textContent = username;
      document.getElementById("menuHeader").textContent = username; // Обновляем заголовок меню
      updateLoginButton(username); // Меняем текст кнопки "Войти"
  }
});

function register() {
  const name = document.getElementById("regName").value;
  const password = document.getElementById("regPassword").value;

  if (name && password) {
      sessionStorage.setItem("username", name);
      window.location.href = "index.html"; // Перенаправляем на главную страницу
  } else {
      alert("Заполните все поля!");
  }
}

function logout() {
  sessionStorage.removeItem("username"); // Очищаем данные сессии
  window.location.href = "login.html"; // Возвращаем пользователя на страницу входа
}

// Функция обновления текста кнопки "Войти"
window.onload = function() {
  const username = sessionStorage.getItem("username");
  if (username) {
      updateLoginButton(username);
  }
};

function updateLoginButton(username) {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
      const span = loginButton.querySelector(".login-text");
      if (span) {
          span.textContent = username;
          console.log("Имя обновлено:", username); // Проверяем, сработала ли замена текста
      } else {
          console.log("Span не найден в кнопке.");
      }
  } else {
      console.log("Кнопка не найдена.");
  }
}



// Функция показа/скрытия меню
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("open");

  // Получаем имя пользователя из sessionStorage
  const username = sessionStorage.getItem("username");

  // Если пользователь залогинен, меняем заголовок и кнопку входа
  document.getElementById("menuHeader").textContent = username ? username : "Войти";
  updateLoginButton(username);
}



// Закрытие меню при клике вне него
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("sideMenu");
  const button = document.getElementById("menu-button");
  const closeBtn = document.querySelector(".close-btn");
  const hamMenu = document.querySelector(".ham6");

  // Обработчик клика для закрытия меню, если клик был не по меню и не по кнопке
  document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !button.contains(event.target)) {
          menu.classList.remove("open"); // Закрываем меню
          hamMenu.classList.remove("active");
      }
  });

  // Убираем класс active у svg при нажатии на кнопку закрытия
  if (closeBtn) {
      closeBtn.addEventListener("click", function () {
          if (hamMenu) {
              hamMenu.classList.remove("active"); // Убираем класс active у SVG
          }
      });
  }
});
 

 
let solvedTasks = parseInt(localStorage.getItem("solvedTasks")) || 0;
let completedChallenges = parseInt(localStorage.getItem("completedChallenges")) || 0;

// Функция для обновления текста на странице
function updateStatistics() {
    document.getElementById("solvedTasks").textContent = solvedTasks;
    document.getElementById("completedChallenges").textContent = completedChallenges;
}

// Функция для увеличения количества решенных и пройденных заданий
function incrementStatistics() {
 
    completedChallenges++;  // Увеличиваем количество пройденных заданий

    // Сохраняем обновленные значения в localStorage
 
    localStorage.setItem("completedChallenges", completedChallenges);

    // Обновляем статистику на странице
    updateStatistics();
}

// Обработчик для кнопки, которая завершает задание (например, кнопка "Завершить викторину")
document.getElementById("readyButton").addEventListener("click", function() {
    // Здесь вы можете добавить проверку на правильность ответов, если это необходимо
    incrementStatistics(); // Увеличиваем счетчики
});

// Инициализация статистики при загрузке страницы
updateStatistics();

 
// Слушатели событий для обновления карточек
classSelect.addEventListener('change', displayCards);
directionSelect.addEven
tListener('change', displayCards);

// Инициализация
displayCards();
const likeButton = document.getElementById('like');
const dislikeButton = document.getElementById('dislike');
const submitButton = document.getElementById('submit-feedback');
const commentBox = document.getElementById('comment-box');
const feedbackMessage = document.getElementById('feedback-message');

// Добавляем обработчики событий для кнопок 👍 и 👎
likeButton.addEventListener('click', () => {
  // Убираем активное состояние с кнопки "Не полезно"
  dislikeButton.classList.remove('active-red');
  // Подсвечиваем кнопку "Полезно"
  likeButton.classList.add('active-green');
});

dislikeButton.addEventListener('click', () => {
  // Убираем активное состояние с кнопки "Полезно"
  likeButton.classList.remove('active-green');
  // Подсвечиваем кнопку "Не полезно"
  dislikeButton.classList.add('active-red');
});

// Обработчик для кнопки "Отправить отзыв"
submitButton.addEventListener('click', () => {
  const comment = commentBox.value;

  if (comment) {
    // Показываем сообщение о добавлении отзыва
    feedbackMessage.textContent = 'Ваш комментарий добавлен!';
    feedbackMessage.style.display = 'block';

    // Очищаем поле ввода
    commentBox.value = '';
  } else {
    // Сообщение, если поле пустое
    feedbackMessage.textContent = 'Пожалуйста, напишите отзыв перед отправкой!';
    feedbackMessage.style.display = 'block';
    feedbackMessage.style.color = 'red';
  }

  // Убираем сообщение через 3 секунды
  setTimeout(() => {
    feedbackMessage.style.display = 'none';
  }, 3000);
});
