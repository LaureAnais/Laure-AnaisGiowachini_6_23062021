/*const passwordValidator = require('validpassword');

// Création d'un schéma de validation de password
const schema = new passwordValidator();

// Ajout des informations sur la validation du password
schema
.is().min(8)                                    // Minimum longueur 8
.is().max(100)                                  // Maximum longeur 100
.has().uppercase()                              // Doit avoir des majuscules
.has().lowercase()                              // Doit avoir des minuscules
.has().digits(2)                                // Doit avoir au moins 2 chiffres
.has().not().spaces()                           // Ne doit pas avoir d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist les éléments suivants
 
// Validation against a password string
console.log(schema.validate('validPASS123'));
// => true
console.log(schema.validate('invalidPASS'));
// => false
 
// Get a full list of rules which failed
console.log(schema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ] */