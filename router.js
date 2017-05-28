var express = require('express');
var app = express();
var port = process.env.PORT || 3000;



app.set('view engine', 'ejs');

//var router3 = require('./app/router3');
//router3(app);

var api = require('./app/api');
app.use(api);


app.listen(port);
console.log('Server running on port: ' + port);