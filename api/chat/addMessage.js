import express from 'express';
import {pool} from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    let id_message = -1;
    const id_chat = req.body["id_chat"];
    const email = req.body["email"];
    const content = req.body["content"];
    const send_date = new Date();

    const result = await pool.query(
        'INSERT INTO message (id_message, id_chat, email, content, send_date) VALUES (NULL, ?, ?, ?, ?)',
        [id_chat, email, content, send_date],
      );
      
    id_message = result[0].insertId;

    res.json({
        id_message: id_message,
        success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
