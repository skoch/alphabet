var express = require('express');

var router = express.Router();

const colorPool = [
    'no-idea',
    'eagle',
    'leaves',
    'quince',
    'lemon',
    'lollipop',
    'dolphin',
    'umbrella',
];
/* GET home. */
router.get('/', function(req, res, next) {
    const rando = colorPool[Math.floor(Math.random() * colorPool.length)];
    res.render('pages/home', {
        title: 'The Alphabet',
        bodyClass: `home ${rando}`,
        htmlClass: 'home-background',
        pageJs: 'home',
    });
});

module.exports = router;
