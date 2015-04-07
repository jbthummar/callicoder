var category = [],
itemsArr = [],
items = [],
itemViews = [];


function fetchResource() {
    $.ajax({
        url: "res/dragdropgame.json",
        success: function (data) {
            window.data = data;
            console.log(window.data);
            parseData();
        },
        error: function (statusText, statusCode) {
            alert(statusText + " : " + statusCode);
        }
    });
}

function parseData() {
    category = data.category;
    itemsArr = data.items;

    createItemsArray(itemsArr, items, 5);
    createItems();
    createContainers();
}

function createItemsArray(source, result, count) {
    var type;
    for (var i = 0; i < category.length; i++) {
        type = category[i];
        for (var j = 0, k = 0; k < count;) {
            var c = parseInt(Math.random() * (source.length), 10),
                item = source[c],
                itemCategories = item.category;
            if (itemCategories.indexOf(type) !== -1 && result.indexOf(item.title) === -1) {
                result.push(item);
                k++;
            }
        }
    }
}


function createItems() {
    var parent = document.getElementById("origitem_container"),
        tempArr = [];
    for (var i = 0; i < items.length; i++) {
        var j = getUniqRandomValue(items.length, tempArr);
        tempArr.push(j);
        var item = items[j];
        var itemModel = new ItemModel(item);
        var itemElement = createItemElement(item);
        parent.appendChild(itemElement);
        var itemView = new ItemView({ model: itemModel, el: itemElement });
        itemViews[j] = itemView;
    }
}

function getUniqRandomValue(count, arr) {
    var found = false;
    while (!found) {
        var value = parseInt(Math.random() * count, 10);
        if (arr.indexOf(value) === -1) {
            return value;
        }
    }
}

function createItemElement(item) {
    var elm = document.createElement("li");
    $(elm).html(item.title).attr("category", item.category.join(" "));

    return elm;
}

function createContainers() {
    var columnWidth = 100 / category.length;
    var itemContainerTable = document.getElementById("item_container_table");
    var tableHeader = itemContainerTable.createTHead();
    var headerRow = tableHeader.insertRow(-1);
    $(headerRow).css({ "background": "rgb(117, 123, 147)", "color": "rgb(87, 0, 0)", 'padding': '10px 0', 'font-size': '20px' });
    var tableBody = itemContainerTable.createTBody();
    var dataRow = tableBody.insertRow(-1);
    $(dataRow).css("background", "green");

    for (var i = 0; i < category.length; i++) {
        var headerCell = headerRow.insertCell(-1);
        headerCell.style.width = columnWidth + "%";
        $(headerCell).html(category[i].charAt(0).toUpperCase() + category[i].slice(1));
        var dataCell = dataRow.insertCell(-1);
        var containerModel = new ItemContainerModel({ category: category[i] });
        var containerView = new ItemContainerView({ model: containerModel, el: dataCell });
    }
}

var onReplayClick = function () {
    $("#table_result").find('tbody').remove();
    $('#item_container_table').empty();
    $('#origitem_container').empty();
    category = [];
    itemsArr = [];
    items = [];
    itemViews = [];
    fetchResource();
}


Helper = {};
Helper.logMessage = function (source, target, bCorrect) {
    console.log(source + " : " + target + " : " + bCorrect);
    var row = $("<tr></tr>");
    var strAction;
    if (bCorrect) {
        strAction = "Correct";
        row.addClass("correct");
    }
    else {
        strAction = "Incorrect";
        row.addClass("incorrect");;
    }
    var row = row.append("<td>" + source + "</td><td>" + target + "</td><td>" + strAction + "</td>");
    var table = $("#table_result");
    table.append(row);
    var scrollParent = table.scrollParent();
    scrollParent.scrollTop(table.height() - scrollParent.height());
}