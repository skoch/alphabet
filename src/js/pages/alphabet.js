import $ from 'jquery';
// import ColorThief from 'color-thief';
// no workie -- missing __VERSION__
// see: https://github.com/liftoff/HumanInput/issues/4
// import HumanInput from 'humaninput';
import HumanInput from 'humaninput/dist/humaninput-full.min';

const transitions = require('../components/css-transitions');

const ColorThief = require('color-thief-browser');
const imagesLoaded = require('imagesloaded');
// const cookie = require('cookie');

const colorThief = new ColorThief();
const hi = new HumanInput(window);
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const images = {
    a: ['apple', 'alligator', 'ant'],
    b: ['banana', 'bear-alt', 'bread', 'butter', 'butterfly'],
    c: ['carrot', 'cow', 'crow', 'cat'],
    d: ['duck', 'dandelion', 'dolphin', 'dog'],
    e: ['eggplant', 'eggs', 'elephant', 'eagle-alt'],
    f: ['fig', 'fox', 'fish', 'frog', 'feather'],
    g: ['garlic', 'glasses', 'giraffe', 'goldfish', 'goat'],
    h: ['honey', 'honeydew', 'horse', 'hammer'],
    i: ['iguana-alt', 'ice-cream'],
    j: ['jaguar-alt'],
    k: ['kangaroo', 'key', 'knife'],
    l: ['lion', 'lemon', 'leaves', 'lollipop'],
    m: ['monkey', 'mouse', 'matches'],
    n: ['nectarine', 'newspaper', 'nickel'],
    o: ['octopus-alt', 'owl', 'orange', 'onion'],
    p: ['penguin', 'pig', 'pineapple-alt', 'pear', 'peanut'],
    q: ['quince', 'quarter'],
    r: ['rattlesnake', 'rabbit', 'rooster'],
    s: ['sheep', 'shells', 'ship', 'stones'],
    t: ['tomato', 'tree', 'tarantula', 'tiger-alt', 'turtle', 'trumpet', 'telephone'],
    u: ['umbrella'],
    v: ['vulture', 'violin'],
    w: ['woodpecker', 'watermelon', 'wolf'],
    x: ['xylophone'],
    y: ['yam'],
    z: ['zebra'],
};

var _mode = 1;
var godMode;
var signals;
var currentLetter;
var currentSelection;

function _setActiveObject() {
    // console.log('_setActiveObject');
    const letterImages = images[currentLetter];
    const image = letterImages[Math.floor(Math.random() * letterImages.length)];
    console.log('data', currentLetter, image);
    // storage
    localStorage.currentLetter = currentLetter;
    // for single, we only need to keep the `previousSelection` here
    // const choices = $(`.letter-${currentLetter}`);
    const previousSelection = currentSelection;
    // const selection = choices[Math.floor(Math.random() * choices.length)];
    // currentSelection = selection;
    currentSelection = $(`.letter-${currentLetter}`);
    // console.log('currentSelection', currentSelection);

    // imagesLoaded.makeJQueryPlugin($);
    // $('.content').imagesLoaded(() => {
    //     console.log('images be loaded');
    //     // _setActiveObject();
    // });

    // single
    // currentSelection = $('.content');
    // console.log('selection', selection);

    // if (!$('.title').hasClass('fade')) {
    //     $('.title').addClass('fade');
    // }
    if (previousSelection) {
        $(previousSelection).removeClass('active');
        // remove word/letter
        if (_mode === 2) {
            $(previousSelection).find('.word').removeClass('in');
        }
    }

    const img = new Image();
    img.onload = function() {
        // console.log('whee load', $(this).attr('src'));
        $(`.container[data-letter*='${currentLetter}']`).find('.object').append(this);

        const colors = colorThief.getPalette(this, 2);

        // storage
        localStorage.fontColor = `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`;
        localStorage.gradientStartColor = `rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 1)`;
        localStorage.gradientEndColor = `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 1)`;

        $('.word').css({
            color: localStorage.fontColor,
        });
        $('.alphabet').css({
            background: `linear-gradient(to bottom, ${localStorage.gradientStartColor} 0%, ${localStorage.gradientStartColor} 50%, ${localStorage.gradientEndColor} 50%, ${localStorage.gradientEndColor} 100%)`,
        });
        $(currentSelection).addClass('active');
    };
    $(`.container[data-letter*='${currentLetter}']`).find('.object').empty();
    img.src = `/images/${currentLetter}/${image}.png`;

    // const img = $(currentSelection).find('img');
    // const colors = colorThief.getPalette(img[0], 2);
    // // storage
    // localStorage.fontColor = `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`;
    // localStorage.gradientStartColor = `rgba(${colors[1][0]}, ${colors[1][1]},
    // ${colors[1][2]}, 1)`;
    // localStorage.gradientEndColor = `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 1)`;

    // // document.cookie = cookie.serialize('fontColor', localStorage.fontColor);
    // // document.cookie = cookie.serialize('gradientStartColor', localStorage.gradientStartColor);
    // // document.cookie = cookie.serialize('gradientEndColor', localStorage.gradientEndColor);
    // // console.log('cookie', cookie);
    // $('.word').css({
    //     // textShadow: `6px 4px 20px rgba(${colors[2][0]},
    //     // ${colors[2][1]}, ${colors[2][2]}, 1)`,
    //     color: localStorage.fontColor,
    // });
    // // $('.alphabet').css({
    // //     background: `linear-gradient(to bottom, ${localStorage.gradientStartColor} 0%,
    // ${localStorage.gradientStartColor} 50%, ${localStorage.gradientEndColor} 50%,
    // ${localStorage.gradientEndColor} 100%)`,
    // // });
    // // $(currentSelection).addClass('in');
}

