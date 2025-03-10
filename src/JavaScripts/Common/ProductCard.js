export function generateProductCard(product) {
  return `
    <div class="product-card">
      <div class="image-container">
        <img class="product-image" src="${product.src}" alt="${product.name}" />
        <a class="view-now" href="DetailProduct.html?id=${product.id}">Xem ngay</a>
      </div>
      <div class="product-details">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}</p>
      </div>
    </div>
  `;
}
