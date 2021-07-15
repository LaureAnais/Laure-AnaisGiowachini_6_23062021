const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// créer une application express 
const app = express();

// const saucesRoutes = require('./routes/sauces');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://projet6:projet6.OC!2021@cluster0.iigxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());  

app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Sauce créée !'
  });
});

 app.use('/api/sauces', saucesRoutes),
app.use("/api/auth", userRoutes);


// pour utiliser notre application express depuis notre serveur node
module.exports = app;

