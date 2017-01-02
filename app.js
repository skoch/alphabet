var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var auth = require('http-auth');

// Pages
var tableOfContents = require('./routes/table-of-contents');
var styleguide = require('./routes/styleguide');
// ~ dynamically generated ~ 0 ~

var app = express();
var basic;
var development = app.get('env') !== 'production';

// http-auth
if (!development) {
    basic = auth.basic({
        realm: 'Clients Only.',
        file: path.join(__dirname, '/../data/users.htpasswd'),
    });
    app.use(auth.connect(basic));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Set our global app-wide local variables
Object.assign(app.locals, {
    // Set the SVG spritesheet contents as a globally available variable
    svgSprite: fs.readFileSync('./dist/images/svg-sprites.svg', 'utf8'),
});

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(__dirname, 'dist/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// Define/declare routes
app.use('/', tableOfContents);
app.use('/styleguide', styleguide);
// ~ dynamically generated ~ 1 ~

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

module.exports = app;
