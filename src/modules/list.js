module.exports = (app, db) => {
   app.post("/api/urls", async (req, res) => {
      const { longUrl } = req.body;
      if (!longUrl || !longUrl.match(/^(http|https):\/\//)) {
        return res.status(400).json({ error: "Invalid URL format!" });
      }
   
      const { nanoid } = await import("nanoid");
      const shortId = nanoid(6);
      const sql = "SELECT short_id, long_url FROM urls";
    
      db.query(sql, [shortId, longUrl], (err) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
      });
    });
};