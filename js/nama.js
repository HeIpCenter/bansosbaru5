const names = [
  "Ahmad",
  "Budi",
  "Citra",
  "Dewi",
  "Eka",
  "Fajar",
  "Gilang",
  "Hana",
  "Indra",
  "Joko",
  "Kurnia",
  "Lina",
  "Maya",
  "Nina",
  "Oka",
  "Putu",
  "Qori",
  "Rini",
  "Santi",
  "Tirta",
  "Umar",
  "Vina",
  "Wawan",
  "Xaverius",
  "Yusuf",
  "Zahra",
  "Bagus",
  "Cahyono",
  "Dika",
  "Erlangga",
  "Farida",
  "Gunawan",
  "Hasan",
  "Irfan",
  "Juli",
  "Kiki",
  "Laras",
  "Made",
  "Nurul",
  "Ovi",
  "Putri",
  "Rafi",
  "Siska",
  "Taufik",
  "Ulfa",
  "Vivi",
  "Wahyu",
  "Yogi",
  "Zain",
  "Agung",
  "Bayu",
  "Cahaya",
  "Dewangga",
  "Elis",
  "Firman",
  "Gendis",
  "Hadi",
  "Ismail",
  "Johan",
  "Karin",
  "Lukman",
  "Mega",
  "Nana",
  "Obby",
  "Pandu",
  "Rima",
  "Samsul",
  "Tiara",
  "Ujang",
  "Vika",
  "Wildan",
  "Yuli",
  "Zulfikar",
  "Anto",
  "Bela",
  "Candra",
  "Dedi",
  "Eni",
  "Fatimah",
  "Gusti",
  "Hartono",
  "Ika",
  "Jamil",
  "Kunto",
  "Lilis",
  "Muhammad",
  "Nur",
  "Olga",
  "Pipit",
  "Rahmat",
  "Setiawan",
  "Tria",
  "Utari",
  "Via",
  "Widi",
  "Yani",
  "Zaenal",
  "Bintang",
  "Dita",
  "Ilham",
  "Kartika",
  "Rusdi",
  "Surya",
  "Bimo",
  "Hendri",
  "Shinta",
  "Latifa",
  "Galih",
  "Rico",
  "Anwar",
];

// Fungsi untuk menampilkan daftar pencairan dengan nama dari array `names`
function renderList() {
  const listContainer = document.querySelector(".list");
  listContainer.innerHTML = ""; // Membersihkan konten sebelumnya

  names.forEach((name) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
            <div class="record_logo">
                <img src="images/avatar.png" alt="">
            </div>
            <div class="center">
                <div class="h1"><span class="name">${name}</span></div>
                <div class="h2">Pencairan Rp 500.000</div>
            </div>
        `;
    listContainer.appendChild(item);
  });
}

// Memanggil fungsi renderList untuk menampilkan daftar
renderList();

// // Fungsi untuk auto-scroll
// function startAutoScroll() {
//   const listContainer = document.querySelector(".list-box");
//   let scrollPosition = 0;
//   const scrollSpeed = 1; // Kecepatan scroll dalam piksel per langkah
//   const intervalTime = 30; // Interval waktu dalam milidetik

//   function scrollStep() {
//     // Tambah posisi scroll
//     scrollPosition += scrollSpeed;
//     listContainer.scrollTop = scrollPosition;

//     // Jika mencapai akhir, kembali ke awal
//     if (
//       scrollPosition >=
//       listContainer.scrollHeight - listContainer.clientHeight
//     ) {
//       scrollPosition = 0;
//     }
//   }

//   // Set interval untuk scroll otomatis
//   setInterval(scrollStep, intervalTime);
// }

// // Mulai auto-scroll
// startAutoScroll();
