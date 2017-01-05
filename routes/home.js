var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/home', {
        title: 'Alphabet',
        htmlClass: '',
        bodyClass: 'home fade',
        pageJs: 'home',
    });
});

module.exports = router;
