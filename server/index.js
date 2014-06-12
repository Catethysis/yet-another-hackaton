var Express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = Express();

app.get('/', function(req, res) {

    res.send('hello');

});

var sock = path.join(__dirname, 'run', 'index.sock');
fs.unlinkSync(sock);
console.log(sock);
app.listen(sock);