import express from 'express';
const router = express.Router();
import {banner} from '../../server.js';

router.post('', async (req, res) => {
  if (!req.session.isLoggedIn || req.session.category !== 'admin') {
    res.status(403).json({error: 'Accès refusé'});
    return;
  }

  if (req.session.category !== 'admin') {
    res.status(403).json({error: 'Vous ne pouvez pas faire ça'});
    console.log(
      'Tentative illégale d ajout de participant par ' + req.session.email
    );
    return;
  }
  
  try {
    const {showBanner, color, textToShow, link, linkBody} = req.body;
    banner.isShown = showBanner;
    banner.color = color;
    banner.text = textToShow;
    banner.link = link;
    banner.linkBody = linkBody;

    res.json({success: true});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
