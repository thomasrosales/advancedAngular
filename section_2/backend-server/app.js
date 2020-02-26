// REQUIERES

var express = require('express');
var mongoose = require('mongoose');
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var bodyParser = require('body-parser');

// INIT

var app = express(); // CREATE SERVIDOR

// INIT BODY PARSER

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// BBDD
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/HospitalDB');

// ROUTES

/*app.get('/', (req, res, next) => {
    res.status(200).json({
        status: true,
        description: 'ok'
    }); // EVERYTHING OK
});*/

//MIDDLEWARE
app.use('/hospital', hospitalRoutes); //SIEMPRE ARRIBA DE /
app.use('/login', loginRoutes); //SIEMPRE ARRIBA DE /
app.use('/user', userRoutes); //SIEMPRE ARRIBA DE /
app.use('/', appRoutes);

// LISTENERS

app.listen(3000, () => {
    console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');
});