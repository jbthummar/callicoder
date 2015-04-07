(function (Views) {
    'use strict'

    var BoxView = Backbone.View.extend({

        _elmContainmant: null,

        initialize: function (options) {
            this._elmContainmant = options.containment;
            this.render(options);
        },

        render: function (options) {
            var model = this.model,
                position = options.position;
            this.$el.addClass('box-view-container');
            this.$el.attr({ id: options.id });
            this.$el.css({
                left: position.left,
                top: position.top,
                'border-color': model.get('border-color'),
                'background-color': model.get('background-color'),
                'border-style': model.get('border-style'),
                'border-width': model.get('border-width'),
                'border-radius': model.get('border-radius')
            });

        },

        attachEvents: function () {
            this._createDraggable();
            this._createResizable();
            this.$el.on('dblclick', $.proxy(this.onClick, this));


            this.listenTo(this.model, 'change:border-color', $.proxy(this.onChangeBorderColor, this));
            this.listenTo(this.model, 'change:background-color', $.proxy(this.onChangeBackgroundColor, this));
            this.listenTo(this.model, 'change:border-style', $.proxy(this.onChangeBorderStyle, this));
            this.listenTo(this.model, 'change:border-width', $.proxy(this.onChangeBorderWidth, this));
            this.listenTo(this.model, 'change:border-radius', $.proxy(this.onChangeBorderRadius, this));

        },

        onChangeBorderColor: function () {
            this.$el.css({ 'border-color': this.model.get('border-color') });
        },

        onChangeBackgroundColor: function () {
            this.$el.css({ 'background-color': this.model.get('background-color') });
        },

        onChangeBorderStyle: function () {
            this.$el.css({ 'border-style': this.model.get('border-style') });
        },

        onChangeBorderWidth: function () {
            this.$el.css({ 'border-width': this.model.get('border-width') });
        },

        onChangeBorderRadius: function () {
            this.$el.css({ 'border-radius': this.model.get('border-radius') + 'px' });
        },


        _createDraggable: function () {
            this.$el.draggable({
                containment: this._elmContainmant,
                revert: false
            });
        },

        _createResizable: function () {
            this.$el.resizable({
                containment: this._elmContainmant,
                handles: 'n, e, s, w'
            });
        },

        onClick: function () {
            this.trigger(MarketerPlugin.Views.ApplicationView.Events.OnViewClick, this);
        }

    }, {});

    Views.BoxView = BoxView;
})(MarketerPlugin.Views);