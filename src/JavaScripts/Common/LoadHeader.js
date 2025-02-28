document.addEventListener("DOMContentLoaded", function () {
  // ✅ Tải header từ tệp HTML và gán sự kiện sau khi tải xong
  loadPartial("header", "../Layout/Header.html", function () {
    // Gán sự kiện sau khi header được tải xong
    initHeaderCartEvents(); // Xử lý sự kiện giỏ hàng
    initHeaderMenuEvents(); // Xử lý sự kiện menu
    initHeaderDropDownMenu(); // Xử lý menu dropdown
    console.log("✅ Header đã được load xong, gán sự kiện tìm kiếm...");
    initSearchEvents(); // Gán sự kiện tìm kiếm
    setTimeout(initSearchEvents, 500); // Chạy lại sau 0.5s để đảm bảo DOM đã tải xong
    initCategoryNavigation(); // Gán sự kiện cho danh mục sản phẩm
    setTimeout(initCategoryNavigation, 500); // Đảm bảo các phần tử đã sẵn sàng
  });

  // ✅ Xử lý sự kiện mở và đóng giỏ hàng
  function initHeaderCartEvents() {
    const openCartBtn = document.getElementById("open-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCartBtn = document.getElementById("close-cart");
    const layoutSidebar = document.getElementById("layout-sidebar");
    const menuSidebar = document.getElementById("menu-sidebar"); // Sidebar menu

    if (!openCartBtn || !cartSidebar || !closeCartBtn || !layoutSidebar) {
      console.error("Không tìm thấy phần tử cần thiết để gán sự kiện.");
      return;
    }

    openCartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Nếu menu đang mở thì đóng trước
      if (menuSidebar.classList.contains("active")) {
        menuSidebar.classList.remove("active");
      }
      // Mở hoặc đóng giỏ hàng
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

  // ✅ Xử lý sự kiện mở và đóng menu
  function initHeaderMenuEvents() {
    const openMenuBtn = document.getElementById("open-menu");
    const menuSidebar = document.getElementById("menu-sidebar");
    const closeMenuBtn = document.getElementById("close-menu");
    const layoutSidebar = document.getElementById("layout-sidebar");
    const cartSidebar = document.getElementById("cart-sidebar"); // Sidebar giỏ hàng

    if (!openMenuBtn || !menuSidebar || !closeMenuBtn || !layoutSidebar) {
      console.error("Không tìm thấy phần tử cần thiết để gán sự kiện.");
      return;
    }

    openMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Nếu giỏ hàng đang mở thì đóng trước
      if (cartSidebar.classList.contains("active")) {
        cartSidebar.classList.remove("active");
      }
      // Mở hoặc đóng menu
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

  // ✅ Xử lý menu thả xuống (dropdown)
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
        // Hiển thị/ẩn dropdown phụ kiện
        Array.from(dropDownAccesoires).forEach((item) =>
          item.classList.toggle("active")
        );
        openAccesories.style.backgroundColor =
          openAccesories.style.backgroundColor === "rgb(255, 100, 100)"
            ? ""
            : "rgb(255, 100, 100)";
      });
    } else {
      console.error("Không tìm thấy phần tử mở dropdown.");
    }

    if (openPet) {
      openPet.addEventListener("click", function (e) {
        e.preventDefault();
        // Hiển thị/ẩn dropdown thú cưng
        Array.from(dropDownPet).forEach((item) =>
          item.classList.toggle("active")
        );
        openPet.style.backgroundColor =
          openPet.style.backgroundColor === "rgb(255, 100, 100)"
            ? ""
            : "rgb(255, 100, 100)";
      });
    }
  }

  // ✅ Xử lý sự kiện tìm kiếm
  function initSearchEvents() {
    console.log("🔍 Đang khởi chạy sự kiện tìm kiếm...");

    // Lấy phần tử tìm kiếm từ header và sidebar
    const searchInputHeader = document.getElementById("searchInputHeader");
    const searchButtonHeader = document.getElementById("searchButtonHeader");
    const searchInputSidebar = document.getElementById("searchInputSidebar");
    const searchButtonSidebar = document.getElementById("searchButtonSidebar");

    if (!searchInputHeader || !searchButtonHeader) {
      console.warn("⚠️ Không tìm thấy phần tử tìm kiếm trên header!");
      return;
    }

    function handleSearch(inputElement) {
      if (!inputElement) {
        console.error("⚠️ Không tìm thấy ô nhập liệu tìm kiếm!");
        return;
      }

      const query = inputElement.value.trim();
      if (query) {
        console.log(`🔎 Đang tìm kiếm với từ khóa: ${query}`);
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      } else {
        console.warn("⚠️ Người dùng nhập rỗng. Hiển thị sản phẩm ngẫu nhiên.");
        window.location.href = `search.html`;
      }
    }

    function addSearchEvent(searchInput, searchButton) {
      if (searchInput && searchButton) {
        searchButton.addEventListener("click", () => handleSearch(searchInput));
        searchInput.addEventListener("keypress", (event) => {
          if (event.key === "Enter") handleSearch(searchInput);
        });
        console.log("✅ Sự kiện tìm kiếm đã được gán!");
      } else {
        console.warn("⚠️ Không tìm thấy phần tử tìm kiếm.");
      }
    }

    // ✅ Gán sự kiện tìm kiếm cho Header & Sidebar
    addSearchEvent(searchInputHeader, searchButtonHeader);
    addSearchEvent(searchInputSidebar, searchButtonSidebar);
  }

  // ✅ Xử lý sự kiện chuyển trang khi chọn danh mục sản phẩm
  function initCategoryNavigation() {
    document.querySelectorAll(".header-menu-list a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const category = this.getAttribute("data-category");
        if (!category) return;

        let newProducts = [];

        if (category === "all-pet") {
          newProducts = [...dogProducts, ...catProducts];
        } else if (category === "all-accessories") {
          newProducts = [
            ...foodProducts,
            ...hygieneProducts,
            ...accessoriesProducts,
            ...housingProducts,
            ...medicineProducts,
          ];
        } else {
          newProducts = allProducts.filter(
            (product) => product.category === category
          );
        }

        // ✅ Lưu danh mục đã chọn vào LocalStorage
        localStorage.setItem("selectedCategory", category);
        localStorage.setItem("categoryProducts", JSON.stringify(newProducts));

        // ✅ Chuyển hướng đến trang tìm kiếm với danh mục tương ứng
        window.location.href = `search.html?category=${encodeURIComponent(
          category
        )}`;
      });
    });
  }
});
