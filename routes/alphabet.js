var Express = require('express');

var router = Express.Router();

const alphabet = [
    { letter: 'a', object: 'apple' },
    { letter: 'a', object: 'alligator' },
    { letter: 'a', object: 'ant' },
    { letter: 'b', object: 'banana' },
    { letter: 'b', object: 'bear-alt' },
    { letter: 'b', object: 'bread' },
    { letter: 'b', object: 'butter' },
    { letter: 'b', object: 'butterfly' },
    { letter: 'c', object: 'carrot' },
    { letter: 'c', object: 'cow' },
    { letter: 'c', object: 'crow' },
    { letter: 'c', object: 'cat' },
    { letter: 'd', object: 'duck' },
    { letter: 'd', object: 'dandelion' },
    { letter: 'd', object: 'dolphin' },
    { letter: 'd', object: 'dog' },
    { letter: 'e', object: 'eggplant' },
    { letter: 'e', object: 'eggs' },
    { letter: 'e', object: 'elephant' },
    { letter: 'f', object: 'fig' },
    { letter: 'f', object: 'fox' },
    { letter: 'f', object: 'fish' },
    { letter: 'f', object: 'frog' },
    { letter: 'f', object: 'feather' },
    { letter: 'g', object: 'garlic' },
    { letter: 'g', object: 'glasses' },
    { letter: 'g', object: 'giraffe' },
    { letter: 'g', object: 'goldfish' },
    { letter: 'g', object: 'goat' },
    { letter: 'h', object: 'honey' },
    { letter: 'h', object: 'honeydew' },
    { letter: 'h', object: 'horse' },
    { letter: 'h', object: 'hammer' },
    { letter: 'i', object: 'iguana-alt' },
    { letter: 'i', object: 'ice-cream' },
    { letter: 'j', object: 'jaguar-alt' },
    { letter: 'k', object: 'kangaroo' },
    { letter: 'k', object: 'key' },
    { letter: 'k', object: 'knife' },
    { letter: 'l', object: 'lion' },
    { letter: 'l', object: 'lemon' },
    { letter: 'l', object: 'leaves' },
    { letter: 'l', object: 'lollipop' },
    // { letter: 'm', object: 'meerkat-alt' },
    { letter: 'm', object: 'monkey' },
    { letter: 'm', object: 'mouse' },
    { letter: 'm', object: 'matches' },
    { letter: 'n', object: 'nectarine' },
    { letter: 'n', object: 'newspaper' },
    { letter: 'n', object: 'nickel' },
    { letter: 'o', object: 'octopus-alt' },
    { letter: 'o', object: 'owl' },
    { letter: 'o', object: 'orange' },
    { letter: 'o', object: 'onion' },
    { letter: 'p', object: 'penguin' },
    { letter: 'p', object: 'pig' },
    { letter: 'p', object: 'pineapple-alt' },
    { letter: 'p', object: 'pear' },
    { letter: 'p', object: 'peanut' },
    { letter: 'q', object: 'quince' },
    { letter: 'q', object: 'quarter' },
    { letter: 'r', object: 'rattlesnake' },
    { letter: 'r', object: 'rabbit' },
    { letter: 'r', object: 'rooster' },
    { letter: 's', object: 'sheep' },
    { letter: 's', object: 'shells' },
    { letter: 's', object: 'ship' },
    { letter: 's', object: 'stones' },
    { letter: 't', object: 'tomato' },
    { letter: 't', object: 'tree' },
    { letter: 't', object: 'tarantula' },
    { letter: 't', object: 'tiger-alt' },
    { letter: 't', object: 'turtle' },
    { letter: 't', object: 'trumpet' },
    { letter: 't', object: 'telephone' },
    { letter: 'u', object: 'umbrella' },
    { letter: 'v', object: 'vulture' },
    { letter: 'v', object: 'violin' },
    { letter: 'w', object: 'woodpecker' },
    { letter: 'w', object: 'watermelon' },
    { letter: 'w', object: 'wolf' },
    { letter: 'x', object: 'xylophone' },
    { letter: 'y', object: 'yam' },
    // { letter: 'y', object: 'yogurt' },
    { letter: 'z', object: 'zebra' },
];

/* GET home page. */
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
