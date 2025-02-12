document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.querySelector(".login-text");
    let cart = document.getElementById("carta"); // Исправлено getElementById

    if (userNameElement) {
        const userNameText = userNameElement.textContent.trim(); // Убираем лишние пробелы

        // Если текст отличается от "Войти" и не пустой, меняем кнопку
        if (userNameText !== "Войти" && userNameText !== "") {
            if (cart) {
                cart.remove(); // Удаление элемента
            }
        }
    }
});
