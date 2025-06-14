
import { join } from 'path';
import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id } = req.body;
  const db = new sqlite3.Database(join(process.cwd(), 'data.db'));
  db.run("DELETE FROM cards WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true });
  });
}
