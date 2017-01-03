import $ from 'jquery';

var signals;

module.exports = {
    init: function(config) {
        console.log( '  === name ===' );
        signals = config.signals;

        // this isn't always needed
        signals['domReady'].dispatch();
    },
};
