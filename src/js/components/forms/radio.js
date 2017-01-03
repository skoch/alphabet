import $ from 'jquery';

var signals;

function _radioChanged(e) {
    console.log('_radioChanged');
}

module.exports = {
    init: function(config) {
        console.log('  === radio ===');
        signals = config.signals;

        $('input[type="radio"]').change(_radioChanged);
    },
};
