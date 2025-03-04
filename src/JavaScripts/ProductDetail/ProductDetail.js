document.addEventListener("DOMContentLoaded", function () {
  // ✅ Lấy ID sản phẩm từ URL
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  if (!productId) {
    console.error("❌ Không tìm thấy ID sản phẩm!");
    return;
  }

  // ✅ Kiểm tra dữ liệu sản phẩm đã được tải chưa
  if (
    typeof allProducts === "undefined" ||
    typeof listImgData === "undefined"
  ) {
    console.error(
      "🚨 Dữ liệu sản phẩm chưa được tải! Kiểm tra lại `ProductData.js` và `ListImgData.js`."
    );
    return;
  }

  // ✅ Tìm sản phẩm theo ID
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    console.error("❌ Không tìm thấy sản phẩm với ID:", productId);
    return;
  }

  console.log("📌 Sản phẩm được chọn:", product);

  // ✅ Cập nhật thông tin sản phẩm trên giao diện
  document.getElementById("name-product").textContent = product.name;
  document.getElementById("price-product").textContent = product.price;
  document.getElementById("desc-product").textContent = product.desc;
  document.getElementById("category-product").textContent = product.category;
  document.getElementById("id-product").textContent = product.id;
  // ✅ Lấy danh sách ảnh sản phẩm từ ListImgData.js
  const productImages =
    listImgData.find((item) => item.productId === productId)?.images || [];

  // ✅ Thêm ảnh chính từ ProductData.js vào danh sách đầu tiên
  let fullImageList = [
    { src: product.src, alt: product.name },
    ...productImages,
  ];

  if (fullImageList.length === 0) {
    console.warn("⚠️ Không có ảnh cho sản phẩm này.");
  } else {
    const slideContainer = document.getElementById("slidesContainer");
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    slideContainer.innerHTML = ""; // Xóa ảnh mẫu mặc định
    thumbnailContainer.innerHTML = ""; // Xóa thumbnail cũ

    fullImageList.forEach((img, index) => {
      // ✅ Thêm ảnh vào slide chính
      let slideDiv = document.createElement("div");
      slideDiv.classList.add("mySlides");
      slideDiv.innerHTML = `<img src="${img.src}" alt="${img.alt}" >`;
      slideContainer.appendChild(slideDiv);

      // ✅ Thêm ảnh nhỏ vào danh sách thumbnail
      let thumbnailImg = document.createElement("img");
      thumbnailImg.classList.add("demo", "cursor");
      thumbnailImg.src = img.src;
      thumbnailImg.alt = img.alt;
      thumbnailImg.onclick = () => currentSlide(index + 1);

      // ✅ Tạo container cho thumbnail
      let thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail-item"); // Thêm class để thiết lập flex
      thumbnailDiv.appendChild(thumbnailImg);

      thumbnailContainer.appendChild(thumbnailDiv);
    });

    console.log("✅ Ảnh sản phẩm đã cập nhật thành công!");

    // ✅ Hiển thị slide đầu tiên
    showSlides(1);
  }
});

/**
 * ✅ Hiển thị slide ảnh
 */
let slideIndex = 1;
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}
document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const btnDecrease = document.querySelector(".btn-decrease");
  const btnIncrease = document.querySelector(".btn-increase");

  // ✅ Giảm số lượng
  btnDecrease.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  // ✅ Tăng số lượng
  btnIncrease.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
});
