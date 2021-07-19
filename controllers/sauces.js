
const Sauce = require('../models/sauces');

// récupère fonction fs pour pouvoir lire / modifier / mettre à jour les fichiers
const fs = require('fs');
const sauces = require('../models/sauces');

// Création d'une sauce 
exports.createSauce = (req, res, next) => {
    // req.body.sauce est un objet javascript sous forme de chaîne de caractère (analyse de la chaîne puis transformation en objet)
    const sauceObject = JSON.parse(req.body.sauce);
    // identifiant généré automatiquement par MongoDB - doit être supprimé
    delete sauceObject._id;
    const sauce = new Sauce({
        // opérateur spread : utilisé pour copier tous les éléments de req.body
        ...sauceObject,
        // modifier la route POST - modifier l'URL des images enregistrées car elle ne vient plus depuis le frontend // en dynamique 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // sauvegarde la sauce dans la base de données 
    sauce.save()
    // réponse à la frontend pour éviter l'expiration de la requête  
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
      
};

 
// Récupérer une seule sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id:req.params.id})
        .then(sauce => res.status(201).json({sauce}))
        .catch(error => res.status(404).json({ error }));

};

// Obtenir toutes les sauces - renvoie le tableau de toutes les sauces présentes dans la base de données
exports.getAllSauces = (req, res, next) => {
    // On récupère l'id des paramètres de route
    Sauce.find()
    .then(sauces => res.status(200).json({sauces}))
    .catch(error => res.status(400).json({ error })); 
}; 


// Modifier une sauce 
exports.modifySauce = (req, res, next) => {
    // si req.file existe (il y a déjà une image enregistrée mais on souhaite la modifiée), il faut le prendre en compte. On récupère avec JSON.parse les informations et on va générer l'image URL (car il s'agit d'une nouvelle image)
    const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));   
};

// Supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

// ajouter la gestion des likes via exports 