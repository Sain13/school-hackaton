document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.querySelector(".login-text");
    let cart = document.getElementBuId("carta");
    
    if (userNameElement ) {
        const userNameText = userNameElement.textContent.trim(); // Получаем текст без лишних пробелов
    
        // Если текст отличается от "Войти", меняем текст кнопки и ссылку
        if (userNameText !== "Войти" && userNameText !== "") {
            cart.del();
    
 // Устанавливаем правильный обработчик
        }  
    }
    });
