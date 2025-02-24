document.addEventListener("DOMContentLoaded", function () {
  loadPartial("header", "../Layout/Header.html", function () {
    // Sau khi header được load, gán sự kiện
    initHeaderCartEvents();
    initHeaderMenuEvents();
    initHeaderDropDownMenu();
  });

  function initHeaderCartEvents() {
    const openCartBtn = document.getElementById("open-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const layoutSidebar = document.getElementById("layout-sidebar");
    const menuSidebar = document.getElementById("menu-sidebar"); // Lấy sidebar menu

    if (!openCartBtn || !cartSidebar || !closeCartBtn || !layoutSidebar) {
      console.error("Không tìm thấy phần tử cần thiết để gán sự kiện.");
      return;
    }

    openCartBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Nếu menu sidebar đang mở, đóng nó trước
      if (menuSidebar.classList.contains("active")) {
        menuSidebar.classList.remove("active");
      }

      cartSidebar.classList.toggle("active");
      layoutSidebar.classList.toggle("active");
    });

    closeCartBtn.addEventListener("click", function () {
      cartSidebar.classList.remove("active");
      layoutSidebar.classList.remove("active");
    });

    layoutSidebar.addEventListener("click", function () {
      cartSidebar.classList.remove("active");
      menuSidebar.classList.remove("active");
      layoutSidebar.classList.remove("active");
    });
  }

  function initHeaderMenuEvents() {
    const openMenuBtn = document.getElementById("open-menu");
    const menuSidebar = document.getElementById("menu-sidebar");
    const closeMenuBtn = document.getElementById("close-menu");
    const layoutSidebar = document.getElementById("layout-sidebar");
    const cartSidebar = document.getElementById("cart-sidebar"); // Lấy sidebar giỏ hàng

    if (!openMenuBtn || !menuSidebar || !closeMenuBtn || !layoutSidebar) {
      console.error("Không tìm thấy phần tử cần thiết để gán sự kiện.");
      return;
    }

    openMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Nếu giỏ hàng sidebar đang mở, đóng nó trước
      if (cartSidebar.classList.contains("active")) {
        cartSidebar.classList.remove("active");
      }

      menuSidebar.classList.toggle("active");
      layoutSidebar.classList.toggle("active");
    });

    closeMenuBtn.addEventListener("click", function () {
      menuSidebar.classList.remove("active");
      layoutSidebar.classList.remove("active");
    });

    layoutSidebar.addEventListener("click", function () {
      cartSidebar.classList.remove("active");
      menuSidebar.classList.remove("active");
      layoutSidebar.classList.remove("active");
    });
  }
  function initHeaderDropDownMenu() {
    const openAccesories = document.getElementById("open-drop-accesories");
    const dropDownAccesoires = document.getElementsByClassName(
      "dropdown-accesories"
    );
    const openPet = document.getElementById("open-drop-pet");
    const dropDownPet = document.getElementsByClassName("dropdown-pet");
    if (openAccesories) {
      openAccesories.addEventListener("click", function (e) {
        e.preventDefault();
        // Toggle class active trên li chứa dropdown
        Array.from(dropDownAccesoires).forEach(function (item) {
          item.classList.toggle("active");
        });
        if (openAccesories.style.backgroundColor === "rgb(255, 100, 100)") {
          openAccesories.style.backgroundColor = "";
        } else {
          openAccesories.style.backgroundColor = "rgb(255, 100, 100)";
        }
      });
    } else {
      console.error("Không tìm thấy phần tử mở dropdown.");
    }

    if (openPet) {
      openPet.addEventListener("click", function (e) {
        e.preventDefault();
        // Toggle class active cho tất cả các phần tử dropdown-pet
        Array.from(dropDownPet).forEach(function (item) {
          item.classList.toggle("active");
        });

        if (openPet.style.backgroundColor === "rgb(255, 100, 100)") {
          openPet.style.backgroundColor = "";
        } else {
          openPet.style.backgroundColor = "rgb(255, 100, 100)";
        }
      });
    }
  }
});
