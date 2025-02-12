document.addEventListener("DOMContentLoaded", () => {
  let cart = document.getElementById("carta"); 
  let userNameText = document.getElementById("userName").innerText;  // Получаем значение из нужного элемента
  if (userNameText !== "Войти" && userNameText !== "") {
    if (cart) { // Проверяем, существует ли элемент
      cart.remove(); 
    }
  }
});
