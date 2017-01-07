var Express = require('express');

var router = Express.Router();

const alphabet = [
    { letter: 'a', object: 'apple' },
    { letter: 'a', object: 'alligator' },
    { letter: 'b', object: 'banana' },
    { letter: 'b', object: 'bear-alt' },
    { letter: 'c', object: 'carrot' },
    { letter: 'c', object: 'cow' },
    { letter: 'd', object: 'duck' },
    { letter: 'd', object: 'dandelion' },
    { letter: 'e', object: 'eggplant' },
    { letter: 'e', object: 'eggs' },
    { letter: 'e', object: 'elephant' },
    { letter: 'f', object: 'fig' },
    { letter: 'f', object: 'fox' },
    { letter: 'g', object: 'garlic' },
    { letter: 'g', object: 'giraffe' },
    { letter: 'g', object: 'goldfish' },
    { letter: 'h', object: 'honey' },
    { letter: 'h', object: 'honeydew' },
    { letter: 'h', object: 'horse' },
    { letter: 'i', object: 'iguana-alt' },
    { letter: 'j', object: 'jaguar-alt' },
    { letter: 'k', object: 'kangaroo' },
    { letter: 'l', object: 'lion' },
    { letter: 'm', object: 'meerkat-alt' },
    { letter: 'n', object: 'nectarine' },
    { letter: 'o', object: 'octopus-alt' },
    { letter: 'p', object: 'penguin' },
    { letter: 'q', object: 'quince' },
    { letter: 'r', object: 'rattlesnake' },
    { letter: 's', object: 'sheep' },
    { letter: 't', object: 'tomato' },
    { letter: 't', object: 'tree' },
    { letter: 't', object: 'tarantula' },
    { letter: 't', object: 'tiger-alt' },
    { letter: 'u', object: 'umbrella' },
    { letter: 'v', object: 'vulture' },
    { letter: 'w', object: 'woodpecker' },
    { letter: 'x', object: 'xylophone' },
    { letter: 'y', object: 'yam' },
    { letter: 'z', object: 'zebra' },
];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/home', {
        title: 'Alphabet',
        htmlClass: '',
        bodyClass: 'home fade',
        pageJs: 'home',
        alphabet: alphabet,
    });
});

module.exports = router;
