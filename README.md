# projekt_arbeit_ihk_pr-fungsaufgaben_fiae
Projekt Dokumentation - IHK - Prüfungsarbeit inkl. Präsi. - URL Shortner

---
\
\
Install all Packages:

```js
npm i
```

rename `.env.example` to `.env`

Enter your Database details in the `.env` file, so process can be started.

Database Structure:

```sql
CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    short_id VARCHAR(10) UNIQUE NOT NULL,
    long_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

and lastly run:

```js
npm start
```

to start the process and the Server
