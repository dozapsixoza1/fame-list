
import { join } from 'path';
import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nickname, status, description } = req.body;
  const db = new sqlite3.Database(join(process.cwd(), 'data.db'));
  db.run("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname TEXT, status TEXT, description TEXT)");
  db.run("INSERT INTO cards (nickname, status, description) VALUES (?, ?, ?)",
    [nickname, status, description],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, id: this.lastID });
    }
  );
}
