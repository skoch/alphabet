var Express = require('express');

var router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('pages/table-of-contents', {
        title: 'Table of Contents',
        htmlClass: 'table-of-contents-background',
        bodyClass: 'table-of-contents fade',
        pageJs: 'table-of-contents',
        sections: [
            [
                {
                    label: 'Styleguide',
                    url: 'styleguide',
                },
            ],
        ],
    });
});

module.exports = router;
