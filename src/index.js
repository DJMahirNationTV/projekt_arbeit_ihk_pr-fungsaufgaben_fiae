const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Datenbankverbindung | Quelle: https://www.npmjs.com/package/mysql
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});
// Wenn die Verbindung zur Datenbank fehlschlägt, wird eine Fehlermeldung ausgegeben.
db.connect((err) => {
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

// Leitet weiter von der Kurz URL auf die Lang URL
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const sql = "SELECT long_url FROM urls WHERE short_id = ?";

  db.query(sql, [shortId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send("URL not found");
    }
    res.redirect(results[0].long_url);
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
