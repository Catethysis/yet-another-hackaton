var Express = require('express'),
    app = Express(),
    dbController = require('./controllers/db');

module.exports = function(sock) {

    //logger
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });

    app.get('/', function(req, res) {

        res.send('hello');

    });

    app.get('/get/', dbController.get);
    app.get('/post/', dbController.post);

    app.listen(sock);
    console.log('start listening socket: ', sock);

}
