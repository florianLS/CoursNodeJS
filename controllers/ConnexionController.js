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
            req.session.user = {
                prenom : UserConnexion.prenom,
                nom:  UserConnexion.nom
            };
            req.flash('connect', 'Vous êtes connecté! Welcome : )');
            response.render('index');
        }
        else {
            req.flash('error', 'Cet identifiant ou ce mot de passe n\'existe pas!');
            response.render('connexion')
        }
    }

    deconnexion(req, response) {
        req.session.user = null;
        req.flash('connect', 'Vous êtes déconnecté. A bientôt !');
        response.redirect('/');
    }
}