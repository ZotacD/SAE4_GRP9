import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];
    const email = req.body['email'];

    await pool.query(
      'INSERT INTO chat_member (email, id_chat) VALUES (?, ?)',
      [email, id_chat],
      (err, result) => {
        if (err) {
          console.error('Impossible d\'ajouter le membre à la discussion :', err);
          res.status(500).json({ error: 'Impossible d\'ajouter le membre à la discussion' });
          return;
        }
      }
    );

    res.json({
      email: email,
      id_chat: id_chat,
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
