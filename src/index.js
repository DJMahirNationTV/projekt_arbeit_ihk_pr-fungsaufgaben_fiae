const express = require("express");
const mysql = require("mysql");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// TESTING
// Datenbankverbindung | Quelle: https://www.npmjs.com/package/mysql
const db = mysql.createPool({
  // Erstellt einen Pool für mehrere gleichzeitige Datenbankverbindungen
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  connectionLimit: 10, // Maximal 10 gleichzeitige Verbindungen
  waitForConnections: true, // Wartet, wenn alle Verbindungen belegt sind, anstatt sofort einen Fehler zu werfen
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
// Es wird die index.html Datei aus dem public Ordner geladen und angezeigt.
// der "/" ist der Pfad der aufgerufen wird. Also http://localhost:3000/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Importiert alle Module aus dem modules Ordner und übergibt die app und db Variablen
// Die app und db Variablen werden in den Modulen verwendet, um Routen zu definieren und Datenbankabfragen auszuführen.
require("./modules/create")(app, db); // Erstellt eine neue URL in der Datenbank
require("./modules/list")(app, db); // Listet alle URLs aus der Datenbank
require("./modules/delete")(app, db); // Löscht eine URL aus der Datenbank
require("./modules/redirection")(app, db); // Leitet weiter von der Kurz URL auf die Lang URL

// Startet den Server auf Port 3000 und gibt eine Meldung aus, dass der Server gestartet wurde.
app.listen(3000, () => {
  console.log("Example app listening on port 3000\nhttp://localhost:3000");
});
