var express = require('express');

var router = express.Router();

/* GET pagename. */
router.get('/', function(req, res, next) {
    res.render('pages/pagename', {
        title: 'Hard Candy Shell - Pagename',
        bodyClass: 'pagename fade',
        htmlClass: 'pagename-background',
        pageJs: 'pagename',
    });
});

module.exports = router;
