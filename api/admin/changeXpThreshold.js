import express from 'express';
const router = express.Router();

router.post('', async (req, res) => {
  if (!req.session.isLoggedIn || req.session.category !== 'admin') {
    res.status(403).json({error: 'Accès refusé'});
    return;
  }

  if (
    !req.body.xpThreshold ||
    //isNaN(Number(req.body.xpThreshold)) ||
    parseInt(req.body.xpThreshold) < 0
  ) {
    res.status(400).json({error: 'Veuillez entrer un nombre valide'});
    return;
  }
  
  var xpThreshold = req.body.xpThreshold;

  process.env.XP_THRESHOLD = xpThreshold;
  console.log(process.env.XP_THRESHOLD);
  res.status(200).json({success: true});
});

export default router;
