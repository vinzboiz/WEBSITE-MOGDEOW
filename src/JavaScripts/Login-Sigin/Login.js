document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Giả lập đăng nhập thành công (Có thể thay thế bằng API thật)
    if (username === "admin" && password === "123456") {
      alert("Đăng nhập thành công!");
      window.location.href = "dashboard.html"; // Chuyển hướng sau khi đăng nhập
    } else {
      alert("Tên tài khoản hoặc mật khẩu không chính xác!");
    }
  });
