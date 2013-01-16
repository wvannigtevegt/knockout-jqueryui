/*global ko, $*/
/*jslint browser:true*/
(function () {
    'use strict';

    var preInit, postInit;

    preInit = function (element) {
        /// <summary>Creates a hidden div before the element. This helps in disposing the
        /// binding if the element is moved from its original location.</summary>
        /// <param name='element' type='DOMNode'></param>

        var marker;

        marker = document.createElement('DIV');
        marker.style.display = 'none';
        element.parentNode.insertBefore(marker, element);

        ko.utils.domNodeDisposal.addDisposeCallback(marker, function () {
            ko.removeNode(element);
        });
    };

    postInit = function (element, valueAccessor) {
        /// <summary>Keeps the isOpen binding property in sync with the dialog's state.
        /// </summary>
        /// <param name='element' type='DOMNode'></param>
        /// <param name='valueAccessor' type='Function'></param>

        var value = valueAccessor();

        if (ko.isObservable(value.isOpen)) {
            ko.computed({
                read: function () {
                    if (value.isOpen()) {
                        $(element).dialog('open');
                    } else {
                        $(element).dialog('close');
                    }
                },
                disposeWhenNodeIsRemoved: element
            });
        }
        if (ko.isWriteableObservable(value.isOpen)) {
            $(element).on('dialogopen.ko', function () {
                value.isOpen(true);
            });
            $(element).on('dialogclose.ko', function () {
                value.isOpen(false);
            });
        }

        //handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).off('ko');
        });
    };

    ko.jqueryui.bindingFactory.create({
        name: 'dialog',
        options: ['autoOpen', 'buttons', 'closeOnEscape', 'closeText', 'dialogClass',
            'draggable', 'height', 'hide', 'maxHeight', 'maxWidth', 'minHeight',
            'minWidth', 'modal', 'position', 'resizable', 'show', 'stack', 'title',
            'width', 'zIndex'],
        events: ['beforeClose', 'create', 'open', 'focus', 'dragStart', 'drag',
            'dragStop', 'resizeStart', 'resize', 'resizeStop', 'close'],
        preInit: preInit,
        postInit: postInit
    });
}());