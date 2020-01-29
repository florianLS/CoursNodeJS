module.exports = (app) => {

    app.get('/', (req, res) => {
        let Controller = require("../controllers/HomeController.js");
        let Home = new Controller();
        Home.print(req, res);
    })
    
    app.get('/inscription', (req, res) => {
        let Controller = require("../controllers/UserController.js");
        let User = new Controller();
        User.printForm(req, res);
    })
    
    app.post('/inscription', (req, res) => {
        let Controller = require("../controllers/UserController.js");
        let User = new Controller();
        User.process(req, res);
    })

    app.get('/connexion', (req, res) => {
        let Controller = require("../controllers/ConnexionController.js");
        let UserConnexion = new Controller();
        UserConnexion.printConnexion(req, res);
    })

    app.post('/connexion', (req, res) => {
        let Controller = require("../controllers/ConnexionController.js");
        let UserConnexion = new Controller();
        UserConnexion.verifyConnexion(req, res);
    })
}


    