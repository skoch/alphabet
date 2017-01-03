import $ from 'jquery';
import _ from 'lodash';
import Signal from 'signals';

// global configuration object. Passed via init() to all modules
var config = {
    signals: {
        open: new Signal(),
        domReady: new Signal(),
    },
};

// do this when the dom is ready
function _onDomReady() {
    $('body').addClass('in');
}

// Dynamic Javascript Module loader, for concerns-separated per-page JS inclusion
function autoJsModule() {
    // Is the pageJS variable declared in your route vars? Load it.
    if (typeof pageJs !== 'undefined') {
        // Require the module via webpack's dynamic context module
        const pageModule = require(`./pages/${pageJs}`);
        // Does the module have an init()? Run it, w/ config included.
        if (pageModule && typeof pageModule.init === 'function') {
            pageModule.init(config);
        }
    }
}

// Create the global App module
const App = {

    // init the app
    init() {
        console.log('=== init ===');
        config.signals['domReady'].add(_onDomReady);
        autoJsModule();
    },

    // expose the config
    config: config,
};

// kickoff the app
$(App.init);

// export App to the browser/console
module.exports = App;
