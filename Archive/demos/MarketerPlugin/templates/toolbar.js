(function() {
  var template = Handlebars.template, templates = MarketerPlugin.Templates = MarketerPlugin.Templates || {};
templates['toolbar'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "﻿<div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-toolbar-wrapper\">\r\n  <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-header\" >\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-header-text\">\r\n      Toolbar\r\n    </div>\r\n  </div>\r\n  <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-button-container\">\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-button "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-save-button\" >\r\n      Save\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-button "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-close-button\" >\r\n      Close\r\n    </div>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-delete-button\" >\r\n    </div>\r\n  </div>\r\n  <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-container\">\r\n    <table class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-main-icon-table\">\r\n      <tbody>\r\n        <tr style=\"height: 71px;\">\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-title "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\">\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Title</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-text "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Text</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-box "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Box</div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        <tr style=\"height: 71px;\">\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-img "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Image</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-graphics "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Graphics</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-youtube "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Youtube</div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n        <tr style=\"height: 71px;\">\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-iframe "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">iFrame</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-map "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Map</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-html "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">HTML</div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-horizontal-line\" >\r\n    </div>\r\n    <table style=\"width: 100%;\">\r\n      <tbody>\r\n        <tr style=\"height: 71px;\">\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-javascript "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text \">JavaScript</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper\" >\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image  icon-templates "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Templates</div>\r\n            </div>\r\n          </td>\r\n          <td>\r\n            <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-wrapper \">\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-image icon-settings "
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-image\" >\r\n              </div>\r\n              <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-icon-text\">Settings</div>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-footer\" style=\"border-top: 2px solid rgb(229,230,235); padding-left: 6px; padding-top: 7px;\">\r\n    <span class=\""
    + alias3(((helper = (helper = helpers.idPrefix || (depth0 != null ? depth0.idPrefix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"idPrefix","hash":{},"data":data}) : helper)))
    + "-footer-text\" style=\"font-weight: bold; font-size: 11px; letter-spacing: 1px;\">Main Page | + Subpage</span>\r\n  </div>\r\n</div>";
},"useData":true});
})();