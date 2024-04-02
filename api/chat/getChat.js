import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body["id_chat"];

    await pool.query(
      'SELECT id_chat, name_chat FROM chat WHERE id_chat = ?',
      [id_chat],
      (err, results) => {
        if (err) {
          console.error('Impossible de récupérer la discussion :', err);
          res.status(500).json({ error: 'Impossible de récupérer la discussion' });
          return;
        }

        if (results.length === 0) {
          res.status(404).json({ error: 'Discussion non trouvée' });
          return;
        }

        res.json({
          id_chat: results[0]["id_chat"],
          name_chat: results[0]["name_chat"],
          success: true
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
