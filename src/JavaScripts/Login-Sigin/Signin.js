document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    const terms = document.getElementById("terms").checked;

    if (username === "" || password === "" || confirmPassword === "") {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    if (!terms) {
      alert("Bạn phải đồng ý với điều khoản!");
      return;
    }

    alert("Đăng ký thành công!");
  });
