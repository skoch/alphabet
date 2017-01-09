import $ from 'jquery';
// import ColorThief from 'color-thief';
// no workie -- missing __VERSION__
// see: https://github.com/liftoff/HumanInput/issues/4
// import HumanInput from 'humaninput';
import HumanInput from 'humaninput/dist/humaninput-full.min';

const transitions = require('../components/css-transitions');

const ColorThief = require('color-thief-browser');

const colorThief = new ColorThief();
const hi = new HumanInput(window);
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

var godMode;
var signals;
var currentLetter;
var currentSelection;

function _setActiveObject() {
    // for single, we only need to keep the `previousSelection` here
    const choices = $(`.letter-${currentLetter}`);
    const previousSelection = currentSelection;
    const selection = choices[Math.floor(Math.random() * choices.length)];
    currentSelection = selection;
    // single
    // currentSelection = $('.content');
    // console.log('selection', selection);

    // if (!$('.title').hasClass('fade')) {
    //     $('.title').addClass('fade');
    // }
    if (previousSelection) {
        $(previousSelection).removeClass('in');
        $(previousSelection).find('.word').removeClass('in');
    }

    setTimeout(() => {
        const img = $(currentSelection).find('img');
        const colors = colorThief.getPalette(img[0], 2);
        $('.word').css({
            // textShadow: `6px 4px 20px rgba(${colors[2][0]},
            // ${colors[2][1]}, ${colors[2][2]}, 1)`,
            color: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 1)`,
        });
        $('.alphabet').css({
            background: `linear-gradient(to bottom, rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]},1) 0%,rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]},1) 50%,rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]},1) 50%,rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]},1) 100%)`,
        });
        $('.content').css({
            background: `linear-gradient(to bottom, rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]},1) 0%,rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]},1) 50%,rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]},1) 50%,rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]},1) 100%)`,
        });
        // if (currentLetter === 'w') {
        //     console.log('colors[0]', colors[0]);
        //     console.log('colors[1]', colors[1]);
        //     console.log('colors[2]', colors[2]);
        // }
        $(currentSelection).addClass('in');
    }, 100);
}
function _space(event) {
    currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
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
        // if the keypress === current letter and it's not yet in
        // const sel = $(currentSelection);
        // if (key === currentLetter) {
        //     if (!sel.find('.word').hasClass('in')) {
        //         sel.find('.word').addClass('in');
        //         // sel.find('img').removeClass('shake-horizontal shake-constant');
        //     }
        // } else {
        //     // sel.find('img').addClass('shake-horizontal shake-constant');
        // }

        // for younger kids, random selection of selected letter
        currentLetter = key;
        _setActiveObject();
    }
}

function _showLetter(event, key, code) {
    console.log('_showLetter');
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

        // single
        // currentLetter = $('.content').data('letter');
        // _setActiveObject();

        // hi.on('ctrl-1', _showLetter);
        // hi.on('ctrl-g', _toggleGodMode);
        // you have to enable godMode in order to use the keys for display
        hi.on('keydown', _whatKey);
        // default display for kids
        hi.on('space', _space);
        // $('.object').click(_objectClick);
        setTimeout(() => {
            hi.trigger('space');
        }, 750);
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
