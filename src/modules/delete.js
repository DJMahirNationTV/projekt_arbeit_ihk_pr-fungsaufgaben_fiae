module.exports = (app, db) => {
    app.delete("/api/urls/:shortId", (req, res) => {
        const { shortId } = req.params;
        const sql = "DELETE FROM urls WHERE short_id = ?";
    
        db.query(sql, [shortId], (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
          }
          
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "URL not found" });
          }
          
          res.json({ message: "URL deleted successfully" });
        });
    });
};