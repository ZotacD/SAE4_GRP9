import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];
    const email = req.body['email'];

    let result = await pool.query(
      'DELETE FROM chat_member WHERE id_chat = ? AND email = ?',
      [id_chat, email],
      );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Discussion non trouvée' });
      return;
    }

    result = await pool.query(
      'DELETE FROM chat_connection WHERE id_chat = ? AND email = ?',
      [id_chat, email],
      );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Discussion non trouvée' });
      return;
    }

    result = await pool.query(
      'DELETE FROM message WHERE id_chat = ? AND email = ?',
      [id_chat, email],
      );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Discussion non trouvée' });
      return;
    }

    res.json({
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
