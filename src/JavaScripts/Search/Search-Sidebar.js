document.addEventListener("DOMContentLoaded", function () {
  // ✅ Lấy các phần tử HTML cần thiết từ DOM
  const categoryList = document.getElementById("categoryList");
  const priceRangeMin = document.getElementById("priceRangeMin");
  const priceRangeMax = document.getElementById("priceRangeMax");
  const priceValue = document.getElementById("priceValue");
  const filterBtn = document.getElementById("filterBtn");
  const searchResults = document.getElementById("searchResults");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const sortPrice = document.getElementById("sortPrice");
  const searchResultText = document.getElementById("searchResultText");

  // ✅ Khai báo các biến toàn cục
  let minPrice = parseInt(priceRangeMin.value, 10); // Giá thấp nhất
  let maxPrice = parseInt(priceRangeMax.value, 10); // Giá cao nhất
  let sortOption = "none"; // Giá trị mặc định cho sắp xếp
  let currentIndex = 0; // Chỉ mục hiện tại để phân trang
  let PRODUCTS_PER_PAGE = getProductCount(); // Số sản phẩm hiển thị mỗi lần
  let storedProducts = []; // Danh sách sản phẩm sau khi lọc
  let originalProducts = []; // Lưu danh sách sản phẩm gốc để khôi phục khi lọc lại

  // ✅ Hàm lấy số lượng sản phẩm hiển thị dựa vào kích thước màn hình
  function getProductCount() {
    if (window.innerWidth >= 1024) return 9;
    else if (window.innerWidth >= 768) return 8;
    return 6;
  }

  // ✅ Cập nhật số lượng sản phẩm hiển thị khi thay đổi kích thước màn hình
  window.addEventListener("resize", () => {
    PRODUCTS_PER_PAGE = getProductCount();
  });

  // ✅ Lấy tham số từ URL
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || ""; // Lấy danh mục từ URL
  const query = params.get("query") || ""; // Lấy từ khóa tìm kiếm từ URL

  console.log("🔍 Query:", query, " | Category:", category);

  // ✅ Xử lý dữ liệu ban đầu (lọc theo query hoặc category)
  if (query) {
    storedProducts = searchProducts(query);
    console.log(" Tìm kiếm từ khóa:", query);
    searchResultText.textContent =
      storedProducts.length === 0
        ? ` Không tìm thấy sản phẩm nào cho từ khóa: "${query}"`
        : ` Kết quả tìm kiếm cho : ${query}`;
  } else if (category) {
    storedProducts = filterProductsByCategory(category);
    searchResultText.textContent = ` Kết quả tìm kiếm cho : ${mapCategoryToText(
      category
    )}`;
  } else {
    storedProducts = shuffleArray([...allProducts]); // Nếu không có query hoặc category, hiển thị sản phẩm ngẫu nhiên
    searchResultText.textContent = " Danh sách sản phẩm ngẫu nhiên:";
  }

  originalProducts = [...storedProducts]; // Lưu bản sao của sản phẩm gốc để khôi phục khi cần

  console.log("✅ Sản phẩm đã lọc:", storedProducts);

  // ✅ Hiển thị sản phẩm ban đầu
  displayProducts();

  // ✅ Cập nhật giá khi kéo thanh lọc giá
  priceRangeMin.addEventListener("input", updatePriceText);
  priceRangeMax.addEventListener("input", updatePriceText);

  function updatePriceText() {
    minPrice = parseInt(priceRangeMin.value, 10);
    maxPrice = parseInt(priceRangeMax.value, 10);
    priceValue.textContent = `${minPrice.toLocaleString()} đ - ${maxPrice.toLocaleString()} đ`;
  }

  // ✅ Lọc sản phẩm theo giá
  filterBtn.addEventListener("click", function () {
    minPrice = parseInt(priceRangeMin.value, 10);
    maxPrice = parseInt(priceRangeMax.value, 10);
    console.log(`🔍 Lọc theo giá từ ${minPrice} đ đến ${maxPrice} đ`);

    storedProducts = filterByPriceAndSort(
      originalProducts,
      minPrice,
      maxPrice,
      sortOption
    );

    displayProducts();
  });

  // ✅ Sắp xếp sản phẩm theo giá
  sortPrice.addEventListener("change", function () {
    sortOption = sortPrice.value;
    console.log("🔄 Sắp xếp giá theo:", sortOption);

    storedProducts = filterByPriceAndSort(
      storedProducts,
      minPrice,
      maxPrice,
      sortOption
    );

    displayProducts();
  });

  // ✅ Xử lý nút "Xem thêm"
  loadMoreBtn.addEventListener("click", function () {
    currentIndex += PRODUCTS_PER_PAGE;
    displayProducts(false);
  });

  // ✅ Hiển thị sản phẩm với phân trang
  function displayProducts(reset = true) {
    if (reset) {
      searchResults.innerHTML = "";
      currentIndex = 0;
    }

    let productsToShow = storedProducts.slice(
      currentIndex,
      currentIndex + PRODUCTS_PER_PAGE
    );

    if (productsToShow.length === 0) {
      loadMoreBtn.style.display = "none";
      return;
    }

    searchResults.innerHTML += productsToShow.map(generateProductCard).join("");

    loadMoreBtn.style.display =
      currentIndex + PRODUCTS_PER_PAGE >= storedProducts.length
        ? "none"
        : "block";
  }

  // ✅ Lọc sản phẩm theo giá và sắp xếp
  function filterByPriceAndSort(products, minPrice, maxPrice, sortOption) {
    let filteredProducts = products.filter((product) => {
      let productPrice = parseInt(product.price.replace(/[^\d]/g, ""), 10);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });

    if (sortOption === "asc") {
      filteredProducts.sort(
        (a, b) =>
          parseInt(a.price.replace(/[^\d]/g, ""), 10) -
          parseInt(b.price.replace(/[^\d]/g, ""), 10)
      );
    } else if (sortOption === "desc") {
      filteredProducts.sort(
        (a, b) =>
          parseInt(b.price.replace(/[^\d]/g, ""), 10) -
          parseInt(a.price.replace(/[^\d]/g, ""), 10)
      );
    }

    return filteredProducts;
  }

  // ✅ Xử lý khi nhấn vào danh mục trên Sidebar
  if (categoryList) {
    categoryList.addEventListener("click", function (event) {
      let clickedCategory = event.target
        .closest("li")
        ?.getAttribute("data-category");

      if (!clickedCategory) return;

      console.log("📌 Chọn danh mục từ Sidebar:", clickedCategory);

      window.location.href = `search.html?category=${encodeURIComponent(
        clickedCategory
      )}`;
    });
  }

  // ✅ Tạo HTML sản phẩm
  function generateProductCard(product) {
    return `
      <div class="product-card" >
        <div class="image-container">
          <img class="product-image" src="${product.src}" alt="${product.name}" />
          <a  class="view-now" href="${product.href}">Xem ngay</a>
        </div>
        <div class="product-details">
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price}</p>
        </div>
      </div>
    `;
  }

  // ✅ Xáo trộn danh sách sản phẩm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ✅ Chuyển mã danh mục sang văn bản
  function mapCategoryToText(category) {
    const categoryMap = {
      dog: "Chó cảnh",
      cat: "Mèo cảnh",
      food: "Thức ăn & Thực phẩm dinh dưỡng",
      hygiene: "Vệ sinh & Chăm sóc",
      accessories: "Đồ dùng, Đồ chơi & Phụ kiện",
      housing: "Chuồng, Balo & Đệm",
      medicine: "Thuốc & Thực phẩm chức năng",
      "all-pet": "Tất cả thú cưng",
      "all-accessories": "Tất cả phụ kiện thú cưng",
    };
    return categoryMap[category] || "Toàn bộ sản phẩm";
  }
});
