const express = require('express');
const app = express();
const path = require("path");
// Pour styliser le retour du console.log (voir doc npm)
const chalk = require('chalk');

//Charge fichier config pour connexion à mongoDB
const config = require('./app/config.js');

const mongoose = require('mongoose');
mongoose.connect(
    config.mongodbConnectionString, 
    {useNewUrlParser: true, useUnifiedTopology: true }
)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log(chalk.bgGreenBright.black.bold(`Connexion au serveur OK`))});

//Pour le formulaire
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

//dit à express de tolérer ce dossier,(accès public)
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'templates'));
//Préciser que les fichiers sont en extension pug
app.set('view engine', 'pug');
//Permet de créer des SESSION une fois utilisateur connecté
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}))
// permet de renvoyer les sessions à la vue
app.use((req,res,next) => {
    res.locals.session = req.session; next();
});
// permet de gérer les flashbag
var flash = require('express-flash');
app.use(flash());

//Routes 
require("./app/routes.js")(app);

 
app.listen(config.port);