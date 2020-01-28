const express = require('express')
const app = express()
const path = require("path")
 
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
//dit à express de tolérer ce dossier,(accès public)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index')
})
 
app.listen(8080);