(function (Views) {
    'use strict'

    var ApplicationView = Backbone.View.extend({

        _elmPageWidth: null,

        _elmPageHeight: null,

        _elmPageContainer: null,

        _elmToolbarContainer: null,

        _toolbar: null,

        _boxDialogView: null,

        _arrViews: [],

        initialize: function () {
            this._arrViews = [];
            this.precacheElements();
            this.render();
            this._attachEvents();

            window['this2'] = this;
        },

        precacheElements: function () {
            this._elmPageWidth = this.$('#page-width');
            this._elmPageHeight = this.$('#page-height');
            this._elmPageContainer = this.$('#wrapper');
        },

        render: function () {
            this._createToolbar();
            this._createBoxDialog();
        },

        _createToolbar: function () {
            this._elmToolbarContainer = $('<div>').appendTo(this._elmPageContainer);
            this._toolbar = new Views.ToolbarView({ elmWholeContainment: this._elmPageContainer, el: this._elmToolbarContainer });
            this._elmPageContainer.append(this._toolbar.$el);
        },

        _createBoxDialog: function () {
            this._boxDialogView = new Views.BoxDialogView({ containment: this._elmPageContainer });
            this._elmPageContainer.append(this._boxDialogView.$el);
            this._boxDialogView.attachEvents();
            this._boxDialogView.closeDialog();
        },

        _attachEvents: function () {
            this._elmPageWidth.change($.proxy(this.onWidthChange, this));
            this._elmPageHeight.change($.proxy(this.onHeightChange, this));
            this._createDroppable();
        },

        onWidthChange: function (event) {
            var val = this._elmPageWidth.val();
            if ($.isNumeric(val) && val >= this.model.get('minWidth') && val <= this.model.get('maxWidth')) {
                this._elmPageContainer.width(val);
            }
        },

        onHeightChange: function (event) {
            var val = this._elmPageHeight.val();
            if ($.isNumeric(val) && val >= this.model.get('minHeight') && val <= this.model.get('maxHeight')) {
                this._elmPageContainer.height(val);
            }
        },

        _createDroppable: function () {
            var self = this;
            this._elmPageContainer.droppable({
                accept: '.' + this._toolbar.idPrefix + '-icon-image',
                //cursorAt: { left: 15, top: 17 },
                over: function (event, ui) { },
                drop: function (event, ui) {
                    self.onTileDropped(event, ui);
                }
            });
        },

        onTileDropped: function (event, ui) {
            var dataDraggable = ui.draggable.data(),
                type = dataDraggable['type'];

            switch (type) {
                case 'box': {
                    this.onBoxDropped(event, ui);
                }
                    break;
            }
        },

        onBoxDropped: function (event, ui) {
            var parentOffset = this._elmPageContainer.offset(),
                clientX = event.clientX,
                clientY = event.clientY,
                leftBox = clientX - parentOffset.left,
                topBox = clientY - parentOffset.top,
                position = { left: leftBox, top: topBox },
                boxView;

            boxView = new Views.BoxView({ position: position, containment: this._elmPageContainer, id: 'view-' + this._arrViews.length, model: new MarketerPlugin.Models.BoxModel() });
            this._elmPageContainer.append(boxView.$el);
            boxView.attachEvents();
            this._arrViews.push(boxView);
            this.listenTo(boxView, ApplicationView.Events.OnViewClick, $.proxy(this.onViewClick, this));
        },

        onViewClick: function (oSender) {
            this._boxDialogView.setModel(oSender.model);
            this._boxDialogView.openDialog();
        }
    },
{
    Events: {
        OnViewClick: 'OnViewClick'
    }
});

    Views.ApplicationView = ApplicationView;
})(MarketerPlugin.Views);