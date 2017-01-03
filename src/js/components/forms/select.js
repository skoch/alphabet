import $ from 'jquery';

var signals;

function _selectChange(e) {
    console.log('_selectChange');
}

function _selectFocus(e) {
    console.log('_selectFocus');
}

function _selectFocusout(e) {
    console.log('_selectFocusout');
}

module.exports = {
    init: function(config) {
        console.log('  === select ===');
        signals = config.signals;

        $('select').change(_selectChange);
        $('select').focus(_selectFocus);
        $('select').focusout(_selectFocusout);
    },
};
