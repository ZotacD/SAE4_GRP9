import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];
    const name_chat = req.body['name_chat'];

    if (!name_chat) {
      res.status(400).json({ error: 'Le nouveau nom de la discussion est requis' });
      return;
    }

    await pool.query(
      'UPDATE chat SET name_chat = ? WHERE id_chat = ?',
      [name_chat, id_chat],
      (err, result) => {
        if (err) {
          console.error('Impossible de mettre à jour la discussion :', err);
          res.status(500).json({ error: 'Impossible de mettre à jour la discussion' });
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
      new_name_chat: name_chat,
      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
