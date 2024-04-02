import express from 'express';
import { pool } from '../../server.js';
const router = express.Router();

router.get('/:search', async (req, res) => {
  try {
    const search = req.params.search;

    await pool.query(
      'SELECT email FROM user WHERE email LIKE ?',
      [`%${search}%`],
      (err, results) => {
        if (err) {
          console.error('Impossible de rechercher les utilisateurs :', err);
          res.status(500).json({ error: 'Impossible de rechercher les utilisateurs' });
          return;
        }

        res.json({
          users: results,
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
