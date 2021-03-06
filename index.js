const express = require('express');
const getPort = require('get-port');
const https = require('https');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

global.config = require('./config');

global.mongodb = true;

mongoose.connect(global.config.database,
    {
        useNewUrlParser: true
    }).
catch(error => function(error) {
    global.mongodb = false;
    console.log('Error connecting to MongoDB');
    console.log('-------------------------------------');
    console.log(error);
});


const app = express();
const environment = process.env.NODE_ENV || 'development';
let port;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

    port = 80;

    app.get('/', require('./functions/Misc/status'));

    var User = require('./models/User');
    var Profile = require('./models/Profile');
    var Link = require('./models/Link');
    var Theme = require('./models/Theme');

    app.use('/user', require('./functions/User'));
    app.use('/profile', require('./functions/Profile'));
    app.use('/link', require('./functions/Link'));
    app.use('/theme', require('./functions/Theme'));

    app.listen(port, () => {
        console.log(`🔗 Singlelink API listening on port ${port}`)
    })