const express = require('express');
const app = express();
const path = require("path");
// Pour styliser le retour du console.log (voir doc npm)
const chalk = require('chalk');
const config = require('./app/config');

const mongoose = require('mongoose');
mongoose.connect(
    config.mongodbConnectionString, 
    {useNewUrlParser: true, useUnifiedTopology: true }
)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log(`Connexion au serveur OK`)});

//Pour hasher le password
var bcrypt = require('bcryptjs');


app.set('views', path.join(__dirname, 'templates'))
//Préciser que les fichiers sont en extension pug
app.set('view engine', 'pug')
//dit à express de tolérer ce dossier,(accès public)
app.use(express.static(path.join(__dirname, 'public')));

//Pour le formulaire
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/inscription', function(req, res) {
    res.render("inscription")
})

app.post('/inscription', (req, res) => {
    //req.body pour recevoir les valeurs de touts les champs du form / req.body.nameduchampduform pour ciblé une valeur précise
    // le console.log s'affiche seulement dans le terminal et pas dans le navigateur

    var formSchema = new mongoose.Schema({
        civilite: {type: String},
        nom: {type: String},
        prenom: {type: String},
        email: {type: String},
        password: {type: String}
      });
      var Model = mongoose.model('user', formSchema);
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      var instanceModel = new Model({
          civilite : req.body.gender,
          nom : req.body.nom,
          prenom : req.body.prenom,
          email : req.body.email,
          password : hash
      });
      instanceModel.save((err, user) => {
          console.log(err)
      });

      res.send(req.body)
})
 
app.listen(8080);