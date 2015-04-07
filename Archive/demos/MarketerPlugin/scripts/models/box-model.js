(function (Models) {
    'use strict'

    var BoxModel = Backbone.Model.extend({

        defaults: {
            'border-color': '#000',
            'background-color': '#FFF',
            'border-style': 'solid',
            'border-width': 1,
            'border-radius': 3,
            type: 'box'
        }
    }, {});

    Models.BoxModel = BoxModel;
})(MarketerPlugin.Models);