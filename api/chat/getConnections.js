import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body.id_chat;

    const [results] = await pool.query(
      'SELECT email, peer_id, connect_date FROM chat_connection WHERE id_chat = ?',
      [id_chat]
    );

    res.json({
      connections: results,
      success: true,
    });
  } catch (err) {
    console.error('Impossible de récupérer les connexions :', err);
    res.status(500).json({ error: 'Impossible de récupérer les connexions' });
  }
});

export default router;
