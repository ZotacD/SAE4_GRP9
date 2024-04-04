import express from 'express';
const router = express.Router();
import {pool} from '../../server.js';

router.post('', async (req, res) => {
  try {
    let id_chat = -1;
    const name_chat = req.body["name_chat"];

    const result = await pool.query(
        'INSERT INTO chat (id_chat, name_chat) VALUES (NULL, ?)',
        [name_chat],
      )

    id_chat = result[0].insertId;

    res.json({
        id_chat: id_chat,
        name_chat: name_chat,
        success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
