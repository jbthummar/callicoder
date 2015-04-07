(function() {
  var template = Handlebars.template, templates = MarketerPlugin.Templates = MarketerPlugin.Templates || {};
templates['boxDialog'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-dialog\" title=\"Box Editor\">\r\n  <div class=\"\"\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-container\">\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-component\">\r\n      <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell\">Border Color:</span>\r\n      <input class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-border-color\" type=\"text\" size=\"8\"/>\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-component\">\r\n      <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell\">Background Color:</span>\r\n      <input class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-background-color\" type=\"text\" size=\"8\"/>\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-component\">\r\n      <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell\">Border Style: </span>\r\n      <select class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-border-style\" value=\"Solid\" >\r\n        <option value=\"none\">None</option>\r\n        <option value=\"solid\">Solid</option>\r\n        <option value=\"dotted\">Dotted</option>\r\n        <option value=\"dashed\">Dashed</option>\r\n      </select>\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-component\">\r\n      <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell\">Border Width:</span>\r\n      <input class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-border-width\" type=\"number\" name=\"points\" min=\"0\" max=\"20\" step=\"1\" value=\"3\"/>\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-component\">\r\n      <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell\">Round Border corners:</span>\r\n      <input class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-table_cell "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-border-radius\" type=\"number\" name=\"points\" min=\"0\" max=\"30\" step=\"1\" value=\"3\"/>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();