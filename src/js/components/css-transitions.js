import $ from 'jquery';
import Signal from 'signals';
// import Manager from './css-transitions-manager';

const transitions = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

var config = {
    signals: {
        onCssTransitionEnd: new Signal(),
        onCssTransitionPerpetual: new Signal(),
    },
};

function _onTransitionEnd(e) {
    const t = $(e.currentTarget);
    const data = t.data('on-transition-end');
    t.off(transitions, _onTransitionEnd);
    config.signals['onCssTransitionEnd'].dispatch({
        el: t,
        data: data,
    });
}

function _onTransitionPerpetual(e) {
    const t = $(e.currentTarget);
    const data = t.data('on-transition-perpetual');
    config.signals['onCssTransitionPerpetual'].dispatch({
        el: t,
        data: data,
    });
}

module.exports = {
    init: () => {
        // Manager.init(config);
        $( '[data-on-transition-end]' ).on( transitions, _onTransitionEnd );
        $( '[data-on-transition-perpetual]' ).on( transitions, _onTransitionPerpetual );
    },
    config: config,
};
