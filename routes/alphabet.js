var Express = require('express');
var fs = require('fs');

var router = Express.Router();

const imageMap = [
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
    { letter: 'e', object: 'eagle-alt' },
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

// const images = {
//     a: ['apple', 'alligator', 'ant'],
//     b: ['banana', 'bear-alt', 'bread', 'butter', 'butterfly'],
//     c: ['carrot', 'cow', 'crow', 'cat'],
//     d: ['duck', 'dandelion', 'dolphin', 'dog'],
//     e: ['eggplant', 'eggs', 'elephant', 'eagle-alt'],
//     f: ['fig', 'fox', 'fish', 'frog', 'feather'],
//     g: ['garlic', 'glasses', 'giraffe', 'goldfish', 'goat'],
//     h: ['honey', 'honeydew', 'horse', 'hammer'],
//     i: ['iguana-alt', 'ice-cream'],
//     j: ['jaguar-alt'],
//     k: ['kangaroo', 'key', 'knife'],
//     l: ['lion', 'lemon', 'leaves', 'lollipop'],
//     m: ['monkey', 'mouse', 'matches'],
//     n: ['nectarine', 'newspaper', 'nickel'],
//     o: ['octopus-alt', 'owl', 'orange', 'onion'],
//     p: ['penguin', 'pig', 'pineapple-alt', 'pear', 'peanut'],
//     q: ['quince', 'quarter'],
//     r: ['rattlesnake', 'rabbit', 'rooster'],
//     s: ['sheep', 'shells', 'ship', 'stones'],
//     t: ['tomato', 'tree', 'tarantula', 'tiger-alt', 'turtle', 'trumpet', 'telephone'],
//     u: ['umbrella'],
//     v: ['vulture', 'violin'],
//     w: ['woodpecker', 'watermelon', 'wolf'],
//     x: ['xylophone'],
//     y: ['yam'],
//     z: ['zebra'],
// };

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/* GET alphabet page. */
// router.get('/:letter([a-z]{1})', function(req, res, next) {
router.get('/', function(req, res, next) {
    // const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    // const letterImages = images[letter];
    // const image = letterImages[Math.floor(Math.random() * letterImages.length)];

    // console.log('Cookies: ', req.cookies.fontColor);

    // _writeNewBackgroundScss(req.cookies.gradientStartColor, req.cookies.gradientEndColor);

    res.render('pages/alphabet', {
        title: 'Alphabet',
        htmlClass: '',
        bodyClass: 'alphabet',
        pageJs: 'alphabet',
        alphabet: alphabet,
        // imageMap: imageMap,
        // image: image,
        // active: letter,
    });
});

module.exports = router;
