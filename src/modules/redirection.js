module.exports = (app, db) => {
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
};