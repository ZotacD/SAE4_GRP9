import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body["id_chat"];
    const email = req.body["email"];
    const peer_id = req.body["peer_id"];
    const connect_date = new Date();

    const result = await pool.query(
        'INSERT INTO chat_connection (id_chat, email, peer_id, connect_date) VALUES (?, ?, ?, ?)',
        [id_chat, email, peer_id, connect_date],
      );

    res.json({
        success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
