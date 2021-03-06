/*global bindingFactory, versions*/
(function () {
    'use strict';

    var events;

    switch (versions.jQueryUI) {
    case '1.8':
        events = ['change', 'close', 'create', 'focus', 'open', 'search', 'select'];
        break;
    case '1.9':
    case '1.10':
        events = ['change', 'close', 'create', 'focus', 'open', 'response', 'search',
        'select'];
        break;
    }

    bindingFactory.create({
        name: 'autocomplete',
        options: ['appendTo', 'autoFocus', 'delay', 'disabled', 'minLength', 'position',
            'source'],
        events: events
    });
}());