# Netcrack

Web film bergaya Netflix dengan palet emas dan hitam, efek glassmorphism, Tailwind CSS, dan Alpine.js.
Data film dari TMDB API. Tanpa proses build.

## Cara menjalankan
1. Ekstrak zip.
2. Buka `index.html` di browser (butuh internet untuk CDN, font, dan API).
   Atau pakai server lokal: `npx serve .` / `python -m http.server 8080`.

## Struktur folder
```
Netcrack/
├── index.html               Kerangka halaman + urutan script
├── app.js                   Entry point
├── assets/
│   ├── css/style.css        Glass, tombol, skeleton, scrollbar
│   └── img/logo.svg         Logo dan favicon
├── config/
│   ├── config.js            API key & pengaturan TMDB
│   └── tailwind.config.js   Warna emas/hitam, font
├── utils/helpers.js         Fungsi bantu (gambar, format, storage)
├── services/api.js          Semua pemanggilan API TMDB
├── store/app.js             State global (Alpine.store)
└── components/
    ├── navbar.js            Navigasi + kolom cari
    ├── hero.js              Slider film utama
    ├── skeleton.js          Placeholder loading
    ├── movie-card.js        Kartu film (dipakai ulang)
    ├── movie-row.js         Baris film horizontal
    ├── search-results.js    Hasil pencarian
    ├── modal.js             Detail film + trailer
    ├── toast.js             Notifikasi
    └── footer.js            Footer + atribusi TMDB
```

## Fitur
- Hero slider otomatis (trailer langsung dari tombol)
- Baris: Tren, Populer, Rating Tertinggi, Sedang Tayang, Segera Tayang
- Pencarian film dengan debounce
- Modal detail: sinopsis, genre, pemeran, trailer YouTube, film serupa
- Daftar Saya (tersimpan di localStorage)
- Responsif dan mendukung navigasi keyboard

## Mengubah tampilan atau menambah komponen
- Warna: `config/tailwind.config.js` dan variabel di `assets/css/style.css`.
- Baris baru: tambahkan di `store/app.js` (fungsi `load`) dan endpoint di `services/api.js`.
- Komponen baru: buat file di `components/`, tambahkan `<div id="...">` di `index.html`
  dan `<script defer>` sebelum `app.js`.

## Catatan keamanan
API key ada di `config/config.js`, jadi terlihat oleh siapa pun yang membuka situs.
Untuk produksi, simpan key di server/proxy sendiri.
