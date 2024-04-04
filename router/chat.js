import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
import {pool} from '../server.js';

import dotenv from 'dotenv';
dotenv.config();

router.get('/create', async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

  try {
    res.render("createChat", {
      email: req.session.email
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/all', async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/login');
    return;
  }

    try {
      res.render("listChats", {
        email: req.session.email
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    }
  });

  router.get('/:id_chat', async (req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect('/login');
      return;
    }
    
    try {
        const id_chat = req.params.id_chat;

        let response = await fetch('https://localhost:'+ process.env.PORT +'/api/chat/getChat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({id_chat: id_chat}),
          });
        let data = await response.json();

        if(!data.success) {
          res.redirect("/")
          return;
        }

        const name_chat = data["name_chat"]

        response = await fetch('https://localhost:'+ process.env.PORT +'/api/chat/getMessages', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({id_chat: id_chat})
        });
        data = await response.json();

        const messages = data["messages"]

        response = await fetch('https://localhost:'+ process.env.PORT +'/api/chat/getConnections', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({id_chat: id_chat})
        });
        data = await response.json();

        const connections = data["connections"]

        if(!connections.map((connection) => connection.email).includes(req.session.email)) {
          res.redirect("/chat/create")
          return;
        }

        res.render("chat", {
            id_chat: id_chat,
            name_chat: name_chat,
            email: req.session.email,
            messages: messages,
            connections: connections,
            username: req.session.username,
            port: process.env.PORT,
            host: process.env.HOST
        })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    }
  });

export default router;
