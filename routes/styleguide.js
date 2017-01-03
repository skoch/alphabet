var express = require('express');

var router = express.Router();

/* GET styleguide. */
router.get('/', function(req, res, next) {
    res.render('pages/styleguide', {
        title: 'Hard Candy Shell - Styleguide',
        bodyClass: 'Styleguide fade',
        htmlClass: 'styleguide-background',
        pageJs: 'styleguide',
    });
});

module.exports = router;
