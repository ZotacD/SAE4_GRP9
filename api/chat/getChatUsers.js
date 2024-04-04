import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];

    const [results] = await pool.query(
      'SELECT chat_member.email FROM chat JOIN chat_member ON chat.id_chat = chat_member.id_chat WHERE chat_member.id_chat = ?',
      [id_chat]
    );

    res.json({
      users: results,
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
