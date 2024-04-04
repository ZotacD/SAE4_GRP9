import express from 'express';
const router = express.Router();
import {pool} from '../../server.js';

router.post('', async (req, res) => {
  let { ironprice, goldprice, diamantprice } = req.body;

  if (!req.session.isLoggedIn || req.session.category !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  if (ironprice <= 0 || goldprice <= 0 || diamantprice <= 0) {
    return res.status(400).json({ error: 'Le prix ne peut pas être négatif' });
  }

  try {
    await pool.query('UPDATE grade SET price = ? WHERE name = ?', [ironprice, 'iron']);
    await pool.query('UPDATE grade SET price = ? WHERE name = ?', [goldprice, 'gold']);
    await pool.query('UPDATE grade SET price = ? WHERE name = ?', [diamantprice, 'diamant']);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Impossible de changer le prix :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des prix' });
  }
});

export default router;