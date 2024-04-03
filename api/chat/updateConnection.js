import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.post('', async (req, res) => {
  try {
    const id_chat = req.body['id_chat'];
    const email = req.body['email'];
    const peer_id = req.body['peer_id'];
    const connect_date = new Date()

    if (!peer_id) {
      res.status(400).json({ error: 'L\'ID de peer est requis' });
      return;
    }

    const result = await pool.query(
      'UPDATE chat_connection SET peer_id = ?, connect_date = ? WHERE id_chat = ? AND email = ?',
      [peer_id, connect_date, id_chat, email],
    )

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Connexion non trouvée' });
      return;
    }

    res.json({
      id_chat: id_chat,
      email: email,
      peer_id: peer_id,

      success: true
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
