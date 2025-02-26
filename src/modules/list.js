module.exports = (app, db) => {
  app.get("/api/urls", async (req, res) => {
    // SQL-Abfrage
    const sql = "SELECT short_id, long_url, created_at FROM urls";
    
    // Führt die SQL-Abfrage aus
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results); // Versendet die Ergebnisse als JSON
    });
  });
};