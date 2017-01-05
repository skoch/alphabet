import $ from 'jquery';
// import ColorThief from 'color-thief';
// no workie -- missing __VERSION__
// see: https://github.com/liftoff/HumanInput/issues/4
// import HumanInput from 'humaninput';
import HumanInput from 'humaninput/dist/humaninput-full.min';

const transitions = require('../components/css-transitions');
// const average = require('image-average-color');
// const fs = require('fs');

// const ColorThief = require('color-thief');

// const colorThief = new ColorThief();
const hi = new HumanInput(window);
const objects = {
    a: ['alligator'],
    b: ['bear'],
    c: ['carrot', 'cow-alt'],
    d: ['dandelion', 'duck'],
    e: ['eggplant', 'eggs', 'elephant'],
    f: ['fig', 'fox'],
    g: ['garlic', 'giraffe', 'goldfish'],
    h: ['honeydew', 'honey', 'horse'],
    i: ['iguana'],
    j: ['jaguar-alt'],
    k: ['kangaroo'],
    l: ['lion'],
    m: ['meerkat-alt'],
    n: ['nectarine'],
    o: ['octopus'],
    p: ['penguin'],
    q: ['quince'],
    r: ['rattlesnake'],
    s: ['sheep'],
    t: ['tomato'],
    u: ['umbrella'],
    v: ['vulture'],
    w: ['woodpecker'],
    x: ['penguin'],
    y: ['penguin'],
    z: ['zebra'],
};
var signals;
var currentLetter;

// console.log('ColorThief', ColorThief);
// console.log('colorThief', colorThief);
// console.log('home.js fs', fs.readFile);

// average('images/a/apple.png', (err, color) => {
//     if (err) throw err;
//     console.log('color', color);
//     const [red, green, blue, alpha] = color;
// });

function _whatKey(event, key, code) {
    // console.log('event.type', event.type);
    const regex = /^[A-Za-z]$/;
    if (regex.test(key)) {
        // if (currentLetter === key) {
        //     return;
        // }
        currentLetter = key;
        if ($('.intro').length) {
            $('.intro').addClass('fade');
            return;
        }

        $('.letter-object').removeClass('in');
        // $('.letter').removeClass('in');
        // $('.object').removeClass('in');
        // $('.letter').html(currentLetter);
    }
    // hi.log.info(key, ' was pressed.  Here is the code:', code);
}

module.exports = {
    init: function(config) {
        console.log('  === home ===');
        signals = config.signals;

        hi.on('keydown', _whatKey);

        transitions.init();
        transitions.config.signals['onCssTransitionEnd'].add((o) => {
            switch (o.data) {
            case 'remove' : {
                o.el.remove();

                $('.letter').html(currentLetter.toUpperCase());
                // $('.letter').addClass('in');
                const imageNames = objects[currentLetter];
                const image = imageNames[Math.floor(Math.random() * imageNames.length)];
                $('.object img').attr('src', `images/${currentLetter}/${image}.png`);
                // $('.object').addClass('in');

                $('.letter-object').addClass('in');
                break;
            }
            default :
                console.log('no case for transition end');
            }
        });
        transitions.config.signals['onCssTransitionPerpetual'].add((o) => {
            switch (o.data) {
            case 'show' :
                // console.log('show', currentLetter);
                // console.log('o.el', o.el);
                if (!o.el.hasClass('in')) {
                    $('.letter').html(currentLetter.toUpperCase());
                    // $('.letter').addClass('in');
                    const imageNames = objects[currentLetter];
                    const image = imageNames[Math.floor(Math.random() * imageNames.length)];
                    $('.object img').attr('src', `images/${currentLetter}/${image}.png`);
                    // $('.object').addClass('in');

                    $('.letter-object').addClass('in');
                }
                break;

            default :
                console.log('no case for transition perpetual');
            }
        });
        // hi.on('keydown', (event) => {
        //     hi.log.info('keydown');
        // });
        // hi.on('keyup', (event) => {
        //     hi.log.info('keyup');
        // });

        signals['domReady'].dispatch();
    },
};
