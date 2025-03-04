document.addEventListener("DOMContentLoaded", function () {
  // ✅ Kiểm tra xem dữ liệu sản phẩm có được tải hay chưa
  if (typeof allProducts === "undefined") {
    console.error(
      "🚨 Dữ liệu sản phẩm chưa được tải. Kiểm tra ProductData.js."
    );
    return;
  }

  // ✅ Lấy tham số từ URL (query để tìm kiếm sản phẩm, category để lọc danh mục)
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const query = params.get("query");

  // ✅ Lấy các phần tử HTML cần thiết để hiển thị dữ liệu
  const searchResultText = document.getElementById("searchResultText");
  const searchResults = document.getElementById("searchResults");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // ✅ Khai báo biến lưu kết quả tìm kiếm và trạng thái phân trang
  let results = [];
  let currentIndex = 0;
  let PRODUCTS_PER_PAGE = getProductCount(); // Số lượng sản phẩm hiển thị mỗi lần

  console.log("🔍 Query:", query, " | Category:", category);

  // ✅ Xử lý tìm kiếm theo từ khóa (ưu tiên tìm kiếm hơn category)
  if (query) {
    results = searchProducts(query);
    console.log("🔎 Tìm kiếm từ khóa:", query);

    // ✅ Kiểm tra nếu không có sản phẩm phù hợp với từ khóa
    if (results.length === 0) {
      searchResultText.textContent = `❌ Không tìm thấy sản phẩm nào cho từ khóa: "${query}"`;
    } else {
      searchResultText.textContent = `🔍 Kết quả tìm kiếm cho từ khóa: "${query}"`;
    }
  }
  // ✅ Nếu không có từ khóa, nhưng có danh mục, lọc sản phẩm theo danh mục
  else if (category) {
    results = filterProductsByCategory(category);
    searchResultText.textContent = ` Kết quả tìm kiếm cho : "${mapCategoryToText(
      category
    )}"`;
  }
  // ✅ Nếu không có gì cả, hiển thị danh sách sản phẩm ngẫu nhiên
  else {
    results = shuffleArray([...allProducts]); // Xáo trộn danh sách sản phẩm để hiển thị ngẫu nhiên
    searchResultText.textContent = "🎲 Danh sách sản phẩm ngẫu nhiên:";
  }

  // ✅ Hiển thị danh sách sản phẩm lên trang
  displaySearchResults(results);

  // ✅ Gọi sự kiện tìm kiếm trên Navbar sau khi header đã load xong
  setTimeout(initSearchEvents, 500);

  /**
   * ✅ Hiển thị sản phẩm với phân trang
   * @param {Array} products - Danh sách sản phẩm cần hiển thị
   * @param {Boolean} reset - Nếu true, sẽ reset lại danh sách sản phẩm hiển thị
   */
  function displaySearchResults(products, reset = true) {
    if (reset) {
      searchResults.innerHTML = ""; // Xóa danh sách cũ
      currentIndex = 0; // Reset index
    }

    // ✅ Lấy danh sách sản phẩm theo trang hiện tại
    let productsToShow = products.slice(
      currentIndex,
      currentIndex + PRODUCTS_PER_PAGE
    );
    searchResults.innerHTML += productsToShow.map(generateProductCard).join(""); // Chèn sản phẩm vào HTML

    // ✅ Kiểm tra nếu còn sản phẩm để hiển thị hay không
    loadMoreBtn.style.display =
      currentIndex + PRODUCTS_PER_PAGE >= products.length ? "none" : "block";
  }
});

/**
 * ✅ Hàm khởi động sự kiện tìm kiếm
 */
function initSearchEvents() {
  console.log("🔍 Khởi động sự kiện tìm kiếm...");

  const searchInput = document.getElementById("searchInputHeader");
  const searchButton = document.getElementById("searchButtonHeader");

  if (!searchInput || !searchButton) {
    console.warn("⚠️ Không tìm thấy phần tử tìm kiếm.");
    return;
  }

  /**
   * ✅ Xử lý tìm kiếm khi người dùng nhập từ khóa
   */
  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      console.log(`🔎 Đang tìm kiếm với từ khóa: ${query}`);
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    } else {
      alert("❗ Vui lòng nhập từ khóa tìm kiếm!");
    }
  }

  // ✅ Gán sự kiện click vào nút tìm kiếm
  searchButton.addEventListener("click", handleSearch);

  // ✅ Gán sự kiện nhấn phím Enter trong ô tìm kiếm
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  console.log("✅ Sự kiện tìm kiếm đã được gán!");
}

/**
 * ✅ Hàm tìm kiếm sản phẩm dựa trên từ khóa (hỗ trợ tìm kiếm không dấu)
 * @param {string} query - Từ khóa tìm kiếm
 * @returns {Array} - Danh sách sản phẩm phù hợp
 */
function searchProducts(query) {
  query = query.toLowerCase().trim();
  const queryNoTone = removeVietnameseTones(query);

  let exactMatch = [];
  let noToneMatch = [];

  allProducts.forEach((product) => {
    const productName = product.name.toLowerCase();
    const productNameNoTone = removeVietnameseTones(productName);

    if (productName.includes(query)) {
      exactMatch.push(product);
    } else if (productNameNoTone.includes(queryNoTone)) {
      noToneMatch.push(product);
    }
  });

  return [...exactMatch, ...noToneMatch];
}

/**
 * ✅ Lọc sản phẩm theo danh mục
 * @param {string} category - Danh mục sản phẩm
 * @returns {Array} - Danh sách sản phẩm theo danh mục
 */
function filterProductsByCategory(category) {
  if (category === "all") return shuffleArray([...allProducts]);
  if (category === "all-pet")
    return allProducts.filter(
      (p) => p.category === "dog" || p.category === "cat"
    );
  if (category === "all-accessories")
    return allProducts.filter((p) =>
      ["food", "hygiene", "accessories", "housing", "medicine"].includes(
        p.category
      )
    );

  return allProducts.filter((p) => p.category === category);
}

/**
 * ✅ Tạo HTML sản phẩm
 * @param {Object} product - Đối tượng sản phẩm
 * @returns {string} - HTML sản phẩm
 */
function generateProductCard(product) {
  return `
      <div class="product-card" >
        <div class="image-container">
          <img class="product-image" src="${product.src}" alt="${product.name}" />
          <a  class="view-now" href="DetailProduct.html?id=${product.id}">Xem ngay</a>
        </div>
        <div class="product-details">
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price}</p>
        </div>
      </div>
    `;
}

/**
 * ✅ Xáo trộn danh sách sản phẩm
 * @param {Array} array - Mảng sản phẩm
 * @returns {Array} - Mảng đã được xáo trộn
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * ✅ Loại bỏ dấu tiếng Việt
 * @param {string} str - Chuỗi có dấu
 * @returns {string} - Chuỗi không dấu
 */
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * ✅ Chuyển mã danh mục sang văn bản tiếng Việt
 */
function mapCategoryToText(category) {
  const categoryMap = {
    dog: "Chó cảnh",
    cat: "Mèo cảnh",
    food: "Thức ăn & Thực phẩm dinh dưỡng",
    hygiene: "Vệ sinh & Chăm sóc",
    accessories: "Đồ dùng, Đồ chơi & Phụ kiện",
    housing: "Chuồng, Balo & Đệm",
    medicine: "Thuốc & Thực phẩm chức năng",
  };
  return categoryMap[category] || "Danh mục không xác định";
}
