# Dashboard and Search Feature using Elasticsearch

## Repository Proyek Akhir Pengelolaan Data Besar (CSIE604273) Semester Gasal TA 2019/2020
Kelompok 3:
- Faris Abdurrahman (1706106734)
- Kristianto (1606889856)
- Shafira Fitri (1606890385)
- Thrisnadevany Amalia (1606874532)

## Teknologi dan Data yang Digunakan
Teknologi yang digunakan pada proyek akhir ini di antaranya adalah:
- Elasticsearch (sebagai teknologi yang dipilih)
- React
- Docker

Data yang digunakan pada proyek akhir ini adalah hasil ekstraksi dari data `NYPD Motor Vehicle Collisions - Crashes` yang diperoleh dari [NYC Open Data](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95)

## Panduan Instalasi
Untuk melihat demonstrasi dari proyek akhir ini secara `local`, lakukan `git clone` terlebih dahulu. Selain itu, pastikan juga bahwa `local` Anda sudah memiliki `docker` dan `docker-compose`. Jika belum, harap meng-install keduanya terlebih dahulu.

Sebelum menjalankan program, lakukan perintah `sysctl -w vm.max_map_count=262144` terlebih dahulu. Perintah tersebut dilakukan agar Elasticsearch dapat berjalan dengan baik.

Selanjutnya, lakukan perintah berikut untuk menjalankan program:
```
docker-compose build
docker-compose up
```
Setelah berhasil, program dapat diakses melalui `http://localhost:3000` (untuk React) dan `http://localhost:9200` (untuk Elasticsearch).

Untuk memasukkan data yang ada ke dalam Elasticsearch, jalankan perintah `node src/insertData.js` dari root directory. Proses memasukkan data akan memakan waktu sekitar 30 menit. Proses ini hanya perlu dilakukan sekali di awal.

Jika sudah selesai, lakukan `docker-compose down` untuk mematikan program.