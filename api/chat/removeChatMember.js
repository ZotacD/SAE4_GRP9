import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];
    const email = req.params['email'];

    await pool.query(
      'DELETE FROM chat_member WHERE email = ? AND id_chat = ?',
      [email, id_chat],
      (err, result) => {
        if (err) {
          console.error('Impossible de supprimer le membre de la discussion :', err);
          res.status(500).json({ error: 'Impossible de supprimer le membre de la discussion' });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Membre non trouvé dans la discussion' });
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
