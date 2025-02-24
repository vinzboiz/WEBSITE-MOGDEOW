// Hàm nạp file HTML từ đường dẫn url và chèn vào phần tử có id tương ứng
// Trong AddLayout.js (hoặc file tương tự)
function loadPartial(id, url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => console.error("Lỗi khi nạp partial:", error));
}
