(function (window) {

    "use strict";

    var TODO = {};
    window.TODO = TODO;

})(window); (function (TODO) {

    "use strict";

    var App = Backbone.Model.extend({

        initialize: function () {
        }
    });

    TODO.App = App;
})(TODO); (function (TODO) {

    "use strict";

    var AppView = Backbone.View.extend({

        calendarModel: null,
        calendarView: null,
        dialog: null,
        $taskForm: null,
        $taskTextBox: null,
        $addTaskBtn: null,
        $deleteTaskBtn: null,
        $reportTable: null,

        render: function (data) {
            this.$reportTable = this.$el.find("." + AppView.REPORT_TABLE_CLASSNAME);
            //            this._createSaveButton();
            this._createCalendar(data);
            this._createDialog();
            this.renderMonthReport(this.calendarView.getDayViews());
        },

        _createCalendar: function (data) {
            this.calendarModel = new TODO.CalendarModel(data);
            this.calendarView = new TODO.CalendarView({ el: $("#calendar"), model: this.calendarModel });
            this.calendarView.render();
        },

        _createSaveButton: function () {
            var btnSave = document.createElement("button");
            $(btnSave).html("Save");
            $(btnSave).css({ "position": "absolute", "top": 0, "right": 0 });
            var self = this;
            $(btnSave).on("click", function () { self.onSaveState.apply(self, arguments); });
            this.$el.append(btnSave);
        },

        _createDialog: function () {
            var self = this;
            var $dialog = $("<div></div>").attr({ id: "task-dialog", title: "Task" }).appendTo(this.$el);
            var $form = $("<form></form>").appendTo($dialog);
            $form.append("<span>Task</span>");
            this.$taskForm = $form;
            this.$taskTextBox = $("<input type='text'></input>").addClass("dialog-input-task").appendTo($form);
            this.$addTaskBtn = $("<input type='submit' class='dialog-btn-add'></input>").appendTo($form);
            this.$deleteTaskBtn = $("<button class='dialog-btn-delete'> Delete </button>").appendTo($form);

            this.dialog = $dialog.dialog({
                autoOpen: false,
                modal: true,
                close: function () {
                    self.$deleteTaskBtn.off("click");
                    self.$taskForm.off("submit");
                }
            });
        },

        renderMonthReport: function (arrDayViews) {
            var $tbody = this.$reportTable.find("tbody");
            $tbody.empty();
            for (var i = 0; i < arrDayViews.length; i++) {
                var dayView = arrDayViews[i];
                if (dayView.model.get("task") !== null) {
                    var date = dayView.model.getDateFormat(TODO.DayModel.FORMATS.DDMMYYYY, "-");
                    var $tr = $("<tr></tr>").appendTo($tbody).addClass(date);
                    $("<td></td>").appendTo($tr).html(date);
                    $("<td></td>").appendTo($tr).html(dayView.model.get("task").name);
                }
            }
        },

        onDayClick: function (dayView) {
            var self = this;
            this.dialog.dialog("open");
            var task = dayView.model.get("task");
            if (task !== null) {
                this.$taskTextBox.prop("value", task.name);
                this.$addTaskBtn.prop("value", "Update");
            }
            else {
                this.$taskTextBox.prop("value", "");
                this.$addTaskBtn.prop("value", "Add");
            }

            if (dayView.model.get("task") === null) {
                this.$deleteTaskBtn.hide();
            }
            else {
                this.$deleteTaskBtn.show();
                this.$deleteTaskBtn.on("click", function (evt) {
                    dayView.model.set("task", null);
                    self._updateCalendarModel(dayView, null);
                    self.dialog.dialog("close");
                    return false;
                });
            }
            this.$taskForm.on("submit", function (evt) {
                var taskName = self.$taskTextBox.prop("value");
                var task = null;
                if (taskName === "") {
                    dayView.model.set("task", task);
                }
                else {
                    task = { name: taskName };
                    task.date = dayView.model.get("month") + "/" + dayView.model.get("day") + "/" + dayView.model.get("year");
                    dayView.model.set("task", task);
                }
                self._updateCalendarModel(dayView, task);

                self.dialog.dialog("close");
                return false;
            });

        },

        _updateCalendarModel: function (dayView, task) {
            this.calendarModel.changeTask(dayView.model.get("month") + "/" + dayView.model.get("day") + "/" + dayView.model.get("year"), task);
            TODO.AppView.instance.onSaveState();
        },

        onMonthChanged: function (arrDayViews) {
            this.renderMonthReport(arrDayViews);
        },

        onTaskAdd: function (dayView) {
            var $tbody = this.$reportTable.find("tbody");
            var date = dayView.model.getDateFormat(TODO.DayModel.FORMATS.DDMMYYYY, "-");
            var $tr = $("<tr></tr>").appendTo($tbody).addClass(date);
            $("<td></td>").appendTo($tr).html(date);
            $("<td></td>").appendTo($tr).html(dayView.model.get("task").name);
        },

        onTaskRemove: function (dayView) {
            var $tbody = this.$reportTable.find("tbody");
            var date = dayView.model.getDateFormat(TODO.DayModel.FORMATS.DDMMYYYY, "-");
            $tbody.find("." + date).remove();
        },

        onTaskUpdate: function (dayView) {
            var $tbody = this.$reportTable.find("tbody");
            var date = dayView.model.getDateFormat(TODO.DayModel.FORMATS.DDMMYYYY, "-");
            $tbody.find("." + date).find("td:nth-child(2)").html(dayView.model.get("task").name);
        },

        onSaveState: function () {
            var obj = this.calendarModel.attributes;
            var jsonData = JSON.stringify(obj);

            //            console.log(jsonData);
            if (typeof (Storage) !== "undefined") {
                localStorage.data = jsonData;
            }
        }

    }, {
        REPORT_TABLE_CLASSNAME: "table-report"
    });

    TODO.AppView = AppView;
})(TODO);

