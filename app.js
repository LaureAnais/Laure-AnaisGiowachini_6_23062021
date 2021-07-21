const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


// créer une application express 
const app = express();

mongoose.connect('mongodb+srv://projet6:projet6.OC!2021@cluster0.iigxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
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

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use('/api/sauces', saucesRoutes); 
app.use('/api/auth', userRoutes);


// pour utiliser notre application express depuis notre serveur node
module.exports = app;

