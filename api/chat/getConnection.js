import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body.id_chat;
    const email = req.body.email;

    const [results] = await pool.query(
      'SELECT peer_id FROM chat_connection WHERE id_chat = ? AND email = ? LIMIT 1',
      [id_chat, email]
    );

    if(results.length == 0) {
      res.json({success: false});
      return;
    }

    res.json({
      peer_id: results[0]["peer_id"],
      success: true,
    });
  } catch (err) {
    console.error('Impossible de récupérer la connexion :', err);
    res.status(500).json({ error: 'Impossible de récupérer la connexion' });
  }
});

export default router;
