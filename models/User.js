const mongoose = require('mongoose');
//Pour hasher le password
const bcrypt = require('bcryptjs');

var formSchema = new mongoose.Schema({
    civilite: {type: String},
    nom: {type: String},
    prenom: {type: String},
    email: {type: String},
    password: {type: String}
});
const Model = mongoose.model('User', formSchema);

module.exports = class User {

    create(civility, lastname, firstname, email, password) {
        
        let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        var instanceModel = new Model({
            civilite : civility,
            nom : lastname,
            prenom : firstname,
            email : email,
            password : hash
        });
        instanceModel.save((err, user) => {
            console.log(err)
        });
    }

    mailVerify(mail) {
        return new Promise((resolve, rejected) => {
            // On recherche l'email

           Model.findOne({ email : mail }).exec((err, user) => {
               // Si il y a une erreur (pas de résultat)
               if (err !== null || user === null) resolve(false);
               resolve(true);
           })
       })
    }

    connexionVerify(mail, password) {
        
        return new Promise((resolve, rejected) => {
            // On recherche l'email

           Model.findOne({ email : mail }).exec((err, user) => {
               // Si il y a une erreur (pas de résultat)
               if (err !== null || user === null) resolve(false);
               
               else {
                    if(bcrypt.compareSync(password, user.password)) {
                        resolve(user);
                    }
                    else {
                        resolve(false);
                    }
               }

           })
       })
    }
}
