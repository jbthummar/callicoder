(function (parent) {
    'use strict'
    parent.MarketerPlugin = {};
})(window);

(function (MarketerPlugin) {
    MarketerPlugin.Views = {};
    MarketerPlugin.Models = {};

    $(document).ready(function () {
        var app = new MarketerPlugin.Models.ApplicationModel({}),
            appView = new MarketerPlugin.Views.ApplicationView({ model: app, el: $('#main') });
    });

})(MarketerPlugin);