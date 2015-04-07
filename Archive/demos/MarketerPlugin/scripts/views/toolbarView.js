﻿(function (Views) {
    var ToolbarView = Backbone.View.extend({

        idPrefix: 'toolbar',

        _elmWholeContainment: null,
        _elmHeader: null,

        _elmTitle: null,
        _elmText: null,
        _elmBox: null,
        _elmImg: null,
        _elmGraphics: null,
        _elmYoutube: null,
        _elmIframe: null,
        _elmMap: null,
        _elmHtml: null,

        initialize: function (options) {
            this._elmWholeContainment = options.elmWholeContainment;
            this.render();
            this._precacheElements();
            this._attachEvents();
        },

        render: function () {
            var template = MarketerPlugin.Templates.toolbar,
                data = { idPrefix: this.idPrefix };
            this.$el.addClass('toolbar-container');
            this.$el.append(template({ idPrefix: this.idPrefix }).trim());
        },

        _precacheElements: function () {
            this._elmHeader = this.$('.' + this.idPrefix + '-header');
            this._elmTitle = this.$('.icon-title');
            this._elmText = this.$('.icon-text');
            this._elmBox = this.$('.icon-box');
            this._elmImg = this.$('.icon-img');
            this._elmGraphics = this.$('.icon-graphics');
            this._elmYoutube = this.$('.icon-youtube');
            this._elmIframe = this.$('.icon-iframe');
            this._elmMap = this.$('.icon-map');
            this._elmHtml = this.$('.icon-html');
        },

        _attachEvents: function () {
            this._createWholeDraggable();
            this._createBoxDraggable();
        },

        _createWholeDraggable: function () {
            this.$el.draggable({
                containment: this._elmWholeContainment,
                handle: this._elmHeader
            });
        },

        _createBoxDraggable: function () {
            this._elmBox.data({ type: 'box' });
            this._elmBox.draggable({
                helper: 'clone',
                containment: this._elmWholeContainment,
                revert: false,
                stop: function (event, ui) {
                    ui.helper.remove();
                }
            });
        }

    }, {});

    Views.ToolbarView = ToolbarView;
})(MarketerPlugin.Views);