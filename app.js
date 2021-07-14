const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const saucesRoutes = require('./models/sauces')

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://lagiowachini:uyjlte5dSGio!MO@cluster0.iigxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majorit', { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// créer une application express 
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());  
app.use('/api/sauces', saucesRoutes),
app.use('/api/auth', userRoutes);


// pour utiliser notre application express depuis notre serveur node
module.exports = app;

