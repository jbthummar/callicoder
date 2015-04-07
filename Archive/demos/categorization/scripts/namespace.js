$(document).ready(
    function () {
        var Game = {};
        window.Game = Game;

        var ItemModel = Backbone.Model.extend({
            defaults: function () {
                return {
                    category: null,
                    title: null,
                    categorized: false
                }
            }
        });
        window.ItemModel = ItemModel;

        var ItemView = Backbone.View.extend({

            initialize: function () {
                console.log("initialize called item");
                this.$el.addClass(ItemView.ITEM_CLASS + " " + ItemView.ITEM_CLASS + "_normal");
                this.$el.prop("viewObject", this);
            },

            delegateEvents: function () {
                var self = this;
                $(this.el).draggable({
                    containment: document.body,
                    cursor: "move",
                    revert: "invalid",
                    start: function () {
                        $(this).addClass(ItemView.ITEM_CLASS + "_hover");
                    },
                    drag: function () {
                        //$(this).toggleClass(ItemView.ITEM_CLASS + "_drag");
                        //$(this).removeClass(ItemView.ITEM_CLASS + "_hover");
                        $(this).zIndex(1);
                    },
                    stop: function () {
                        $(this).removeClass(ItemView.ITEM_CLASS + "_hover");
                        $(this).zIndex(0);
                    },
                    revert: function () {
                        if (self.model.get("categorized") === false) {
                            return true;
                        }
                        return false;
                    }

                });

                $(this.el).mouseenter(function () {
                    if (!$(this).hasClass("ui-draggable-dragging")) {
                        $(this).addClass(ItemView.ITEM_CLASS + "_hover");
                    }
                });
                $(this.el).mouseleave(function () {
                    if ($(this).hasClass(ItemView.ITEM_CLASS + "_hover")) {
                        $(this).removeClass(ItemView.ITEM_CLASS + "_hover");
                    }
                });

            }

        },
            {
                ITEM_CLASS: "item_draggable"
            }
        );
        window.ItemView = ItemView;

        var ItemContainerModel = Backbone.Model.extend({
            defaults: function () {
                return {
                    category: null,
                    items: []
                }
            }
        });
        window.ItemContainerModel = ItemContainerModel;

        var ItemContainerView = Backbone.View.extend({

            initialize: function () {
                console.log("initialize called itemcontainer");
            },

            delegateEvents: function () {
                var self = this;
                this.$el.droppable({
                    accept: function (draggableObj) {
                        //                        var category = self.model.get("category");
                        //                        if ($(draggableObj).attr("category").split(" ").indexOf(category) !== -1) {
                        //                            return true;
                        //                        }
                        //                        return false;
                        return true;
                    },
                    drop: function (event, ui) {
                        var category = self.model.get("category");
                        var elm = ui.draggable;
                        var itemViewObj = elm.prop("viewObject");
                        var bCorrectAction = false;
                        if (elm.attr("category").split(" ").indexOf(category) !== -1) {
                            elm.zIndex(0);
                            self.$el.append(elm);
                            elm.css("top", "0px").css("left", "0px").css("position", "relative").css("background-color", "rgb(22, 43, 51)");
                            itemViewObj.model.set("categorized", true);
                            elm.draggable("destroy");
                            bCorrectAction = true;
                        }
                        Helper.logMessage(itemViewObj.model.get("title"), self.model.get("category"), bCorrectAction);
                    }
                });
            }

        });
        window.ItemContainerView = ItemContainerView;

        $('.button_replay').on('click', onReplayClick);
        fetchResource();

    }
);
