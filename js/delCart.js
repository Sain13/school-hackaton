 document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.querySelector(".login-text");
    const startButton = document.getElementById("qw1");
    let cart = document.getElementById("carta");

    if (userNameElement && startButton) {
        const userNameText = userNameElement.textContent.trim(); // Получаем текст без лишних пробелов

        // Если текст отличается от "Войти", меняем текст кнопки и ссылку
        if (userNameText !== "Войти" && userNameText !== "") {
            cart.remove();
            startButton.textContent = "Личный кабинет";
            startButton.onclick = () => window.location.href = "../html/kabinet.html"; // Устанавливаем правильный обработчик
        }  
    }
});

 
