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
    c: ['carrot-alt', 'cow', 'crow', 'cat'],
    d: ['duck', 'dandelion-alt', 'dolphin', 'dog'],
    e: ['eggplant', 'eggs', 'elephant', 'eagle-alt'],
    f: ['fig', 'fox', 'fish', 'frog', 'feather'],
    g: ['garlic', 'glasses', 'giraffe', 'goldfish', 'goat'],
    h: ['honey', 'honeydew', 'horse', 'hammer'],
    i: ['iguana-alt', 'ice-cream-alt-2'],
    j: ['jaguar-alt', 'jar-alt'],
    k: ['kangaroo', 'key', 'knife'],
    l: ['lion', 'lemon', 'leaves', 'lollipop'],
    m: ['monkey', 'mouse', 'matches', 'marbles'],
    n: ['nectarine', 'newspaper', 'nickel'],
    o: ['octopus-alt', 'owl', 'orange', 'onion'],
    p: ['penguin', 'pig', 'pineapple-alt', 'pear', 'peanut'],
    q: ['quince', 'quarter'],
    r: ['rattlesnake', 'rabbit', 'rooster'],
    s: ['sheep', 'shells', 'ship', 'stones'],
    t: ['tomato', 'tree', 'tarantula', 'tiger-alt', 'turtle', 'trumpet', 'telephone'],
    u: ['umbrella', 'ukulele'],
    v: ['vulture', 'violin'],
    w: ['woodpecker', 'watermelon', 'wolf'],
    x: ['xylophone'],
    y: ['yam', 'yarn', 'yo-yo'],
    z: ['zebra'],
};

var signals;
var godMode;
var mode = 1;
var currentIndex;
var currentLetter;
var currentSelection;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function randomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function setActiveObject(letter = randomLetter()) {
    currentLetter = letter;
    currentIndex = alphabet.indexOf(currentLetter);

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
        // console.log(`$${image}-1:`, rgbToHex(colors[0][0], colors[0][1], colors[0][2]));
        // console.log(`$${image}-2:`, rgbToHex(colors[1][0], colors[1][1], colors[1][2]));
        // console.log(`$${image}-3:`, rgbToHex(colors[2][0], colors[2][1], colors[2][2]));
        console.log('.home {');
        console.log(`    background: linear-gradient(to bottom, ${rgbToHex(colors[1][0], colors[1][1], colors[1][2])} 0%, ${rgbToHex(colors[1][0], colors[1][1], colors[1][2])} 50%, ${rgbToHex(colors[2][0], colors[2][1], colors[2][2])} 50%, ${rgbToHex(colors[2][0], colors[2][1], colors[2][2])} 100%);`);
        console.log('    .container h1 {');
        console.log(`        color: ${rgbToHex(colors[0][0], colors[0][1], colors[0][2])};`);
        console.log('    }');
        console.log('    .container .nav .nav-link {');
        console.log(`        color: ${rgbToHex(colors[0][0], colors[0][1], colors[0][2])};`);
        console.log('    }');
        console.log('    .container .nav .nav-link:hover {');
        console.log(`        color: ${rgbToHex(colors[1][0], colors[1][1], colors[1][2])};`);
        console.log('    }');
        console.log('}');
        $(currentSelection).find('.word').css({
            color: localStorage.fontColor,
        });
        $('.alphabet').css({
            background: `linear-gradient(to bottom, ${localStorage.gradientStartColor} 0%, ${localStorage.gradientStartColor} 50%, ${localStorage.gradientEndColor} 50%, ${localStorage.gradientEndColor} 100%)`,
            // background: `linear-gradient(135deg, ${localStorage.gradientStartColor} 0%, ${localStorage.gradientEndColor} 50%, ${localStorage.fontColor} 100%)`,
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

function onSpace(event, key, code) {
    // setActiveObject();
    switch (mode) {
        case 1 : {
            // currentIndex++;
            // currentIndex %= 26;
            // next letter in the alphabet
            const letter = alphabet.split('')[++currentIndex % 26];
            setActiveObject(letter);
        }
            break;
        default :
            setActiveObject();
    }
}

function onKeyDown(event, key, code) {
    // mode 1 does nothing as of now
    if (mode === 1) {
        return;
    }
    // if (!godMode) {
    //     return;
    // }
    const regex = /^[a-z]$/;
    if (regex.test(key)) {
        // if (currentLetter === key) {
        //     return;
        // }
        switch (mode) {
            case 2 :
                setActiveObject(key);
                break;
            case 3 : {
                // if the keypress === current letter and it's not yet in
                const $sel = $(currentSelection);
                if (key === currentLetter && !$sel.find('.word').hasClass('in')) {
                    $sel.find('.word').addClass('in');
                } else if (!$sel.find('.word').hasClass('in')) {
                    shake();
                }
            }
                break;
            default :

        }
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

function startPresentation() {
    const $word = $('.container').find('.word');
    switch (mode) {
        case 1 :
            $word.removeClass('fade');
            setActiveObject('a');
            break;
        case 2 :
            $word.removeClass('fade');
            setActiveObject();
            break;
        case 3 :
            $word.addClass('fade');
            setActiveObject();
            break;
        default :
    }
}

function setMode(event, key, code) {
    // console.log('key, code', key, code);
    if (parseInt(key, 10) !== mode) {
        mode = parseInt(key, 10);
        // startPresentation();
        window.location = `${mode}`;
    }
}

module.exports = {
    init: function(config) {
        mode = $('body').data('level');
        console.log('  === alphabet ===', mode);
        signals = config.signals;


        // hi.on('ctrl-1', showLetter);
        hi.on(['ctrl-1', 'ctrl-2', 'ctrl-3'], setMode);
        // hi.on('ctrl-g', toggleGodMode);
        hi.on('keydown', onKeyDown);
        hi.on('space', onSpace);

        startPresentation();
    },
};
