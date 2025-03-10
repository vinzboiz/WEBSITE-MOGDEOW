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
