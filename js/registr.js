if (document.getElementById("loginButton") && document.getElementById("menuHeader")) { 
    // Запуск функции
} else {
    console.log("Элементы не найдены на этой странице");
}

// Функция для обновления текста на кнопке "Войти"
function updateLoginButton(username) {
    if (!username) {
        console.log("Передано пустое имя, обновление отменено.");
        return;  
    }
 
    
    const loginButton = document.getElementById("loginButton");
    if (loginButton) { // Если такая кнопка есть
        const span = loginButton.querySelector(".login-text");
        if (span) {
            span.textContent = username; // Меняем текст внутри span
            const btnSignin = document.getElementById("eq");
            btnSignin.style.display="none"; 
        }  
    }
}

// Функция для обновления текста в меню
function updateMenuHeader(username) {
    const menuHeader = document.getElementById("menuHeader");
    if (menuHeader) {
        menuHeader.textContent = username ? username : "Войти"; // Если имя есть, показываем его, иначе "Войти"
    }
}

 
 
// Функция для выполнения при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const username = sessionStorage.getItem("username"); // Получаем имя пользователя из sessionStorage

    if (username) {
        updateMenuHeader(username); // Обновляем заголовок меню
        updateLoginButton(username);
 // Обновляем текст кнопки "Войти"
 
    }

 
});
