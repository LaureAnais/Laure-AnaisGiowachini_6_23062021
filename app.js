const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

// créer une application express 
const app = express();


// Utilisation de 'dotenv' pour masquer les informations de connexion via les variables environnements 
require('dotenv').config();

mongoose.connect(process.env.DB, {

    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json()); 

// app.get doit nécessairement être après app.post pour ne pas bloquer app.post

app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisation helmet pour protéger l'application de certaines vulnérabilités du Web en configurant les en-têtes HTTP
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use('/api/sauces', saucesRoutes, limiter); 
app.use('/api/auth', userRoutes, limiter);

// pour utiliser notre application express depuis notre serveur node
module.exports = app;

