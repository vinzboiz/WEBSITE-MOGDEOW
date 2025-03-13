document.addEventListener("DOMContentLoaded", function () {
  const cartTable = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const selectAllCheckbox = document.getElementById("select-all");
  const purchaseBtn = document.getElementById("purchase-btn");

  // 🔹 Dữ liệu giả lập giỏ hàng (sẽ thay bằng API sau)
  let cart = [
    {
      ProductId: 1,
      ProductName: "Laptop Dell",
      ProductPrice: 15000000,
      Quantity: 1,
      selected: false,
    },
    {
      ProductId: 2,
      ProductName: "Điện thoại iPhone",
      ProductPrice: 22000000,
      Quantity: 2,
      selected: false,
    },
    {
      ProductId: 3,
      ProductName: "Tai nghe Sony",
      ProductPrice: 5000000,
      Quantity: 1,
      selected: false,
    },
  ];

  // 🔹 Hiển thị giỏ hàng
  function renderCart() {
    cartTable.innerHTML = "";
    let totalAmount = 0;
    let selectedCount = 0;

    cart.forEach((item) => {
      let row = document.createElement("tr");
      row.innerHTML = `
              <td><input type="checkbox" class="select-item" data-id="${
                item.ProductId
              }" ${item.selected ? "checked" : ""}></td>
              <td>${item.name}</td>
              <td>${item.price.toLocaleString()} VNĐ</td>
              <td>
                  <button class="quantity-btn" data-id="${
                    item.ProductId
                  }" data-type="decrease">-</button>
                  <span>${item.quantity}</span>
                  <button class="quantity-btn" data-id="${
                    item.ProductId
                  }" data-type="increase">+</button>
              </td>
              <td>${(item.price * item.quantity).toLocaleString()} VNĐ</td>
              <td>
                  <button class="delete-btn" data-id="${
                    item.ProductId
                  }">Xóa</button>
              </td>
          `;
      cartTable.appendChild(row);

      if (item.selected) {
        totalAmount += item.price * item.quantity;
        selectedCount += item.quantity;
      }
    });

    totalPrice.textContent = `Tổng thanh toán ${selectedCount} sản phẩm: ${totalAmount.toLocaleString()} VNĐ`;
    addEventListeners();
  }

  // 🔹 Gán sự kiện cho các nút trong giỏ hàng
  function addEventListeners() {
    document.querySelectorAll(".quantity-btn").forEach((button) => {
      button.addEventListener("click", function () {
        let productId = parseInt(this.getAttribute("data-id"));
        let type = this.getAttribute("data-type");
        updateQuantity(productId, type);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        let productId = parseInt(this.getAttribute("data-id"));
        removeItem(productId);
      });
    });

    document.querySelectorAll(".select-item").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        let productId = parseInt(this.getAttribute("data-id"));
        let isChecked = this.checked;
        updateSelection(productId, isChecked);
      });
    });

    selectAllCheckbox.addEventListener("change", function () {
      let isChecked = this.checked;
      cart.forEach((item) => (item.selected = isChecked));
      renderCart();
    });

    purchaseBtn.addEventListener("click", processPurchase);
  }

  // 🔹 Cập nhật số lượng sản phẩm
  function updateQuantity(productId, type) {
    cart = cart.map((item) => {
      if (item.id === productId) {
        let newQuantity =
          type === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
      }
      return item;
    });

    renderCart();
  }

  // 🔹 Cập nhật trạng thái chọn sản phẩm
  function updateSelection(productId, isChecked) {
    cart = cart.map((item) =>
      item.id === productId ? { ...item, selected: isChecked } : item
    );
    renderCart();
  }

  // 🔹 Xóa sản phẩm khỏi giỏ hàng
  function removeItem(productId) {
    cart = cart.filter((item) => item.id !== productId);
    renderCart();
  }

  // 🔹 Xử lý mua hàng
  async function processPurchase() {
    let selectedItems = cart.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
      return;
    }

    let totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let totalProducts = selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // 🔹 Tạo dữ liệu gửi lên Backend
    let purchaseData = {
      totalProducts: totalProducts,
      totalAmount: totalAmount,
      products: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      let response = await fetch("https://example.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        alert(
          `Mua hàng thành công! Tổng thanh toán: ${totalAmount.toLocaleString()} VNĐ`
        );
        cart = cart.filter((item) => !item.selected); // Xóa sản phẩm đã mua khỏi giỏ hàng
        renderCart();
      } else {
        alert("Có lỗi xảy ra khi mua hàng, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu mua hàng:", error);
      alert("Lỗi kết nối đến server.");
    }
  }

  renderCart();
});
