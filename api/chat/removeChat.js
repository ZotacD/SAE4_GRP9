import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];

    await pool.query(
      'DELETE FROM chat WHERE id_chat = ?',
      [id_chat],
      (err, result) => {
        if (err) {
          console.error('Impossible de supprimer la discussion :', err);
          res.status(500).json({ error: 'Impossible de supprimer la discussion' });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Discussion non trouvée' });
          return;
        }
      }
    );

    res.json({
      id_chat: id_chat,
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
