/**
 * Hàm generateProductCard nhận vào 1 đối tượng sản phẩm và trả về HTML của thẻ sản phẩm.
 */
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
function generateProductCardScroll(product) {
  return `
      <div class="product-card-scroll" >
        <div class="image-container-scroll">
          <img class="product-image-scroll" src="${product.src}" alt="${product.name}" />
          <a  class="view-now-scroll" href="${product.href}">Xem ngay</a>
        </div>
        <div class="product-details-scroll">
          <p class="product-name-scroll">${product.name}</p>
          <p class="product-price-scroll">${product.price}</p>
        </div>
      </div>
    `;
}
/*=============================================================================================================================*/
/**
 * Hàm displayChosenArray nhận vào loại sản phẩm
 * và containerId để hiển thị toàn bộ danh sách sản phẩm của mảng đó.
 */
function displayChosenArray(productType, containerId) {
  let chosenArray = [];
  if (productType === "dog") {
    chosenArray = dogProducts;
  } else if (productType === "cat") {
    chosenArray = catProducts;
  } else if (productType === "food") {
    chosenArray = foodProducts;
  } else if (productType === "hygiene") {
    chosenArray = hygieneProducts;
  } else if (productType === "accesories") {
    chosenArray = accessoriesProducts;
  } else if (productType === "housing") {
    chosenArray = housingProducts;
  } else if (productType === "medicine") {
    chosenArray = medicineProducts;
  } else {
    console.warn("Loại sản phẩm không hợp lệ. Vui lòng chọn 'dog' hoặc 'cat'.");
    return;
  }
  const container = document.getElementById(containerId);

  container.innerHTML = chosenArray.map(generateProductCard).join("");
}
/*=============================================================================================================================*/
/**
 * Hàm displayRandomProducts nhận vào loại sản phẩm ,
 * containerId để hiển thị sản phẩm và count là số lượng sản phẩm cần hiển thị.
 * Sử dụng thuật toán Fisher-Yates để trộn mảng và lấy count sản phẩm đầu tiên.
 */
function displayRandomProducts(productType, containerId, count, typeScroll) {
  let chosenArray = [];
  if (productType === "dog") {
    chosenArray = [...dogProducts];
  } else if (productType === "cat") {
    chosenArray = [...catProducts];
  } else if (productType === "food") {
    chosenArray = [...foodProducts];
  } else if (productType === "hygiene") {
    chosenArray = [...hygieneProducts];
  } else if (productType === "accesories") {
    chosenArray = [...accessoriesProducts];
  } else if (productType === "housing") {
    chosenArray = [...housingProducts];
  } else if (productType === "medicine") {
    chosenArray = [...medicineProducts];
  } else {
    console.warn(
      "Loại sản phẩm không hợp lệ. Vui lòng chọn 'dog', 'cat' hoặc 'food'."
    );
    return;
  }

  // Trộn mảng theo thuật toán Fisher-Yates
  for (let i = chosenArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chosenArray[i], chosenArray[j]] = [chosenArray[j], chosenArray[i]];
  }

  // Lấy count sản phẩm đầu tiên (nếu count > số lượng, sẽ lấy toàn bộ)
  const selectedProducts = chosenArray.slice(0, count);
  const container = document.getElementById(containerId);

  // Chọn function generate phù hợp
  const generateFunction =
    typeScroll === "scroll" ? generateProductCardScroll : generateProductCard;

  container.innerHTML = selectedProducts.map(generateFunction).join("");
}

/*=============================================================================================================================*/
/**
 * Hàm displayRandomListProduct nhận vào danh sách các loại sản phẩm,
 * containerId để hiển thị sản phẩm, count (số lượng sản phẩm cần hiển thị),
 * và typeScroll để xác định có dùng hiệu ứng scroll hay không.
 */
function displayRandomListProduct(
  productTypes,
  containerId,
  count,
  typeScroll
) {
  let selectedProducts = [];

  productTypes.forEach((productType) => {
    if (productType === "dog") {
      selectedProducts = [...selectedProducts, ...dogProducts];
    } else if (productType === "cat") {
      selectedProducts = [...selectedProducts, ...catProducts];
    } else if (productType === "food") {
      selectedProducts = [...selectedProducts, ...foodProducts];
    } else if (productType === "hygiene") {
      selectedProducts = [...selectedProducts, ...hygieneProducts];
    } else if (productType === "accessories") {
      selectedProducts = [...selectedProducts, ...accessoriesProducts];
    } else if (productType === "housing") {
      selectedProducts = [...selectedProducts, ...housingProducts];
    } else if (productType === "medicine") {
      selectedProducts = [...selectedProducts, ...medicineProducts];
    }
  });

  // Trộn mảng theo thuật toán Fisher-Yates
  for (let i = selectedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedProducts[i], selectedProducts[j]] = [
      selectedProducts[j],
      selectedProducts[i],
    ];
  }

  // Lấy số lượng sản phẩm yêu cầu (nếu count là "all", lấy toàn bộ)
  const finalProducts =
    count === "all" ? selectedProducts : selectedProducts.slice(0, count);
  const container = document.getElementById(containerId);

  // Chọn function generate phù hợp
  const generateFunction =
    typeScroll === "scroll" ? generateProductCardScroll : generateProductCard;

  container.innerHTML = finalProducts.map(generateFunction).join("");
}
/*=============================================================================================================================*/
/**
 * Hàm displayFilteredRandomListProduct nhận vào danh sách sản phẩm cụ thể,
 * containerId để hiển thị sản phẩm, count (số lượng sản phẩm cần hiển thị),
 * và typeScroll để xác định có dùng hiệu ứng scroll hay không.
 */
function displayFilteredRandomListProduct(
  productList,
  containerId,
  count,
  typeScroll
) {
  if (!Array.isArray(productList) || productList.length === 0) {
    console.warn("Danh sách sản phẩm không hợp lệ.");
    return;
  }

  // Trộn mảng theo thuật toán Fisher-Yates
  for (let i = productList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [productList[i], productList[j]] = [productList[j], productList[i]];
  }

  // Lấy số lượng sản phẩm yêu cầu (nếu count là "all", lấy toàn bộ)
  const finalProducts =
    count === "all" ? productList : productList.slice(0, count);
  const container = document.getElementById(containerId);

  // Chọn function generate phù hợp
  const generateFunction =
    typeScroll === "scroll" ? generateProductCardScroll : generateProductCard;

  container.innerHTML = finalProducts.map(generateFunction).join("");
}