function _space(event) {
    currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    console.log('_space', currentLetter);
    _setActiveObject();
}

function _toggleGodMode(event, key, code) {
    godMode = !godMode;
    console.log('godMode:', godMode);
}

function _whatKey(event, key, code) {
    // if (!godMode) {
    //     return;
    // }
    // const regex = /^[a-z]$/;
    const regex = /^[a-z]$/;
    if (regex.test(key)) {
        // if (currentLetter === key) {
        //     return;
        // }
        switch (_mode) {
        case 1 :
            // for younger kids, random selection of selected letter
            currentLetter = key;
            _setActiveObject();
            break;
        case 2 : {
            // if the keypress === current letter and it's not yet in
            const sel = $(currentSelection);
            if (key === currentLetter) {
                if (!sel.find('.word').hasClass('in')) {
                    sel.find('.word').addClass('in');
                    // sel.find('img').removeClass('shake-horizontal shake-constant');
                }
            } else {
                // sel.find('img').addClass('shake-horizontal shake-constant');
            }
        }
            break;
        default :
            throw new Error('No case for mode', _mode);
        }
    }
}

function _setMode(event, key, code) {
    // console.log('key, code', key, code);
    _mode = parseInt(key, 0);
    // remove or add the word/letter
    // const $word = $('.content').find('.word');
    const $word = $(`.container[data-letter*='${currentLetter}']`).find('.word');
    if (_mode === 1) {
        $word.removeClass('fade');
    } else {
        $word.addClass('fade');
    }
}

function _showLetter(event, key, code) {
    if (!$(currentSelection).find('.word').hasClass('in')) {
        $(currentSelection).find('.word').addClass('in');
    }
}

// function _objectClick(e) {
//     if (!$(currentSelection).find('.word').hasClass('in')) {
//         $(currentSelection).find('.word').addClass('in');
//     }
// }

module.exports = {
    init: function(config) {
        console.log('  === home ===');
        signals = config.signals;
        // console.log('localStorage', localStorage);
        // $('.alphabet').css({
        //     background: `linear-gradient(to bottom, ${localStorage.gradientStartColor} 0%,
        // ${localStorage.gradientStartColor} 50%, ${localStorage.gradientEndColor}
        // 50%, ${localStorage.gradientEndColor} 100%)`,
        // });
        // single
        // currentLetter = $('.content').data('letter');
        currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        _setActiveObject();
        // console.log('>>>>>>>>>>>', $('.content').find('img')[0]);

        // hi.on('ctrl-1', _showLetter);
        hi.on('ctrl-1', _setMode);
        hi.on('ctrl-2', _setMode);
        // hi.on('ctrl-g', _toggleGodMode);
        // you have to enable godMode in order to use the keys for display
        hi.on('keydown', _whatKey);
        // default display for kids
        hi.on('space', _space);
        // $('.object').click(_objectClick);
        // setTimeout(() => {
        //     hi.trigger('space');
        // }, 750);
        // transitions.init();
        // transitions.config.signals['onCssTransitionEnd'].add((o) => {
        //     switch (o.data) {
        //     case 'remove' : {
        //         o.el.remove();

        //         _setObjectImage();
        //         // $('.letter').html(currentLetter.toUpperCase());
        //         // // $('.letter').addClass('in');

        //         // const imageNames = objects[currentLetter];
        //         // const image = imageNames[Math.floor(Math.random() * imageNames.length)];
        //         // $('.object img').attr('src', `images/${currentLetter}/${image}.png`);
        //         // // $('.object').addClass('in');

        //         // $('.letter-object').addClass('in');
        //         break;
        //     }
        //     default :
        //         console.log('no case for transition end');
        //     }
        // });
        // transitions.config.signals['onCssTransitionPerpetual'].add((o) => {
        //     switch (o.data) {
        //     case 'show' :
        //         // console.log('show', currentLetter);
        //         // console.log('o.el', o.el);
        //         if (!o.el.hasClass('in')) {
        //             _setObjectImage();
        //         }
        //         break;
        //     default :
        //         console.log('no case for transition perpetual');
        //     }
        // });

        // hi.on('keydown', (event) => {
        //     hi.log.info('keydown');
        // });
        // hi.on('keyup', (event) => {
        //     hi.log.info('keyup');
        // });

        // signals['domReady'].dispatch();
    },
};
