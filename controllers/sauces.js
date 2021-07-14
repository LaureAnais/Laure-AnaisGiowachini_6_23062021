// récupère fonction fs pour pouvoir lire / modifier / mettre à jour les fichiers
const fs = require('fs');

const Sauce = require('../models/sauces');


exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
      
};

// via un tableau de sauce 
exports.getOneSauce = (req, res, next) => {
    
}

// Obtenir toutes les sauces - renvoie le tableau de toutes les sauces présentes dans la base de données
exports.getAllSauces = (req, res, next) => {
    
}

// Modifier une sauce 
exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    
};

// Supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

// ajouter la gestion des likes via exports