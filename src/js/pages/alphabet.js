import $ from 'jquery';

// see: https://github.com/liftoff/HumanInput/issues/4
// const HumanInput = require('humaninput');
const HumanInput = require('humaninput/dist/humaninput-full.min');
const ColorThief = require('color-thief-browser');

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

var signals;
var godMode;
var mode = 1;
var currentLetter;
var currentSelection;

function randomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function setActiveObject(letter = randomLetter()) {
    currentLetter = letter;

    const letterImages = images[currentLetter];
    const image = letterImages[Math.floor(Math.random() * letterImages.length)];
    const previousSelection = currentSelection;

    // storage
    localStorage.currentLetter = currentLetter;

    currentSelection = $(`#${currentLetter.toUpperCase()}`);

    // if (!$('.title').hasClass('fade')) {
    //     $('.title').addClass('fade');
    // }
    if (previousSelection) {
        $(previousSelection).removeClass('active');
        // remove word/letter
        if (mode === 2) {
            $(previousSelection).find('.word').removeClass('in');
        }
    }

    // listen for image to load so we can get some colors
    const img = new Image();
    img.onload = function() {
        currentSelection.find('.object').append(this);
        const colors = colorThief.getPalette(this, 2);

        // storage
        localStorage.fontColor = `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`;
        localStorage.gradientStartColor = `rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 1)`;
        localStorage.gradientEndColor = `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 1)`;

        $(currentSelection).find('.word').css({
            color: localStorage.fontColor,
        });
        $('.alphabet').css({
            background: `linear-gradient(to bottom, ${localStorage.gradientStartColor} 0%, ${localStorage.gradientStartColor} 50%, ${localStorage.gradientEndColor} 50%, ${localStorage.gradientEndColor} 100%)`,
        });
        $(currentSelection).addClass('active');
    };
    currentSelection.find('.object').empty();
    img.src = `/images/${currentLetter}/${image}.png`;
}

function shake() {
    $(currentSelection).find('img').addClass('shake-horizontal shake-constant');
    setTimeout(() => {
        $(currentSelection).find('img').removeClass('shake-horizontal shake-constant');
    }, 250);
}

function space(event, key, code) {
    setActiveObject();
}

function whatKey(event, key, code) {
    // if (!godMode) {
    //     return;
    // }
    const regex = /^[a-z]$/;
    if (regex.test(key)) {
        // if (currentLetter === key) {
        //     return;
        // }
        switch (mode) {
            case 1 :
                // for younger kids, random selection of selected letter
                setActiveObject(key);
                break;
            case 2 : {
                // if the keypress === current letter and it's not yet in
                const $sel = $(currentSelection);
                if (key === currentLetter && !$sel.find('.word').hasClass('in')) {
                    $sel.find('.word').addClass('in');
                } else {
                    shake();
                }
            }
                break;
            default :
        }
    }
}

function setMode(event, key, code) {
    // console.log('key, code', key, code);
    mode = parseInt(key, 0);
    // remove or add the word/letter
    const $word = $('.container').find('.word');
    if (mode === 1) {
        $word.removeClass('fade');
    } else {
        $word.addClass('fade');
    }
}

function toggleGodMode(event, key, code) {
    godMode = !godMode;
}

function showLetter(event, key, code) {
    if (!$(currentSelection).find('.word').hasClass('in')) {
        $(currentSelection).find('.word').addClass('in');
    }
}

module.exports = {
    init: function(config) {
        console.log('  === alphabet ===');
        signals = config.signals;

        // hi.on('ctrl-1', showLetter);
        hi.on('ctrl-1', setMode);
        hi.on('ctrl-2', setMode);
        // hi.on('ctrl-g', toggleGodMode);
        hi.on('keydown', whatKey);
        hi.on('space', space);

        setActiveObject();
    },
};
