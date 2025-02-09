// появление бутылки 
const image = document.getElementById('animatedImage');
setTimeout(() => {
  image.style.display = 'block';  
}, Math.random() * (60000 - 30000) + 30000);  

 
image.addEventListener("click", function() {
  document.getElementById("modal1").style.display = "block";
  image.style.display="none"
});

document.getElementById("closeModal1").addEventListener("click", function() {
  document.getElementById("modal1").style.display = "none";
});

 
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
    if(name.length <=7){
      sessionStorage.setItem("username", name);  
      window.location.href = "../index.html";  
      alert("вам начислили 10 звездочек");
    }else{
      alert("слишком много символов");
    }
  } else {
      alert("Заполните все поля!");
  }
}

 

// При загрузке всего контента если пользователь ввел имя то он выведеться через функцию ниже
window.onload = function() {
  const username = sessionStorage.getItem("username");
  if (username) {
      updateLoginButton(username);
  }
};

//Здесь мы решаем баг при котором после нажатия на .login-text наш span исчезал
function updateLoginButton(username) {
  if (!username) {
      console.log("Передано пустое имя, обновление отменено.");
      return;  
  }

  const loginButton = document.getElementById("loginButton");
  if (loginButton) { // если такая кнопка есть и она не null and undefined
      const span = loginButton.querySelector(".login-text");
      if (span) {
          span.textContent = username;
      }  
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
