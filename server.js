const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database('./db.sqlite');

// Создание таблицы при запуске
db.run(`CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nickname TEXT,
  status TEXT,
  description TEXT,
  category TEXT,
  img TEXT
)`);

// Получить все карточки
app.get('/api/cards', (req, res) => {
  db.all('SELECT * FROM cards', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Добавить карточку
app.post('/api/cards', (req, res) => {
  const { nickname, status, description, category, img } = req.body;
  db.run(
    'INSERT INTO cards (nickname, status, description, category, img) VALUES (?, ?, ?, ?, ?)',
    [nickname, status, description, category, img],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Удалить карточку
app.delete('/api/cards/:id', (req, res) => {
  db.run('DELETE FROM cards WHERE id = ?', req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
