# [Task 4] Express JS, MongoDB, Swagger

## Features
Aplikasi ini memiliki fitur seperti berikut:
1. CRUD Buku: Tambah, lihat, perbarui, dan hapus buku. ✅
2. Login, register, dan get-profile user (Author). ✅
3. Autentikasi Sederhana: Menggunakan JWT, session, dan cookie untuk login. ✅
4. Pengaturan Header Authorization dan CORS untuk keamanan. ✅
5. Body Parsing untuk data JSON. ✅
6. Dokumentasi API menggunakan Swagger. ✅
7. Terdapat Error Handling, seperti: buku tidak ditemukan, judul buku atau
   kode buku yang duplikat, atau gagal login. ✅

## How to run?
Follow the steps below sequentially.

Open git bash or terminal, and type:

1. Clone this repository on your local project 
```shell
# make project directory
mkdir your-project-directory

# change to project directory
cd ./your-project-directory

# clone repository contents in the current directory
git clone https://github.com/mazzlookman/task4-expressjs-mongodb-swagger.git .
```

2. Copy file `.env.example` to `.env`:<br>
```shell
cp .env.example .env
```
Then, assign a value to each of the available variables

3. Install all dependencies:
```shell
npm install
```

4. Run server:
```shell
npm run dev
```

It will run on `http://localhost:3000`

## API Documentation
You can see at `http://localhost:3000/docs`

![api-docs](https://ik.imagekit.io/aqibmoh/Screenshot%202024-11-01%20223543.png?updatedAt=1730476306433)

Thanks. ✨