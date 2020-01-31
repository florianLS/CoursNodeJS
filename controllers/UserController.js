module.exports = class UserController {

    printForm(req, response) {
        response.render('inscription')        
    }

    async process(req, response) {
        //req.body pour recevoir les valeurs de touts les champs du form / req.body.nameduchampduform pour ciblé une valeur précise
        // le console.log s'affiche seulement dans le terminal et pas dans le navigateur
        let UserModel = require('../models/User.js');
        let User = new UserModel();
        let UserEmail = await User.mailVerify(req.body.email);
        if(UserEmail) {
            req.flash('error', 'Cet Email est déjà utilisé !');
            response.redirect('/inscription');
        }
        else {
            User.create(req.body.gender, req.body.nom, req.body.prenom, req.body.email, req.body.password);
            req.flash('connect', 'Inscription réussi ! Welcome : )');
            response.redirect('/')
        }

    }
}