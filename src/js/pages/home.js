import $ from 'jquery';

var signals;

module.exports = {
    init: function(config) {
        console.log( '  === home ===' );
        signals = config.signals;

        $('.nav-link').addClass('in');
        // this isn't always needed
        // signals['domReady'].dispatch();
    },
};
