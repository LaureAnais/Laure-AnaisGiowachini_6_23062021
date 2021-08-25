const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CryptoJS = require("crypto-js");
require('dotenv').config();

const passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
 .is().min(8)                                    // Minimum length 8
 .is().max(100)                                  // Maximum length 100
 .has().uppercase()                              // Must have uppercase letters
 .has().lowercase()                              // Must have lowercase letters
 .has().digits(2)                                // Must have at least 2 digits
 .has().not().spaces()                           // Should not have spaces
 .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 

exports.signup = (req, res, next) => {
  if(passwordSchema.validate(req.body.password)){
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const cryptEmail = CryptoJS.HmacSHA512(req.body.email, process.env.cleemail).toString();
      const user = new User({
        email: cryptEmail,
        password: hash,
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {console.log(error);
          res.status(400).json({ error })});
    })
    .catch(error => res.status(500).json({ error }));
  } else { 
       res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces"}', {
      'content-type': 'application/json'
      });   
   }  
};

exports.login = (req, res, next) => {
  const cryptEmail = CryptoJS.HmacSHA512(req.body.email, process.env.cleemail).toString();
  User.findOne({ email: cryptEmail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              // renforcer la sécurité de l'identification
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};