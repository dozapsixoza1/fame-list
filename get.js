
import { join } from 'path';
import { readFileSync } from 'fs';
import sqlite3 from 'sqlite3';

export default function handler(req, res) {
  const db = new sqlite3.Database(join(process.cwd(), 'data.db'));
  db.all("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, nickname TEXT, status TEXT, description TEXT)", () => {
    db.all("SELECT * FROM cards ORDER BY id DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(rows);
    });
  });
}
