var express = require('express');

var router = express.Router();

/* GET home. */
router.get('/', function(req, res, next) {
    res.render('pages/home', {
        title: 'Hard Candy Shell - home',
        bodyClass: 'home fade',
        htmlClass: 'home-background',
        pageJs: 'home',
    });
});

module.exports = router;
