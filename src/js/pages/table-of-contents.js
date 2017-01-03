import $ from 'jquery';

var signals;

module.exports = {
    init: function(config) {
        console.log('  === table-of-contents ===');
        signals = config.signals;

        signals['domReady'].dispatch();
    },
};
