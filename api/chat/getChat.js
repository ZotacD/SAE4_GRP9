import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body.id_chat;

    const [results] = await pool.query(
      'SELECT chat.id_chat, chat.name_chat FROM chat WHERE chat.id_chat = ?',
      [id_chat]
    );

    if(results.length == 0) {
      res.json({success: false});
      return;
    }

    res.json({
      id_chat: results[0].id_chat,
      name_chat: results[0].name_chat,
      success: true,
    });
  } catch (err) {
    console.error('Impossible de récupérer la discussion :', err);
    res.status(500).json({ error: 'Impossible de récupérer la discussion' });
  }
});

export default router;
