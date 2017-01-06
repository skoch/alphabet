import $ from 'jquery';
// import ColorThief from 'color-thief';
// no workie -- missing __VERSION__
// see: https://github.com/liftoff/HumanInput/issues/4
// import HumanInput from 'humaninput';
import HumanInput from 'humaninput/dist/humaninput-full.min';

const transitions = require('../components/css-transitions');
// const average = require('image-average-color');
// const fs = require('fs');

const ColorThief = require('color-thief-browser');

const colorThief = new ColorThief();
const hi = new HumanInput(window);
const objects = {
    a: ['alligator', 'apple'],
    b: ['bear', 'banana'],
    c: ['carrot', 'cow'],
    d: ['dandelion', 'duck'],
    e: ['eggplant', 'eggs', 'elephant'],
    f: ['fig', 'fox'],
    g: ['garlic', 'giraffe', 'goldfish'],
    h: ['honeydew', 'honey', 'horse'],
    i: ['iguana-alt'],
    j: ['jaguar-alt'],
    k: ['kangaroo'],
    l: ['lion'],
    m: ['meerkat-alt'],
    n: ['nectarine'],
    o: ['octopus-alt'],
    p: ['penguin'],
    q: ['quince'],
    r: ['rattlesnake'],
    s: ['sheep'],
    t: ['tomato', 'tree', 'tarantula', 'tiger-alt'],
    u: ['umbrella'],
    v: ['vulture'],
    w: ['woodpecker'],
    x: ['xylophone'],
    y: ['yam'],
    z: ['zebra'],
};
var signals;
var currentLetter;

// console.log('home.js fs', fs.readFile);

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

function _setObjectImage() {
    // console.log('_setObjectImage');
    $('.letter').html(currentLetter.toUpperCase());
    const imageNames = objects[currentLetter];
    const image = imageNames[Math.floor(Math.random() * imageNames.length)];
    $('.object img').attr('src', `images/${currentLetter}/${image}.png`);
    setTimeout(() => {
        const img = $('.object').find('img');
        const [red, blue, green] = colorThief.getColor(img[0]);
        // console.log('>>>', colorThief.getPalette(img[0], 2));
        const colors = colorThief.getPalette(img[0], 2);
        // $('.letter').css({
        //     backgroundColor: `rgba(${red}, ${blue}, ${green}, 0.5)`,
        //     color: `rgb(${red}, ${blue}, ${green})`,
        // });
        $('.letter').css({
            backgroundColor: `rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 1)`,
            color: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`,
        });
        $('.letter-object').css({
            backgroundColor: `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 1)`,
        });
        $('.letter-object').addClass('in');
    }, 250);
}

function _objectClick(e) {
    console.log('_objectClick');
    if (!$('.letter').hasClass('in')) {
        $('.letter').addClass('in');
    }
}

module.exports = {
    init: function(config) {
        console.log('  === home ===');
        signals = config.signals;

        // const $colorTest = $('.color-test');
        // const $image = $colorTest.find('img');
        // console.log('$image', $image);
        // console.log('$image[0]', $image[0]);
        // console.log('colorThief', colorThief.getColor($('.color-test').find('img')[0]));

        hi.on('keydown', _whatKey);
        $('.object').click(_objectClick);

        transitions.init();
        transitions.config.signals['onCssTransitionEnd'].add((o) => {
            switch (o.data) {
            case 'remove' : {
                o.el.remove();

                _setObjectImage();
                // $('.letter').html(currentLetter.toUpperCase());
                // // $('.letter').addClass('in');

                // const imageNames = objects[currentLetter];
                // const image = imageNames[Math.floor(Math.random() * imageNames.length)];
                // $('.object img').attr('src', `images/${currentLetter}/${image}.png`);
                // // $('.object').addClass('in');

                // $('.letter-object').addClass('in');
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
                    _setObjectImage();
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
