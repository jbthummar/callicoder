(function (Views) {
    'use strict'

    var BoxDialogView = Backbone.View.extend({

        _elmContainment: null,
        boxModel: null,
        _dialog: null,
        idPrefix: 'boxdialog',

        _elmBorderColor: null,
        _elmBackgroundColor: null,
        _elmBorderStyle: null,
        _elmBorderWidth: null,
        _elmBorderRadius: null,

        _regExColor: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i,

        initialize: function (options) {
            this._elmContainment = options.containment;
            this.boxModel = options.boxModel;
            this.render(options);
            this._precacheElements();
        },

        setModel: function (model) {
            this.boxModel = model;
        },

        openDialog: function () {
            if (this.boxModel) {
                var model = this.boxModel;
                this._elmBorderColor.val(model.get('border-color'));
                this._elmBackgroundColor.val(model.get('background-color'));
                this._elmBorderStyle.val(model.get('border-style'));
                this._elmBorderWidth.val(model.get('border-width'));
                this._elmBorderRadius.val(model.get('border-radius'));
            }
            this._dialog.dialog('open');
        },

        closeDialog: function () {
            this._dialog.dialog('close');
        },

        render: function (options) {
            var template = MarketerPlugin.Templates.boxDialog,
                data = { idPrefix: this.idPrefix },
                elm = $(template(data).trim());
            this.setElement(elm);
        },


        _precacheElements: function () {
            this._elmBorderColor = this.$('.' + this.idPrefix + '-border-color');
            this._elmBackgroundColor = this.$('.' + this.idPrefix + '-background-color');
            this._elmBorderStyle = this.$('.' + this.idPrefix + '-border-style');
            this._elmBorderWidth = this.$('.' + this.idPrefix + '-border-width');
            this._elmBorderRadius = this.$('.' + this.idPrefix + '-border-radius');
        },

        attachEvents: function () {
            this._createDialog();
            this._attachEventsOnFields();
        },

        _createDialog: function () {
            var self = this;
            this._dialog = $('#' + this.idPrefix + '-dialog').dialog({
                height: 350,
                width: 400,
                resizable: false,
                position: { my: "left top", at: "left center", of: this._elmContainmant },
                buttons: {
                    "Save": function () { $(this).dialog("close"); },
                    "Cancel": function () { $(this).dialog("close"); }
                },
                open: function (event, ui) {
                    var vDlg = $(event.target).parent();
                    vDlg.draggable("option", "containment", self._elmContainment);
                    $(this).dialog("option", "position", { my: "left top", at: "left center", of: this._elmContainmant });
                }
            });
        },

        _attachEventsOnFields: function () {
            var self = this,
                val;
            this._elmBorderColor.on('change', function (evt) {
                val = self._elmBorderColor.val();
                if (self._regExColor.test(val)) {
                    self.boxModel.set('border-color', val);
                }
            });

            this._elmBackgroundColor.on('change', function (evt) {
                val = self._elmBackgroundColor.val();
                if (self._regExColor.test(val)) {
                    self.boxModel.set('background-color', val);
                }
            });

            this._elmBorderStyle.on('change', function (evt) {
                val = self._elmBorderStyle.val();
                self.boxModel.set('border-style', val);
            });

            this._elmBorderWidth.on('change', function (evt) {
                var min = parseInt(self._elmBorderWidth.attr('min')),
                    max = parseInt(self._elmBorderWidth.attr('max'));
                val = self._elmBorderWidth.val();
                if (val >= min && val <= max) {
                    self.boxModel.set('border-width', val);
                }
            });

            this._elmBorderRadius.on('change', function (evt) {
                var min = parseInt(self._elmBorderRadius.attr('min')),
                    max = parseInt(self._elmBorderRadius.attr('max'));
                val = self._elmBorderRadius.val();
                if (val >= min && val <= max) {
                    self.boxModel.set('border-radius', val);
                }
            });
        }


    }, {});

    Views.BoxDialogView = BoxDialogView;
})(MarketerPlugin.Views);