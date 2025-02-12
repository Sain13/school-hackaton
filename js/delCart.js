document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.querySelector(".login-text"); // Находим элемент с текстом входа
    const cart = document.querySelector(".carta"); // Находим карту (по классу, а не по id)

    if (userNameElement && cart) {
        const userNameText = userNameElement.textContent.trim(); // Получаем текст без пробелов

        // Если пользователь вошел (текст не "Войти" и не пустой), скрываем карту
        if (userNameText !== "Войти" && userNameText !== "") {
            cart.style.display = "none"; // Скрываем элемент
        }
    }
});
