import $ from 'jquery';
import input from '../components/forms/input';
import select from '../components/forms/select';
import checkbox from '../components/forms/checkbox';
import radio from '../components/forms/radio';

var signals;

module.exports = {
    init: function(config) {
        console.log('  === styleguide ===');
        signals = config.signals;

        input.init(config);
        select.init(config);
        checkbox.init(config);
        radio.init(config);

        signals['domReady'].dispatch();
    },
};
