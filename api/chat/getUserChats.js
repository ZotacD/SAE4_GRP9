import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const email = req.body['email'];

    const [results] = await pool.query(
      'SELECT chat.id_chat, chat.name_chat FROM chat JOIN chat_member ON chat.id_chat = chat_member.id_chat WHERE chat_member.email = ?',
      [email]
    );

    res.json({
      chats: results,
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
