import express from 'express';
import multer from 'multer';
import fs from 'fs';

var storage = multer.diskStorage({
  destination: './public/products/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
    );
  },
});
const upload = multer({storage: storage});
const router = express.Router();

import {
  getGradePrices,
  ironprice,
  goldprice,
  diamantprice,
  pool,
} from '../server.js';

router.get('', async (req, res) => {
  try {
    if (!req.session.isLoggedIn || req.session.category !== 'admin') {
      res.redirect('/login?returnUrl=/admin');
      return;
    }

    getGradePrices();

    res.render('admin', {
      ironprice,
      goldprice,
      diamantprice,
      xpAmount: process.env.XP_AMOUNT,
      xpThreshold: process.env.XP_THRESHOLD,
    });
  } catch (err) {
    console.error('Erreur lors du traitement des requêtes SQL :', err);
    // Gérer l'erreur comme vous le souhaitez
    res.status(500).send("Une erreur s'est produite");
  }
});

router.get('/products', async (req, res) => {
  //Show all product, with the possibility to edit them and add new ones

  try {
    if (!req.session.isLoggedIn || req.session.category !== 'admin') {
      res.redirect('/login?returnUrl=/admin/products');
      return;
    }

    const [products] = await pool.query(
      'SELECT product.*, COUNT(transaction_id) as sales_count FROM product LEFT JOIN transactionContent ON product.id = transactionContent.product_id WHERE product.id <> 1 GROUP BY (product.id)'
    );

    res.render('admin-products', {
      products,
    });
  } catch (err) {
    console.error('Erreur lors du traitement des requêtes SQL :', err);
    // Gérer l'erreur comme vous le souhaitez
    res.status(500).send("Une erreur s'est produite");
  }
});

export default router;
