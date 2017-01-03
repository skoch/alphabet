import $ from 'jquery';

var signals;

function _inputKeyup(e) {
    console.log('_inputKeyup');
}

function _blur(e) {
    console.log('_blur');
}

function _textFocusin(e) {
    console.log('_textFocusin');
}

function _textFocusout(e) {
    console.log('_textFocusout');
}

module.exports = {
    init: function(config) {
        console.log('  === input ===');
        signals = config.signals;

        $('input[type="text"], input[type="email"]').keyup(_inputKeyup);
        $('input[type="text"], input[type="email"]').blur(_blur);
        $('input[type="text"], input[type="email"]').focusin(_textFocusin);
        $('input[type="text"], input[type="email"]').focusout(_textFocusout);
    },
};
