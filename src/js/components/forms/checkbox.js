import $ from 'jquery';

var signals;

function _checkboxChanged(e) {
    console.log('_checkboxChanged');
}

module.exports = {
    init: function(config) {
        console.log('  === checkbox ===');
        signals = config.signals;

        $('input[type="checkbox"]').change(_checkboxChanged);
    },
};
