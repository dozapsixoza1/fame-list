
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    avatar TEXT,
    category TEXT,
    link1 TEXT,
    link2 TEXT,
    link3 TEXT
  )`);
});

app.get('/api/cards', (req, res) => {
  db.all("SELECT * FROM cards", (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/cards', (req, res) => {
  const { name, description, avatar, category, link1, link2, link3 } = req.body;
  db.run(
    "INSERT INTO cards (name, description, avatar, category, link1, link2, link3) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, description, avatar, category, link1, link2, link3],
    function(err) {
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.delete('/api/cards/:id', (req, res) => {
  db.run("DELETE FROM cards WHERE id = ?", [req.params.id], (err) => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
