/*const emailSchema = require('../models/email');

// vérifie que l'email est valide par rapport au schema décrit
module.exports = (req, res, next) => {
    if (!emailSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Votre est incorrect"}', {
            'content-type': 'application/json'
        });
        res.end('Email incorrect, merci de le revoir.');
    } else {
        next();
    }
}; */