# Laporan 


### Deskripsi Service
![](https://github.com/Maleka0809/dokum_ncc_tgs_oprec/blob/1cfa2b43de09e6f6bc226dad9d06cff0d197962e/Screenshot%202026-04-15%20155847.png)
Website ini dibuat untuk penggalangan dana reboisasi. Platform kampanye ini terdiri dari layanan frontend (antarmuka donasi pohon berbasis Next.js) dan layanan backend (API pengecekan status berbasis FastAPI Python).

### endpoint /health
![](https://github.com/Maleka0809/dokum_ncc_tgs_oprec/blob/c9daeb493d16628de18e024059801d8df7e0f374/Screenshot%202026-04-15%20163626.png)
```
app.py
  from fastapi import FastAPI
  app = FastAPI()
  @app.get("/health")
  def health(): return {"status": "success", "message": "Backend TanamNusantara Sehat di Azure!"}
```
Jadi kode di atas dibuat agar docker bisa melakukab health check. Docker akan mencoba mengakses alamat /health ini setiap 30 detik.

Setiap kali diakses, sistem akan langsung memberikan balasan sukses berupa kode `200 OK`(standar baku protokol komunikasi internet [HTTP Status Codes]) dan teks JSON singkat: `{"status": "success", "message": "Backend TanamNusantara Sehat di Azure!"}`

Jika alamat tersebut membalas dengan sukses, Docker mencatat bahwa aplikasi kita sedang berjalan dengan normal.

Jika alamat tersebut tidak membalas sama sekali (misalnya karena sistem sedang error, macet, atau kelebihan beban), Docker akan langsung tahu bahwa aplikasi sedang bermasalah (unhealthy), sehingga Docker bisa otomatis menyalakan ulang aplikasinya tanpa harus kita cek secara manual.

### Build and run
#### Backend/Dockerfile 
```
    FROM python:3.10-alpine
    WORKDIR /app
    RUN pip install fastapi uvicorn
    COPY app.py .
    HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
      CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1
    CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```
Docker pada backend ini akan melakukan pengecekan setiap 30 detik, maksimal tunggu 5 detik, jika gagal 5 kali berarti dianggap down. Kode di atas juga akan menjalankan server Uvicorn(yang ngejalanin FastAPI supaya bisa diakses).`app:app` app pertama merujuk pada file python yang saya buat yaitu app.py, app yang kedua merujuk pada nama variabel FastAPI(framework untuk bikin backend API di Python[yang mengatur server agar bisa kirim response dan terima request]).

#### frontend/Dockerfile 
```
    FROM node:20-alpine AS builder
    WORKDIR /app
    COPY package.json ./
    RUN npm install
    COPY . .
    RUN npm run build
    
    FROM node:20-alpine
    WORKDIR /app
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
      CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
    EXPOSE 3000
    CMD ["npm", "start"]

```
Kode Dockerfile tersebut digunakan untuk membangun dan menjalankan aplikasi frontend berbasis Node.js dalam container Docker agar siap digunakan di production. Prosesnya meliputi tahap build untuk menginstal dependency dan mengompilasi aplikasi, lalu tahap kedua untuk menjalankan hasil build dalam image yang lebih ringan. Selain itu, terdapat health check untuk memastikan aplikasi tetap berjalan, dan aplikasi dijalankan pada port 3000 dengan perintah npm start.

### docker-compose.yml
```
      services:
        backend:
          build: ./backend
          container_name: ncc-backend
          ports:
            - "${PORT_BACKEND:-8000}:8000"
          restart: unless-stopped
      
        frontend:
          build: ./frontend
          container_name: ncc-frontend
          ports:
            - "${PORT_FRONTEND:-3000}:3000"
          restart: unless-stopped
          depends_on:
            - backend

```
Konfigurasi tersebut digunakan untuk mendefinisikan dan menjalankan dua layanan utama, yaitu backend dan frontend, menggunakan Docker Compose. Backend dibangun dari folder ./backend dan dijalankan pada port 8000, sedangkan frontend dibangun dari folder ./frontend dan dijalankan pada port 3000. Penggunaan variabel seperti `${PORT_BACKEND:-8000}` dan `${PORT_FRONTEND:-3000}` memungkinkan pengaturan port secara fleksibel. Selain itu, frontend dibuat bergantung pada backend melalui depends_on, sehingga backend dijalankan terlebih dahulu. Opsi `restart: unless-stopped` memastikan kedua layanan akan otomatis dijalankan kembali jika terjadi kegagalan, sehingga sistem tetap berjalan stabil(Kalau container error/crash/mati tiba-tiba docker akan otomatis menjalankan ulang).

singkatnya digunakan agar kita tidak perlu run berkali kali 
```
docker build
docker run
```

untuk menjalankanya menggunakan perintah
```
docker compose up -d
```

### VPS
Disini saya menggunakan Virtual Machine dari Azure 
![](https://github.com/Maleka0809/dokum_ncc_tgs_oprec/blob/609f659ef57b6ab874077042b369f432a65f7488/Screenshot%202026-04-15%20173200.png)
membuat virtual machine terlebuh dahulu, nantinya akan mendapatkan public ip dan file dengan format `tanam_key.pem` 
![](https://github.com/Maleka0809/dokum_ncc_tgs_oprec/blob/90f8a47d7f12108387bbee327a6e6646cbdd362b/Screenshot%202026-04-15%20172848.png)
file yang sudah didownload maka kita command `chmod` untuk mengganti kepemilikan karena user biasa, kadang tidak bisa execute. 
`ssh -i tanam_key.pem azureuser@4.240.94.24` gunanya sebagai :
- Perintah ssh -i tanam_key.pem azureuser@4.240.94.24 berfungsi untuk menginisialisasi koneksi jarak jauh yang aman dan terenkripsi ke server virtual Azure. Protokol Secure Shell (SSH) digunakan
- untuk mengakses (login) akun azureuser pada mesin yang memiliki alamat IP publik 4.240.94.24, dengan memanfaatkan file kredensial kriptografis tanam_key.pem (parameter -i atau identity file)


### Kendala
-Di azure susah sekali mendapat region dan memory yang pas.