$(document).ready(function () {
    if (typeof (Storage) !== "undefined" && localStorage.data !== undefined) {
        createApp(JSON.parse(localStorage.data));
    }
    else {
        fetchResource();
        //    createApp();
    }
});

function fetchResource() {
    $.ajax({
        url: "res/todocalendar.json",
        success: function (data) {

            //            console.log(window.data);
            createApp(data);
        },
        error: function (statusText, statusCode) {
            alert(statusText + " : " + statusCode);
        }
    });
}

function createApp(data) {
    var App = TODO.App;
    var AppView = TODO.AppView;

    var app = App.instance = new App();
    var appView = AppView.instance = new AppView({ model: app, el: document.body });
    appView.render(data);
}
(function (TODO) {
    "use strict";

    var DayModel = Backbone.Model.extend({
        defaults: {
            day: null,
            month: null,
            year: null,
            task: null
        },

        getDateFormat: function (format, separator) {
            if (format === DayModel.FORMATS.DDMMYYYY) {
                return this.attributes["day"] + separator + this.attributes["month"] + separator + this.attributes["year"];
            }
            else if (format === DayModel.FORMATS.MMDDYYYY) {
                return this.attributes["month"] + separator + this.attributes["day"] + separator + this.attributes["year"];
            }
        }
    },
    {
        FORMATS: {
            MMDDYYYY: 0,
            DDMMYYYY: 1
        }
    });

    TODO.DayModel = DayModel
})(TODO); (function (TODO) {
    "use strict";

    var DayView = Backbone.View.extend({

        events: {
            "click": "_onDayClick",
            'mouseover': '_onMouseOver',
            'mouseout': '_onMouseOut'
        },

        initialize: function () {
            this.listenTo(this.model, "change:task", this._onTaskChanged);
        },

        setCurrentDay: function () {
            this.$el.addClass("today");
        },

        _onTaskChanged: function (model, evt1, evt2, evt3) {
            if (this.model.get("task") === null) {
                this.$el.removeClass("task-present");
                TODO.AppView.instance.onTaskRemove(this);
            }
            else if (model.previous("task") === null) {
                this.$el.addClass("task-present");
                TODO.AppView.instance.onTaskAdd(this);
            }
            else {
                TODO.AppView.instance.onTaskUpdate(this);
            }
        },

        _onDayClick: function (evt) {
            //            console.log(this.model.get("day") + " : " + this.model.get("month") + " : " + this.model.get("year"));
            TODO.AppView.instance.onDayClick(this);
        },

        _onMouseOver: function () {
            this.$el.addClass('hover');
        },

        _onMouseOut: function () {
            this.$el.removeClass('hover');
        },

        _onAddTask: function (evt) {
            console.log("add");
            return false;
        },

        _onDeleteTask: function () {
            console.log("delete");
            return false;
        }



    }, {});

    TODO.DayView = DayView;
})(TODO); (function (TODO) {
    "use strict";

    var CalendarModel = Backbone.Model.extend({

        defaults: function () {
            return {
                startMonth: null,
                startYear: null,
                endMonth: null,
                endYear: null,
                curMonth: null,
                curYear: null,
                tasks: []
            }
        },

        initialize: function () {
            var curMonth = this.get('curMonth'),
                curYear = this.get('curYear'),
                date = new Date();

            if (!curMonth || !curYear) {
                this.set('curMonth', date.getMonth() + 1);
                this.set('curYear', date.getFullYear());
            }
        },

        changeTask: function (date, task) {
            var tasks = this.attributes["tasks"];
            var bTaskExists = false;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].date === date) {
                    bTaskExists == true;
                    if (task === null) {
                        tasks.splice(i, 1);
                    }
                    else {
                        tasks[i].name = task.name;
                    }
                    break;
                }
            }
            if (!bTaskExists && task) {
                tasks.push(task);
            }
        }
    });

    TODO.CalendarModel = CalendarModel;

})(TODO); (function (TODO) {
    "use strict";

    var DayModel = TODO.DayModel;
    var DayView = TODO.DayView;

    var CalendarView = Backbone.View.extend({

        _$btnPrev: null,
        _$btnNext: null,
        _$monthTitle: null,
        _$tableMonthView: null,

        dayViews: [],
        getDayViews: function () {
            return this.dayViews;
        },

        initialize: function () {
        },

        render: function () {
            this._createHeader();
            this._createMonthView();
            this._dayViews = [];
        },

        _createHeader: function () {
            var $header = $("<div></div>");
            $header.addClass("calendar-header");
            this.$el.append($header);

            var $prevBtn = $("<button> Prev </button>");
            $prevBtn.addClass("header-btn prev-btn");
            $header.append($prevBtn);
            this._$btnPrev = $prevBtn;

            var $nextBtn = $("<button> Next </button>");
            $nextBtn.addClass("header-btn next-btn");
            $header.append($nextBtn);
            this._$btnNext = $nextBtn;

            var $monthTitle = $("<div></div>");
            var curMnth = this.model.get("curMonth");
            var curYear = this.model.get("curYear");
            $monthTitle.addClass("header-mnth").html(CalendarView.MONTHS[curMnth - 1] + " - " + curYear);
            $header.append($monthTitle);
            this._$monthTitle = $monthTitle;
            this._bindEvents();
        },

        _createMonthView: function () {
            var $table = $("<table></table>").addClass("table-monthview").appendTo(this.$el);
            this._$tableMonthView = $table;
            var $tableHeader = $("<thead></thead>").appendTo($table);
            var $tableBody = $("<tbody></tbody>").appendTo(this._$tableMonthView);

            this._createWeekHeaders($tableHeader);
            this._createDayView();
        },

        _createWeekHeaders: function ($tableHeader) {
            var $th, $weekName = null;
            var $tr = $("<tr></tr>").addClass("week-header").appendTo($tableHeader);
            for (var i = 0; i < CalendarView.DAYS.length; i++) {
                $th = $("<th></th>").appendTo($tr);
                $weekName = $("<div>" + CalendarView.DAYS[i] + "</div>").appendTo($th);
            }
        },

        _createDayView: function () {
            var $tableBody = this._$tableMonthView.find("tbody");
            $tableBody.empty();
            var curMonth = this.model.get("curMonth");
            var curYear = this.model.get("curYear");
            var lastDateOfMonth = new Date(curYear, curMonth, 0);
            var totalDays = lastDateOfMonth.getDate();
            var startDateOfMonth = new Date(curYear, curMonth, 1 - totalDays);
            var startDay = startDateOfMonth.getDay();

            var $tr = $("<tr></tr>").appendTo($tableBody);
            for (var i = 0; i < startDay; i++) {
                $("<td></td>").appendTo($tr).addClass("day-parent inactive");
            }

            var k = startDay;
            for (var i = 0; i < totalDays; i++) {
                if (k === CalendarView.DAYS_IN_WEEK) {
                    $tr = $("<tr></tr>").appendTo($tableBody);
                    k = 0;
                }
                var $dayDiv = $("<div></div>").addClass("day").html(i + 1);
                $("<td></td>").addClass("day-parent active").append($dayDiv).appendTo($tr);
                var dayModel = new DayModel({ day: (i + 1), month: curMonth, year: curYear });
                var dayView = new DayView({ model: dayModel, el: $dayDiv });
                this.dayViews[i] = dayView;

                k++;
            }

            while (k < CalendarView.DAYS_IN_WEEK) {
                $("<td></td>").addClass("day-parent inactive").appendTo($tr);
                k++;
            }

            this._setCurrentDay();
            this._setTasks();
        },

        _setCurrentDay: function () {
            var today = new Date();
            if ((today.getMonth() + 1) === this.model.get("curMonth") && today.getFullYear() === this.model.get("curYear")) {
                this.dayViews[today.getDate() - 1].setCurrentDay();
            }
        },

        _setTasks: function () {
            var tasks = this.model.get("tasks");
            var curMonth = this.model.get("curMonth");
            var curYear = this.model.get("curYear");
            for (var i = 0; i < tasks.length; i++) {
                var taskDate = new Date(tasks[i].date);
                if ((taskDate.getMonth() + 1) === curMonth && taskDate.getFullYear() === curYear) {
                    this.dayViews[taskDate.getDate() - 1].model.set("task", tasks[i]);
                }
            }
        },

        _bindEvents: function () {
            var self = this;
            this._$btnPrev.on("click", function (evt) { self._onPrevBtnClick.apply(self, arguments) });
            this._$btnNext.on("click", function (evt) { self._onNextBtnClick.apply(self, arguments) });
        },

        _onPrevBtnClick: function (evt) {
            var curYear = this.model.get("curYear");
            var curMonth = this.model.get("curMonth");
            if (curMonth === 1) {
                curMonth = 12;
                curYear -= 1;
            }
            else {
                curMonth -= 1;
            }
            this.model.set("curMonth", curMonth);
            this.model.set("curYear", curYear);
            this._onMonthChanged(curMonth, curYear);
        },

        _onNextBtnClick: function (evt) {
            var curYear = this.model.get("curYear");
            var curMonth = this.model.get("curMonth");
            if (curMonth === 12) {
                curMonth = 1;
                curYear += 1;
            }
            else {
                curMonth += 1;
            }
            this.model.set("curMonth", curMonth);
            this.model.set("curYear", curYear);
            this._onMonthChanged(curMonth, curYear);
        },

        _onMonthChanged: function (curMonth, curYear) {
            var startYear = this.model.get("startYear");
            var startMonth = this.model.get("startMonth");
            var endYear = this.model.get("endYear");
            var endMonth = this.model.get("endMonth");
            if (curMonth === startMonth && curYear === startYear) {
                this._$btnPrev.attr("disabled", "disabled");
            }
            else if (curMonth === endMonth && curYear === endYear) {
                this._$btnNext.attr("disabled", "disabled");
            }
            else {
                this._$btnPrev.removeAttr("disabled");
                this._$btnNext.removeAttr("disabled");
            }

            this._$monthTitle.html(CalendarView.MONTHS[curMonth - 1] + " - " + curYear);
            this._createDayView();
            TODO.AppView.instance.onMonthChanged(this.dayViews);
            TODO.AppView.instance.onSaveState();
        }



    }, {
        MONTHS: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        DAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        DAYS_IN_WEEK: 7
    });

    TODO.CalendarView = CalendarView;
})(TODO);