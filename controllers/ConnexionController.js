module.exports = class ConnexionController {

    printConnexion(req, response) {
        response.render('connexion');
    }

    async verifyConnexion(req, response) {
        //Traitement du formulaire
        let UserModel = require('../models/User.js');
        let User = new UserModel();
        let UserConnexion = await User.connexionVerify(req.body.pseudo, req.body.password);
        if(UserConnexion) {
            let UserExist = "Vous êtes connecté!";
            response.redirect('/');
        }
        else {
            let UserNoExist = "Identifiant ou mot de passe incorrect !";
            response.redirect('/connexion')
        }
    }


}