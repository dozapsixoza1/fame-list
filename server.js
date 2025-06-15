const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('.'));

const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT,
      status TEXT,
      description TEXT,
      category TEXT,
      img TEXT
    )
  \`);
});

app.get('/cards', (req, res) => {
  db.all('SELECT * FROM cards ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/cards', (req, res) => {
  const { nickname, status, description, category, img } = req.body;
  db.run(
    'INSERT INTO cards (nickname, status, description, category, img) VALUES (?, ?, ?, ?, ?)',
    [nickname, status, description, category, img],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});
