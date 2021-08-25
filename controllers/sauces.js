const Sauce = require('../models/sauces');

// récupère fonction fs pour pouvoir lire / modifier / mettre à jour les fichiers
const fs = require('fs');

// Récupérer une seule sauce 
exports.getOneSauce = (req, res, next) => {
    // On récupère l'id des paramètres de route
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {res.status(200).json(sauce);})
      .catch((error) => {res.status(404).json({error: error});});
  };

// Création d'une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // identifiant généré automatiquement par MongoDB - doit être supprimé
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    // sauvegarde la sauce dans la base de données 
    sauce.save()
    // réponse à la frontend pour éviter l'expiration de la requête  
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch((error) => {res.status(400).json({error})});
      
};

// Obtenir toutes les sauces - renvoie le tableau de toutes les sauces présentes dans la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch((error) => {res.status(400).json({error})});
};
 

// Modifier une sauce 
// si req.file existe (il y a déjà une image enregistrée mais on souhaite la modifiée), il faut le prendre en compte. On récupère avec JSON.parse les informations et on va générer l'image URL (car il s'agit d'une nouvelle image)
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Likes & Dislikes de sauce 
exports.likeDislike = (req, res, next) => {
  if (req.body.like === 1)
  // Création d'un like (avoir 1 sauce / 1 utilisateur (userId) / agrémenter la sauce d'un like)
    Sauce.updateOne({_id: req.params.id} , {$inc: {likes: 1 } , $set : {usersLiked: req.body.userId} })
    .then(() => res.status(200).json({ message: 'Sauce likée !'}))
    .catch((error) => {res.status(404).json({error});});

   // Si l'utilisateur ne veut pas liker / Alors il veut dislike  
   else if (req.body.like === -1) 
   // Création d'un dislike (on retire 1 like à 1 sauce)
    Sauce.updateOne({_id: req.params.id} , {$inc: {dislikes: 1 } , $set: {usersDisliked: req.body.userId} })
    .then(() => res.status(200).json({ message: 'Un dislike ajouté :( '}))
    .catch((error) => {res.status(404).json({error});});

   else {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => { 
      if (sauce.usersLiked.includes(req.body.userId)) { 
        Sauce.updateOne({_id: req.params.id} , {$inc: {likes: -1 } , $pull: {usersLiked: req.body.userId} })
          .then(() => res.status(200).json({ message: 'Un like enlevé :( '}))
          .catch((error) => {res.status(404).json({error});});
      }
      else {
        Sauce.updateOne({_id: req.params.id} , {$inc: {dislikes: -1 } , $pull: {usersDisliked: req.body.userId} })
          .then(() => res.status(200).json({ message: 'Un dislike enlevé :) '}))
          .catch((error) => {res.status(404).json({error});});
      }
    })
   } 

}; 
