function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) menu.classList.toggle("open");
  
    const username = sessionStorage.getItem("username");
    const menuHeader = document.getElementById("menuHeader");
    if (menuHeader) menuHeader.textContent = username ? username : "Войти";
    updateLoginButton(username);
  }
  
  // Закрытие меню при клике вне его
  document.addEventListener("click", function(event) {
    const menu = document.getElementById("sideMenu");
    const button = document.getElementById("menu-button");
    const hamMenu = document.querySelector(".ham6");
  
    // Закрытие меню при клике вне меню и кнопки
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        if (hamMenu) hamMenu.classList.remove("active");
      }
    }
  });
  
  // Закрытие меню при клике на кнопку закрытия меню
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      const hamMenu = document.querySelector(".ham6");
      if (hamMenu) hamMenu.classList.remove("active");
    });

  }