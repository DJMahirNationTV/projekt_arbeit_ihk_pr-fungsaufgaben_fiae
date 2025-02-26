const express = require("express");
const mysql = require("mysql");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Datenbankverbindung | Quelle: https://www.npmjs.com/package/mysql
const db = mysql.createPool({ // Erstellt einen Pool für mehrere gleichzeitige Datenbankverbindungen
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  connectionLimit: 10, // Maximal 10 gleichzeitige Verbindungen
  waitForConnections: true // Wartet, wenn alle Verbindungen belegt sind
});
// Wenn die Verbindung zur Datenbank fehlschlägt, wird eine Fehlermeldung ausgegeben.
db.getConnection((err) => {
  if (err) {
    // Verbindung zur Datenbank fehlgeschlagen mit Fehler nachrricht
    console.error("Datenbankverbindung fehlgeschlagen:", err);
  } else {
    // Verbindung zur Datenbank erfolgreich
    console.log("Mit MySQL verbunden.");
  }
});

// https://expressjs.com/en/starter/static-files.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


require("./modules/create")(app, db);
require("./modules/list")(app, db);
require("./modules/delete")(app, db);
require("./modules/redirection")(app, db); // Leitet weiter von der Kurz URL auf die Lang URL

app.listen(3000, () => {
  console.log(`Example app listening on port 3000\nhttp://localhost:3000`);
});
