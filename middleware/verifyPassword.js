const passwordSchema = require('../models/password');

// vérifie que le mot de passe valide le schema décrit
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Votre mot de passe doit contenir les éléments suivants : 8 caractères minimun, au moins 1 majuscule, 1 minuscule et 2 chiffres. Il doit être sans espace"}', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect, merci de le revoir.');
    } else {
        next();
    }
}; 