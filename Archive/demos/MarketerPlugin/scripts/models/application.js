(function (Models) {
    'use strict'

    var ApplicationModel = Backbone.Model.extend({

        defaults: {
            width: 700,
            height: 1000,
            minWidth: 700,
            maxWidth: 1000,
            minHeight: 700,
            maxHeight: 1200
        },


        initialize: function () {

        }
    },
    {});

    Models.ApplicationModel = ApplicationModel;
})(MarketerPlugin.Models);