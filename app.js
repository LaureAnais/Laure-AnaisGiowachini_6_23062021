const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

// créer une application express 
const app = express();

// Crypto sha512 
// let hash = CryptoJS.SHA512("Message");

// Crypto ou CryptoJS??
let CryptoJS = require("crypto");

let sha512 = CryptoJS.createHash('sha512').update('Projet6Piment').digest('hex');
console.log(sha512);

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

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use('/api/sauces', saucesRoutes); 
app.use('/api/auth', userRoutes);

// pour utiliser notre application express depuis notre serveur node
module.exports = app;

