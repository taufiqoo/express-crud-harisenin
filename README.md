## Tugas Invidivu ExpressJS (CRUD)

### Tech Stack
1. NodeJS
2. ExpressJS
3. Prisma ORM
4. MySQL

### Perlu diperhatikan ketika melakukan testing di Postman
1. Token pada aplikasi ini digenerate menggunakan uuid (setiap submit login akan berubah)
2. Ketika sudah berhasil melakukan registrasi akun dan ingin melakukan login, pastikan anda sudah memasukkan tokennya
3. Pada Postman, anda dapat klik ```Headers```, pilih Key-nya ```Authorization``` dan masukkan tokennya
4. Jika tidak melakukan hal di atas, anda tidak akan bisa menjalankan fungsi CRUD-nya

### Cara menjalankan aplikasi
1. Lakukan konfigurasi pada file ```.env``` terutama bagian```DATABASE_URL```, sesusaikan di laptop/pc masing-masing
2. Pastikan sudah melakukan instalasi dependencies dengan menjalankan command ```npm install```
3. Jalankan command ```npx prisma db push``` untuk membuat table-table di database local sesuai ```DATABASE_URL``` yang sudah dituliskan sebelumnya
4. Jalankan aplikasi dengan command ```npm run dev```

<hr>

### Contoh Request (silahkan copas saja)

1. #### Register (POST) ```localhost:3030/api/users```
```
{
    "username": "taufiqoo",
    "password": "taufiq123",
    "name": "Taufiqurrahman Saleh"
}
```

2. #### Login (POST) ```localhost:3030/api/users/login```
```
{
    "username": "taufiqoo",
    "password": "taufiq123",
}
```
Response
```
{
    "data": {
        "token": "8432a1df-d1c1-44ed-9ad8-742d6dd8f74e"
    }
}
```
##### Pastikan anda memasukkan tokennya ketika ingin melakukan CRUD

3. #### Create Contact (POST) ```localhost:3030/api/contacts```
```
{
    "first_name": "Putri",
    "last_name": "Syahbania",
    "email": "syahbania@gmail.com",
    "phone": "1259812791"
}
```

4. #### Find All Contact (GET) ```localhost:3030/api/contacts```
Response:
```
{
    "data": [
        {
            "id": 1,
            "first_name": "Putri",
            "last_name": "Dzakiyah",
            "email": "pujack@gmail.com",
            "phone": "091231293123",
            "username": "taufiqoo"
        },
        {
            "id": 2,
            "first_name": "Putri 2",
            "last_name": "Syahbania",
            "email": "syahbania2@gmail.com",
            "phone": "12598127912",
            "username": "taufiqoo"
        }
    ],
    "paging": {
        "page": 1,
        "total_item": 2,
        "total_page": 1
    }
}
```

5. #### Find Contact By Id (GET) ```localhost:3030/api/contacts/{contactId}```
```
{
            "id": 2,
            "first_name": "Putri 2",
            "last_name": "Syahbania",
            "email": "syahbania2@gmail.com",
            "phone": "12598127912",
            "username": "taufiqoo"
        }
```

6. #### Update Contact By Id (PUT) ```localhost:3030/api/contacts/{contactId}```
```
{
    "data": {
        "id": 2,
        "first_name": "Putri 2",
        "last_name": "Syahbania Updated",
        "email": "syahbania2@gmail.com",
        "phone": "12598127912"
    }
}
```

7. #### Delete Contact By Id (DELETE) ```localhost:3030/api/contacts/{contactId}```
```
{
    "message": "Kontak berhasil dihapus"
}
```
