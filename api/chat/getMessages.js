import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body.id_chat;

    const [results] = await pool.query(
      'SELECT id_message, email, content, send_date FROM message WHERE id_chat = ? ORDER BY send_date ASC',
      [id_chat]
    );

    res.json({
      messages: results,
      success: true,
    });
  } catch (err) {
    console.error('Impossible de récupérer les messages :', err);
    res.status(500).json({ error: 'Impossible de récupérer les messages' });
  }
});

export default router;
