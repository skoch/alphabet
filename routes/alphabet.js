var Express = require('express');
var fs = require('fs');

var router = Express.Router();

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/* GET alphabet page. */
// router.get('/:letter([a-z]{1})', function(req, res, next) {
router.get('/', function(req, res, next) {
    res.render('pages/alphabet', {
        title: 'Alphabet',
        htmlClass: '',
        bodyClass: 'alphabet',
        pageJs: 'alphabet',
        alphabet: alphabet,
    });
});

module.exports = router;
