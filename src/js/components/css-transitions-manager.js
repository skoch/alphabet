import $ from 'jquery';

function _onCssTransitionEnd(funcName) {
    console.log('_onCssTransitionEnd', funcName);

    // todo: check if this is actually a function?
    // eval(funcName)();
}

module.exports = {
    init: (config) => {
        config.signals['onCssTransitionEnd'].add((funcName) => {
            console.log('funcName', funcName);
        });
    },
};
