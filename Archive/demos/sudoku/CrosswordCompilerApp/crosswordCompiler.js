$(function () {
    Cell = {
        DomObject: {}, IsBlock: false, IsLetter: false, CellXML: {}, LEFT2: 0, TOP2: 0, LEFT: 0, TOP: 0, Color: "white", X: 0, Y: 0, x: 0, y: 0, Cell: {}, Size: 21, Options: {}, CellOptions: {}, TickerHeight: 0, TickerWidth: 0, Start: function (b, e, c, a, d) {
            this.GameType = a;
            this.DivGame = CrossWord.DivGame;
            this.LEFT = Grid.InicioX;
            this.TOP = Grid.InicioY;
            this.Options = c;
            this.DomObject = e;
            this.x = parseInt(this.DomObject.attr("x").split("-")[0]);
            this.y = parseInt(this.DomObject.attr("y").split("-")[0]);
            this.X = this.x * Grid.Size;
            this.Y = this.y * Grid.Size;
            this.TickerHeight = 0;
            this.TickerWidth = 0;
            this.LEFT2 = Grid.InicioX + this.x * Grid.Size - Grid.Size;
            this.TOP2 = Grid.InicioY + this.y * Grid.Size - Grid.Size;
            this.Size = Grid.Size;
            this.ArrowSettings = d;
            this.SetAttributes();
            this.DrawCell();
            if (!this.IsBlock) {
                if (!CrossWord.Attributes["hide-numbers"]) {
                    this.DrawNumbers()
                }
                this.DrawBars();
                this.DrawClues();
                this.DrawArrow();
                this.DrawSolution();
                this.DrawShape()
            }
            this.DrawPicture();
            this.SetTickerBorder();
            this.Cell.data("CellProps", { IsBlock: this.IsBlock, CellOptions: this.CellOptions, Size: this.Size })
        }, Attributes: { x: 0, y: 0, type: "letter", solution: "", "solve-status": "", "solve-state": "", hint: "", number: "", "top-right-number": "", "left-bar": "", "top-bar": "", "background-shape": "circle", "background-color": "white", "foreground-color": "", noclue: "" }, ArrowSettings: { stem: 0.1, "head-width": 0.1, "head-length": 0.1, "bend-start": 0.2, "bend-end": 0.1, "bend-side-offset": 0.1 }, SetAttributes: function () {
            var a = this;
            this.CellOptions = {};
            $.each(this.Attributes, function (b, c) {
                var d = a.DomObject.attr(b);
                if (d != null) {
                    a.CellOptions[b] = d
                }
            });
            this.IsLetter = false;
            this.IsBlock = (this.CellOptions.type == "block") ? true : false;
            return false
        }, Protector: null, DrawProtect: function (b) {
            b = b || this.Cell;
            var a = b.data("CellProps") || b;
            if ((!a.IsBlock && a.CellOptions.type != "clue") || a.CellOptions.type == "letter") {
                a.Protector = b.fillRect(0, 0, this.Size, this.Size, { color: "transparent" });
                a.Protector.css({ textAlign: "center", fontFamily: "sans-serif", fontSize: a.Size * 1.1 + "px", color: "red", fontWeight: "normal" }).append($("<div/>").css({ opacity: "0" }).html("X"));
                b.data("Protector", a.Protector.find("div:eq(0)"))
            }
            return false
        }, DrawCell: function () {
            this.Cell = null;
            this.Color = (this.IsBlock && !this.Options["italian-style"]) ? Grid.Settings["block-color"] : Grid.Settings["grid-background-color"];
            this.Color = (this.CellOptions.hasOwnProperty("background-color")) ? this.CellOptions["background-color"] : this.Color;
            var a = this.DomObject.find("background-picture");
            if (a.length == 1 && !this.IsLetter) {
                if (a.attr("rebus") != "true") {
                    var b = "data:image/" + a.attr("format") + ";base64," + a.text();
                    $("<img src='" + b + "'/>").css({ height: this.Size + "px", width: this.Size + "px", position: "absolute", left: this.X + this.LEFT - this.Size, top: this.Y - this.Size + this.TOP }).appendTo(Iframe);
                    this.Color = "transparent"
                }
            }
            this.Cell = $(CreateMyCustomDiv(this.Size, this.Size, this.Color, this.Y - this.Size + this.TOP, this.X + this.LEFT - this.Size, ((isWordSearch) ? this.Color : Grid.Settings["grid-line-color"])));
            this.Cell.appendTo(Iframe);
            if (this.IsBlock && this.Options["italian-style"] != false) {
                this.Cell.fillRect(2, 2, parseInt(this.Size) - 5, parseInt(this.Size) - 5, { color: this.Options["block-color"] });
                Iframe.drawRect(this.X + this.LEFT - this.Size, (this.Y) - this.Size + this.TOP, parseInt(this.Size), parseInt(this.Size), { color: Grid.Settings["grid-line-color"] })
            }
            (!this.IsBlock) ? this.Cell.data("background-color", this.Color).data("data", this.CellOptions) : true;
            return false
        }, DrawNumbers: function () {
            if (!this.IsBlock && this.CellOptions.hasOwnProperty("number")) {
                var a = document.createElement("span");
                a.setAttribute("style", "font-family:sans-serif;margin-left:2px;font-weight:lighter;font-size:" + parseInt(this.Size * 0.35) + "px;float:left;color:" + this.Options["number-color"]);
                a.innerHTML = this.CellOptions.number;
                this.Cell.append(a)
            }
            if (this.CellOptions.hasOwnProperty("top-right-number") && this.CellOptions["top-right-number"] != "") {
                var a = document.createElement("span");
                a.setAttribute("style", "font-family:sans-serif;margin-right:2px;font-size:" + parseInt(this.Size * 0.4) + "px;float:right;color:" + this.Options["number-color"]);
                a.innerHTML = this.CellOptions["top-right-number"];
                this.Cell.append(a)
            }
            return false
        }, DrawBars: function () {
            if (this.CellOptions.hasOwnProperty("top-bar") && this.CellOptions["top-bar"] == "true") {
                Iframe.fillRect(this.X + this.LEFT - this.Size, (this.Y) - this.Size + this.TOP - 1, this.Size, 3)
            }
            if (this.CellOptions.hasOwnProperty("left-bar") && this.CellOptions["left-bar"] == "true") {
                Iframe.fillRect(this.X + this.LEFT - this.Size - 1, (this.Y) - this.Size + this.TOP, 3, this.Size)
            }
            return false
        }, DrawArrow: function () {
            var a = this;
            $.each(this.DomObject.find("arrow"), function (l, x) {
                var z = $(this).attr("from");
                var g = $(this).attr("to");
                var i = ($(this).attr("from-fraction")) ? parseFloat($(this).attr("from-fraction")) : 0.5;
                var c = ($(this).attr("continue-word") == "true") ? true : false;
                var u = a.Size;
                var m = a.Size;
                var q = m;
                var y = u;
                var f = 0;
                var p = 0;
                var s = parseInt((parseFloat(a.ArrowSettings.stem) * m));
                var n = Math.max(1, parseInt(((parseFloat(a.ArrowSettings["head-width"]) / 2) * m)));
                var o = Math.max(2, parseInt((parseFloat(a.ArrowSettings["head-length"]) * m)));
                var k = parseInt((parseFloat(a.ArrowSettings["bend-start"]) * m));
                var v = parseInt((parseFloat(a.ArrowSettings["bend-end"]) * m));
                var j = parseInt((parseFloat(a.ArrowSettings["bend-side-offset"]) * m));
                var A = (a.Options.hasOwnProperty("grid-line-color")) ? a.Options["grid-line-color"] : "black";
                if (c) {
                    if (z == "left" && g == "bottom,") {
                        var e = q - j;
                        a.Cell.drawPolygon([e - s, e], [p + j, p + j], { color: A });
                        a.Cell.drawPolygon([e, e], [p + j, p + j + s], { color: A });
                        a.Cell.fillPolygon([e - n, e + n, e], [p + j + s, p + j + s, p + j + s + o], { color: A })
                    } else {
                        if (z == "top" && g == "right") {
                            var e = f + j;
                            var d = y - j;
                            a.Cell.drawPolygon([e, e], [d - s, d], { color: A });
                            a.Cell.drawPolygon([e, e + s], [d, d], { color: A });
                            a.Cell.fillPolygon([e + s, e + s, e + s + o], [d - n, d + n, d], { color: A })
                        }
                    }
                    return false
                }
                if (z == "bottom") {
                    if (g == "top") {
                        var e = (f + q) / 2;
                        a.Cell.drawPolygon([e, e], [y, y - s], { color: A });
                        a.Cell.fillPolygon([e - n, e + n, e], [y - s, y - s, (y - s) - o], { color: A })
                    } else {
                        if (g == "left") {
                            var e = q - j;
                            var d = y - k;
                            a.Cell.drawPolygon([e, e], [y, y - k], { color: A });
                            a.Cell.drawPolygon([e, e - v], [d, d], { color: A });
                            a.Cell.fillPolygon([e - v, e - v, e - v - o], [d - n, d + n, d], { color: A })
                        } else {
                            if (g == "right") {
                                var e = f + j;
                                a.Cell.fillPolygon([e, e], [y, y - k], { color: A });
                                a.Cell.drawPolygon([e, e + v], [y - k, y - k], { color: A });
                                a.Cell.fillPolygon([e + v, e + v, e + v + o], [(y - k) - n, (y - k) + n, (y - k)], { color: A })
                            }
                        }
                    }
                }
                if (z == "top") {
                    if (g == "bottom") {
                        var e = (f + q) / 2;
                        a.Cell.drawPolygon([e, e], [p, (p + s)], { color: A });
                        a.Cell.fillPolygon([e - n, e + n, e], [(p + s), (p + s), (p + s) + o], { color: A })
                    } else {
                        if (g == "left") {
                            var e = q - j;
                            var d = p + k;
                            a.Cell.drawPolygon([e, e], [p, d], { color: A });
                            a.Cell.drawPolygon([e, e - v], [d, d], { color: A });
                            a.Cell.fillPolygon([e - v, e - v, e - v - o], [d - n, d + n, d], { color: A })
                        } else {
                            if (g == "right") {
                                var e = f + j;
                                a.Cell.drawPolygon([e, e], [p, p + k], { color: A });
                                a.Cell.drawPolygon([e, e + v], [p + k, p + k], { color: A });
                                a.Cell.fillPolygon([e + v, e + v, e + v + o], [(p + k) - n, (p + k) + n, (p + k)], { color: A })
                            }
                        }
                    }
                }
                if (z == "left") {
                    if (g == "right") {
                        var e = f;
                        var d = parseInt((p + u * i));
                        a.Cell.drawPolygon([e, e + s], [d, d], { color: A });
                        a.Cell.fillPolygon([e + s, e + s, e + s + o], [d - n, d + n, d], { color: A })
                    } else {
                        if (g == "bottom") {
                            var d = p + j;
                            var e = f + k;
                            a.Cell.drawPolygon([f, e], [d, d], { color: A });
                            a.Cell.drawPolygon([e, e], [d, d + v], { color: A });
                            a.Cell.fillPolygon([e - n, e + n, e], [d + v, d + v, d + v + o], { color: A })
                        } else {
                            if (g == "top") {
                                var d = y - j;
                                var e = f + k;
                                a.Cell.drawPolygon([f, e], [d, d], { color: A });
                                a.Cell.drawPolygon([e, e], [d, d - v], { color: A });
                                a.Cell.fillPolygon([e - n, e + n, e], [d - v, d - v, d - v - o], { color: A })
                            }
                        }
                    }
                }
                if (z == "right") {
                    if (g == "left") {
                        var e = q;
                        var d = parseInt((p + u) * i);
                        a.Cell.drawPolygon([e, e - s], [d, d], { color: A });
                        a.Cell.fillPolygon([e - s, e - s, (e - s) - o], [d - n, d + n, d], { color: A })
                    } else {
                        if (g == "bottom") {
                            var d = p + j;
                            var e = q - k;
                            a.Cell.drawPolygon([q, e], [d, d], { color: A });
                            a.Cell.drawPolygon([e, e], [d, (d + v)], { color: A });
                            a.Cell.fillPolygon([e - n, e + n, e], [(d + v), (d + v), (d + v) + o], { color: A })
                        } else {
                            if (g == "top") {
                                var e = q - k;
                                var d = y - j;
                                a.Cell.drawPolygon([q, e], [d, d], { color: A });
                                a.Cell.drawPolygon([e, e], [d, (d - v)], { color: A });
                                a.Cell.fillPolygon([e - n, e + n, e], [d - v, d - v, (d - v) - o], { color: A })
                            }
                        }
                    }
                }
            });
            return false
        }, DrawPicture: function () {
            var b = this.DomObject.find("background-picture");
            if (b.length == 0) {
                return false
            }
            var a = this.DomObject.attr("x").split("-");
            var e = this.DomObject.attr("y").split("-");
            var c = this;
            a = a[1] - a[0] + 1;
            e = e[1] - e[0] + 1;
            a = (isNaN(a)) ? 1 : a;
            e = (isNaN(e)) ? 1 : e;
            var d = "data:image/" + b.attr("format") + ";base64," + b.text();
            if (this.CellOptions.type == "block") {
                if (a != 1) {
                    this.Cell = Iframe.find("div:last");
                    this.Cell.data("data", this.CellOptions);
                    this.TickerHeight = e * this.Size + 3;
                    this.TickerWidth = a * this.Size + 1;
                    this.Cell.data("TickerWidth", a * this.Size + 1);
                    this.Cell.data("TickerHeight", e * this.Size + 3);
                    $("<img src='" + d + "'/>").css({ zIndex: 1, position: "absolute", left: this.X + this.LEFT - this.Size, top: this.Y - this.Size + this.TOP }).width(a * this.Size + 1).height(e * this.Size + 1).appendTo(Iframe);
                    $(CreateMyCustomDiv(e * this.Size - 1, a * this.Size - 1, "transparent", this.Y - this.Size + this.TOP, this.X + this.LEFT - this.Size, "black")).css({ zIndex: 1 }).appendTo(Iframe)
                } else {
                    Iframe.fillRect(this.X + this.LEFT - this.Size + 1, this.Y - this.Size + this.TOP + 1, a * this.Size, e * this.Size, parseInt(this.Size), { color: "transparent" });
                    Iframe.find("div:last").append("<img src='" + d + "'  style='position: absolute;left:0px' />")
                }
                return true
            } else {
                if (this.CellOptions.type == "clue") {
                    c.Cell.append("<img src='" + d + "'  style='position: absolute;top:0px;left:0px' />");
                    c.Cell.find("img:last").click(function () {
                        $(this).parent().find("li").click()
                    });
                    return true
                } else {
                    if (b.attr("rebus") == "true") {
                        this.Cell.append("<img src='" + d + "' style='position: absolute;left:2px,top:1px' />")
                    }
                }
            }
            this.Cell.data("Use").img = false;
            if (b.attr("rebus") == "true") {
                this.Cell.find("img").hide();
                this.Cell.data("Use").img = true
            }
            return false
        }, DrawSolution: function () {
            this.IsLetter = false;
            if (this.CellOptions.type != null && this.CellOptions.type != "letter") {
                return false
            }
            this.IsLetter = true;
            if ((this.CellOptions.hint == null || this.CellOptions.hint != "true") && !isWordSearch && Grid.GameType != "coded") {
                Grid.Goal++
            }
            var b = Grid.DomForSolution.clone();
            b.appendTo(this.Cell);
            var a = b.find("span");
            this.Cell.data("ObjectLetter", a);
            this.Cell.data("WordId", []);
            this.Cell.data("WordItem", []);
            this.Cell.data("LIS", []);
            if (isCoded) {
                if (this.CellOptions.hint == "true") {
                    Grid.CodedHint.push(this.CellOptions)
                }
            }
            if ((this.CellOptions.hint == "true" || isWordSearch) && !isCoded) {
                a.html(this.CellOptions.solution);
                this.Cell.textfill(Grid.FontSize);
                if (isWordSearch) {
                    a.css({ "font-size": Grid.FontSize + "px" });
                    a.parent().css({ "margin-top": parseInt(Grid.Size * 0.15) + "px" })
                } else {
                    if (isSudoku) {
                        a.parent().css({ "margin-top": parseInt(Grid.Size * 0.15) + "px" })
                    }
                }
                if (this.CellOptions["foreground-color"]) {
                    a.css({ color: this.CellOptions["foreground-color"] })
                }
                a.parent().css({ fontWeight: "bolder" })
            } else {
                if (!Grid.CodedLetter.hasOwnProperty(this.CellOptions.solution) && Grid.GameType == "coded") {
                    Grid.CodedLetter[this.CellOptions.solution] = [];
                    Grid.Goal++
                }
                if (Grid.CodedLetter.hasOwnProperty(this.CellOptions.solution)) {
                    Grid.CodedLetter[this.CellOptions.solution].push(this.Cell)
                }
            }
            if (this.CellOptions["solve-state"]) {
                a.html(this.CellOptions["solve-state"]);
                this.Cell.data("UserSolution", Data["solve-state"])
            }
            this.CellOptions.solution = (this.CellOptions.solution) ? this.CellOptions.solution : "";
            this.Cell.data("Use", { alone: this.CellOptions.solution.split("").length == 1, solution: this.CellOptions.solution, hint: this.CellOptions.hint == "true" });
            return false
        }, DrawShape: function () {
            if (this.CellOptions["background-shape"]) {
                var c = this.Cell.fillRect(0, 0, this.Size, this.Size, { color: "transparent" });
                var a = RandomString();
                c.attr({ id: a });
                var d = Raphael(a, this.Size, this.Size);
                var b = d.circle(parseInt(this.Size / 2), parseInt(this.Size / 2), parseInt(this.Size / 2) - 1);
                b.attr({ "stroke-width": 2, stroke: "black" })
            }
            return false
        }, DrawClues: function () {
            if (this.CellOptions.type == "clue") {
                var a = $("<table border='0' cellspacing='0'><tr><td></td></tr></table>").css({ fontSize: "10px" }).appendTo(this.Cell);
                var c = 10;
                this.DomObject.find("clue").each(function (e, g) {
                    var d = $(g).text();
                    var f = "";
                    d = d.split("\\");
                    $.each(d, function (j, k) {
                        (j != 0) ? f += "<br/>" + k.slice(1, k.length) : f += k
                    });
                    var i = $(g).attr("word");
                    if (!i) {
                        return
                    }
                    var h = Clues.Words[i];
                    $("<li/>").addClass("ClueCell").attr({ id: "LI" + i }).data("word", i).data("coordinates", h.x + "," + h.y).css({ "list-style-type": "none", "text-align": "center", "border-top": (e > 0) ? "solid 1px " + Grid.Settings["grid-line-color"] : "0px", "font-family": "sans-serif" }).html((f != null && f != "") ? f : "Clue").appendTo(a.find("td")).data("Cells", CellContains(h)).data("data", g)
                });
                var b = a.find("td li");
                while (a.width() > Grid.Size - 3) {
                    b.css({ fontSize: c-- + "px" })
                }
                while (a.height() > Grid.Size - 3) {
                    b.css({ fontSize: c-- + "px" })
                }
                a.css({ height: "100%", width: "100%", backgroundColor: this.CellOptions["background-color"] ? this.CellOptions["background-color"] : Grid.Settings["clue-background-color"] })
            }
            return false
        }, Sones: {}, SetTickerBorder: function () {
            var d = null;
            if (this.y + 1 <= Grid.Height && (Grid.Cells[this.x][this.y + 1] == "" || Grid.Cells[this.x][this.y + 1] == null)) {
                d = $(CreateMyCustomDiv2(0, this.Size + 1, "transparent", this.Y + this.TOP, this.X + this.LEFT - this.Size)).appendTo(Iframe);
                this.Cell.css({ borderBottom: "0px" });
                d.css({ height: "1px", borderTop: "solid 1px " + Grid.Settings["grid-line-color"] })
            }
            if (this.x + 1 <= Grid.Width && (Grid.Cells[this.x + 1][this.y] == "" || Grid.Cells[this.x + 1][this.y] == null)) {
                d = $(CreateMyCustomDiv2(this.Size + 1, 0, Grid.Settings["grid-background-color"], this.Y + this.TOP - this.Size, this.X + this.LEFT)).appendTo(Iframe);
                this.Cell.css({ borderRight: "0px" });
                d.css({ width: "1px", borderLeft: "solid 1px " + Grid.Settings["grid-line-color"] })
            }
            if (Grid.Settings["thick-border"] == false) {
                return false
            }
            var f = Grid.Settings["grid-line-color"];
            var g = ((this.TickerHeight != 0) ? this.TickerHeight : Grid.Size) + 1;
            var a = (this.TickerWidth != 0) ? this.TickerWidth : Grid.Size;
            var c = false;
            var e = false;
            if (Grid.Cells[this.x][this.y - 1] == "") {
                $(CreateMyCustomDiv(3, a, f, this.TOP2 - 1, this.LEFT2, "transparent")).appendTo(Iframe);
                c = true
            }
            if (Grid.Cells[this.x][this.y + 1] == "" || Grid.Cells[this.x][this.y + 1] == null) {
                $(CreateMyCustomDiv(3, a, f, (this.TOP2 + g) - 2, this.LEFT2, "transparent")).appendTo(Iframe);
                e = true
            }
            var b = ((e) ? 1 : 0);
            if (this.y == Grid.Height) {
            }
            if (Grid.Cells[this.x + 1] == null || Grid.Cells[this.x + 1][this.y] == "") {
                $(CreateMyCustomDiv(g + b, 3, f, this.TOP2 + ((c) ? -1 : 0), this.LEFT2 + a - 1, "transparent")).appendTo(Iframe)
            }
            if (Grid.Cells[this.x - 1] == null || Grid.Cells[this.x - 1][this.y] == "") {
                $(CreateMyCustomDiv(g + b, 3, f, this.TOP2 + ((c) ? -1 : 0), this.LEFT2 - 1, "transparent")).appendTo(Iframe)
            }
            return false
        }
    }
});
$(function () {
    Clues = {
        AppletSettings: "applet-settings", NumberClues: 0, SuperFather: "rectangular-puzzle", GameType: "", NameClues: "clues", GroupClues: {}, NameClue: "clue", NameWord: "word", KeyWords: [], XML: {}, Words: {}, WordsWordSearch: {}, HasKeyWord: false, KeyWordCells: [], KeyWordID: [], Attributes: { layout: "below", "font-family": "sans-serif", "font-size": "15", width: "100", gutter: "", "selection-color": "red", "right-align-numbers": "true", "clue-indent-align": "true", "bold-numbers": "true", "period-with-numbers": "true", "heading-centered": "false", "target-frame": "", "hint-url-text": "?", "url-color": "blue", "scroll-color": "gray", "completed-color": "gray", color: "black" }, Override: { SELCOLOR: "selection-color", CLUECOLOR: "color", URLCOLOR: "url-color", HINTURLTEXT: "hint-url-text", SCROLLCOLOR: "scroll-color", CLUEURLTARGET: "target-frame" }, Start: function (a) {
            this.XML = SuperXML;
            this.GameType = a;
            this.SetCssProperties();
            this.SetWords();
            this.FindClues();
            this.DrawClues();
            return false
        }, SetWords: function () {
            var b = this;
            var a = this.XML.find(this.SuperFather).find(this.NameWord);
            a.each(function (c, d) {
                var e = $(this);
                b.Words[e.attr("id")] = { x: e.attr("x"), y: e.attr("y"), solution: e.attr("solution"), hidden: e.attr("hidden"), keyword: e.attr("keyword"), cells: e.find("cells"), id: e.attr("id"), Squares: (e.attr("x")) ? CellContains({ x: e.attr("x"), y: e.attr("y") }) : [], WordSearch: e.attr("x") + "/" + e.attr("y") };
                if (isWordSearch) {
                    Grid.Goal++;
                    b.WordsWordSearch[e.attr("x") + "/" + e.attr("y")] = b.Words[e.attr("id")]
                }
                if (e.attr("keyword") == "true") {
                    b.KeyWords.push(b.Words[e.attr("id")])
                }
            });
            return false
        }, KeyWord: function () {
            var e = this;
            $.each(this.KeyWords, function (g, h) {
                $.each(h.cells, function (i, j) {
                })
            });
            var c = Grid;
            var b = parseInt(Grid.Settings["cell-size-in-pixels"]);
            var d = Grid.Height;
            var a = Grid.InicioY;
            var f = (b * d) + a + 4;
            $.each(this.KeyWords, function (g, h) {
                e.HasKeyWord = true;
                var i = ((d - h.cells.length) * b) / 2;
                $.each(h.cells, function (k, m) {
                    Iframe.fillRect(k * b + c.InicioX + i - 1, f - 1, b + 2, b + 2, { color: "black" });
                    Iframe.fillRect(k * b + c.InicioX + i, f, b, b, { color: "white" });
                    Iframe.find("div:last").data("data", m);
                    var j = Iframe.find("div:last");
                    j.css({ cursor: "pointer" });
                    e.KeyWordCells.push(j);
                    e.KeyWordID[$(this).attr("x") + $(this).attr("y")] = Iframe.find("div:last");
                    var l = Grid.DomForSolution.clone();
                    l.css({ "margin-top": parseInt(Grid.Size * 0.1) + "px", height: Grid.Size - 5 + "px", fontSize: parseInt(Grid.Size * 0.75) + "px", fontWeight: "bolder" }).data("fontSize", parseInt(Grid.Size * 0.75)).appendTo(j)
                })
            });
            this.SetEventKeyWord();
            return false
        }, FindClues: function () {
            var a = this;
            this.XML.find(this.SuperFather).find(this.NameClues).each(function (b, d) {
                var e = $(this);
                var c = xmlTag(e.find("title"));
                a.GroupClues[c] = [];
                e.find(a.NameClue).each(function (f, h) {
                    var i = $(this);
                    var g = { Text: (xmlTag(i) != "") ? xmlTag(i) : i.text(), Word: i.attr("word"), Number: (i.attr("number")) ? i.attr("number") : "", Format: i.attr("format"), IsLink: i.attr("is-link"), HintUrl: i.attr("hint-url"), Citation: i.attr("citation") };
                    a.GroupClues[c].push(g)
                })
            });
            return false
        }, DrawClues: function () {
            var b = this;
            var a = $("<div/>").css({ fontFamily: this.Attributes["font-family"], fontSize: parseInt(b.Attributes["font-size"]), border: "0px" }).html("<center/>");
            this.Div = a;
            this.Div.appendTo(Iframe);
            $.each(this.GroupClues, function (c, e) {
                var f = (b.Attributes["heading-centered"] == "true") ? "center" : "span";
                var d = $("<div/>").css({ width: (b.Attributes.layout == "left") ? (parseInt(b.Attributes.width) - 5) + "px" : (parseInt(b.Attributes.width)) + "px", color: b.Attributes.color, border: "0px", "text-align": "left", position: "relative" }).append($("<" + f + "/>").css({ height: (c != "") ? "10%" : "0px", "margin-left": (f == "span") ? "12px" : "0px", "font-size": "100%" }).html(c)).append($("<div/>").css({ "margin-left": "0px", height: (c != "") ? "90%" : "100%", "overflow-x": "hidden", "overflow-y": "auto" }).append($("<p/>").css({ height: "100px" }))).appendTo(a);
                $.each(e, function (h, l) {
                    var k = (l.Word) ? l.Word : null;
                    var j = b.Words[k];
                    var i = $("<p/>").css({ position: "relative", width: "100%", marginTop: "0px", marginBottom: "0px", border: "solid 1px transparent" });
                    $("<li/>").attr({ id: "LI" + k }).css({ "list-style-type": "none", width: "98%", "margin-top": "3px", "font-weight": "normal", "text-align": "left", cursor: "pointer", position: "relative" }).addClass(b.ClueClass).data("data", l).data("index", b.NumberClues).data("word", k).data("coordinates", (j) ? j.x + "," + j.y : []).data("Cells", (j) ? CellContains(j) : []).append(i).appendTo(d.find("div"));
                    b.NumberClues++;
                    if (l.Number != null && l.Number != "") {
                        var g = (parseInt(l.Number) < 10 && b.Attributes["right-align-numbers"] == "true") ? "&nbsp;" + l.Number + "&nbsp;" : l.Number;
                        g += (b.Attributes["period-with-numbers"] == "true") ? ".&nbsp;" : "&nbsp;";
                        $("<span/>").css({ "font-weight": (b.Attributes["bold-numbers"]) ? "bold" : "normal", width: "10%" }).html(g).appendTo(i)
                    }
                    $("<span/>").css({ fontWeight: "normal" }).html(l.Text + ((l.Format != null) ? "&nbsp;(" + l.Format + ")" : "")).appendTo(i);
                    if (l.HintUrl != null && l.HintUrl != "") {
                        $("<span/>").css({ fontWeight: "bolder", position: "absolute", "float": "right", top: "0px", color: (b.Attributes["url-color"]) ? b.Attributes["url-color"] : b.Attributes.color }).html("[" + b.Attributes["hint-url-text"] + "]").appendTo(i.parent()).click(function () {
                            Completition.ShowProcessedURL(l.HintUrl, b.Attributes["target-frame"], false, false)
                        })
                    }
                })
            });
            return false
        }, SetCssProperties: function () {
            var d = this;
            var c = d.XML.find(d.AppletSettings).find("clues");
            for (var a in this.Attributes) {
                var b = c.attr(a);
                if (b != null) {
                    this.Attributes[a] = b
                }
            }
            this.Attributes["font-family"] = FontName(this.Attributes["font-family"]);
            for (var a in this.Override) {
                if (CrossWord.Params[a] != null) {
                    this.Attributes[this.Override[a]] = CrossWord.Params[a]
                }
            }
            CustomScrollBar("#" + IdDivGame, this.Attributes["scroll-color"], "CrosswordImages/scrollbar/");
            return false
        }, SetEventClick: function () {
            var a = this;
            Iframe.find("li").click(function () {
                var b = $(this);
                Grid.IdWord = b.data("word");
                if (isWordSearch) {
                    a.ResetLi();
                    a.SetLiClicked($(this))
                } else {
                    Grid.ClueAction(b.data("Cells"))
                }
            });
            return false
        }, SetReference: function (a) {
            a.find(">p").css({ color: this.Attributes["selection-color"] });
            return false
        }, SetLiClicked: function (a) {
            if (!a.hasClass("ClueCell")) {
                a.addClass("Selected").find(">p").css({ border: "solid 1px " + this.Attributes["selection-color"], color: this.Attributes["selection-color"] })
            } else {
                a.addClass("Selected").css({ color: this.Attributes["selection-color"] })
            }
            return false
        }, ResetLi: function () {
            Iframe.find("li").not(".ClueCell").removeClass("Selected").find(">p").css({ border: "solid 1px transparent", color: this.Attributes.color });
            Iframe.find("li.ClueCell").removeClass("Selected").css({ color: this.Attributes.color });
            Iframe.find("li.IsLink").not(".ClueCell").removeClass("Selected").find(">p").css({ border: "0px", color: this.Attributes["url-color"] });
            Iframe.find("li.Completed").css({ color: this.Attributes["completed-color"] }).find(">p").css({ color: this.Attributes["completed-color"] });
            return false
        }, GetWords: function () {
            return this.Words
        }, LinkToWord: function (a) {
            if (this.GameType != "word-search") {
                Grid.ClueAction(a)
            }
        }, SetEventKeyWord: function () {
            $.each(this.KeyWordCells, function (a, b) {
                b.click(function () {
                    var c = $($(this).data("data"));
                    Grid.GridSetCellSelected(c.attr("x"), c.attr("y"))
                })
            });
            return false
        }
    }
});
$(function () {
    Completition = {
        HasShown: false, TypeGame: "", ShowSolution: false, XML: {}, Settings: { SUBMIT: "%SUBMIT%", MARKED: "%MARKED%", PROGRESS: "%PROGRESS%", TIME: "%TIME%", CHARSET: "%CHARSET%", KEYWORD: "%KEYWORD%" }, Cells: null, OnlyIfCorrect: false, Words: null, Picture: null, PictureURL: null, PictureFrame: null, PictureType: "GET", LinkURL: null, LinkFrame: "self", LinkType: "GET", Message: null, FriendlySubmit: 0, SubmitURL: null, SubmitFrame: null, SubmitType: "GET", SaveUrl: null, ShowProcessedURL: function (a, g, i, h) {
            var c = this.SubPlaceHolders(a, 1, h);
            var b = c.indexOf("?");
            Variables = [];
            if (b != -1) {
                Variables = c.substr(b + 1).split("&");
                b = c.substr(0, b)
            } else {
                b = c
            }
            if (g == "" || g == null) {
                g = i ? "_self" : "_blank"
            }
            var e = (h) ? "POST" : "GET";
            if (e == "POST") {
                var f = $("<form />").fadeOut().attr({ method: "POST", target: g, action: b });
                $.each(Variables, function (k, l) {
                    var j = l.split("=");
                    $("<input/>").attr({ name: j[0], value: j[1], hidden: true }).appendTo(f)
                });
                $("<input type='submit' value='post'/>").attr({ hidden: true }).appendTo(f);
                f.appendTo("body");
                var d = $.post(b, f.serializeArray(), function (k, j) {
                    var l = k.substring(4);
                    if (g == "_self" || g == "self") {
                        window.location = l
                    } else {
                        if (g == "_blank" || g == "blank") {
                            window.open(l)
                        } else {
                            $("#" + g).attr({ src: l })
                        }
                    }
                }, "html");
                d.fail(function () {
                    alert("Error submitting: must have internet connection and be submitting to same website as puzzle page")
                })
            } else {
                if (g == "_self" || g == "self") {
                    window.location = c
                } else {
                    if (g == "_blank" || g == "blank") {
                        window.open(c)
                    } else {
                        $("#" + g).attr({ src: c })
                    }
                }
            }
        }, SubPlaceHolders: function (g, b, c) {
            var f = g;
            var e = f.indexOf(this.Settings.SUBMIT);
            (e != -1) ? f = f.substr(0, e) + this.GetSubmit(c) + f.substr(e + 8) : true;
            e = f.indexOf(this.Settings.PROGRESS);
            (e != -1) ? f = f.substr(0, e) + this.GetProgressString(0, c) + f.substr(e + 10) : true;
            e = f.indexOf(this.Settings.MARKED);
            (e != -1) ? f = f.substr(0, e) + this.GetProgressString(2, c) + f.substr(e + 8) : true;
            e = f.indexOf(this.Settings.CHARSET);
            (e != -1) ? f = f.substr(0, e) + "UTF8" : true;
            e = f.indexOf(this.Settings.TIME);
            (e != -1) ? f = f.substr(0, e) + CrossWord.TimerObject.Start + f.substr(e + 6) : true;
            e = f.indexOf(this.Settings.KEYWORD);
            if (e != -1) {
                var d = "";
                var a = 0;
                $.each(Clues.KeyWordCells, function (h, i) {
                    a++;
                    d += $(this).find("p:eq(0) span:eq(0)").html()
                });
                f = f.substr(0, e) + d + f.substr(e + a)
            }
            return f
        }, Save: function () {
            this.ShowProcessedURL(this.SaveUrl, this.SubmitFrame, true, false)
        }, Submit: function () {
            if (this.HasNoPlaceHolder(this.SubmitURL)) {
                this.SubmitURL += this.GetSubmit(false)
            }
            this.ShowProcessedURL(this.SubmitURL, this.SubmitFrame, true, "POST" == this.SubmitType)
        }, GetSubmit: function (a) {
            return this.GetProgressString((this.FriendlySubmit) ? 1 : 0, a)
        }, GetProgressString: function (b, a) {
            this.TypeGame = CrossWord.TypeGame;
            if (isWordSearch) {
                return this.GetWordSearchProgressString(b, a)
            } else {
                if (b != 0 && !this.TypeGame != "sudoku") {
                    return this.GetFriendlyProgressString(b == 2, a)
                } else {
                    return this.GetNonFriendlyProgressString()
                }
            }
        }, GetNonFriendlyProgressString: function () {
            var b = "";
            this.Cells = Grid.Cells;
            for (var d = 0; d <= Grid.Height; d++) {
                for (var c = 0; c <= Grid.Width; c++) {
                    var a = "";
                    var e = this.Cells[c][d];
                    if (e != null && e != "" && (e.data("data")["type"] == null || e.data("data")["type"] == "letter")) {
                        a = (e.data("ObjectLetter").html() != null && e.data("ObjectLetter").html() != "") ? e.data("ObjectLetter").html() : "-";
                        a = (e.data("SolveStatus") == "*") ? "*" + a : a;
                        a = (a.split("").length > 1) ? "|" + a + "|" : a
                    }
                    b += a
                }
            }
            return b
        }, GetFriendlyProgressString: function (b, d) {
            this.Words = Clues.Words;
            this.Cells = Grid.Cells;
            var c = "";
            var a = "";
            var e = this;
            $.each(Clues.Words, function (g, h) {
                var f = "1";
                c += " ";
                $.each(h.Squares, function (i, j) {
                    var l = j.split("-");
                    var k = e.Cells[l[0]][l[1]].data("ObjectLetter").html();
                    if (k != "") {
                        c += e.MayEncode(k, d)
                    } else {
                        c += "-"
                    }
                    if (k != e.Cells[l[0]][l[1]].data("data")["solution"]) {
                        f = "0"
                    }
                });
                a += f
            });
            return b ? a + c : c.substring(1)
        }, HasNoPlaceHolder: function (a) {
            return a == null || ((a.indexOf(this.Settings.SUBMIT) == -1) && (a.indexOf(this.Settings.PROGRESS) == -1) && (a.indexOf(this.Settings.MARKED) == -1) && (a.indexOf(this.Settings.TIME == -1) && (a.indexOf(this.Setting.TIME) == -1)))
        }, SetUrl: function () {
            this.XML = CrossWord.XML;
            var e = $(this.XML).find("applet-settings").find("actions").find("submit");
            this.SubmitURL = (e.attr("target-url")) ? e.attr("target-url") : null;
            this.SubmitFrame = (e.attr("target-frame")) ? e.attr("target-frame") : null;
            this.SubmitType = (e.attr("target-type")) ? e.attr("target-type") : null;
            this.SubmitURL = (CrossWord.Params.hasOwnProperty("SUBMIT")) ? CrossWord.Params.SUBMIT : this.SubmitURL;
            this.SubmitFrame = (CrossWord.Params.hasOwnProperty("SUBMITFRAME")) ? CrossWord.Params.SUBMITFRAME : this.SubmitFrame;
            this.SubmitType = (CrossWord.Params.hasOwnProperty("SUBMITMETHOD")) ? CrossWord.Params.SUBMITMETHOD : this.SubmitType;
            var c = $(this.XML).find("applet-settings").find("actions").find("save");
            this.SaveUrl = (c.attr("target-url")) ? c.attr("target-url") : null;
            this.SaveUrl = (CrossWord.Params.hasOwnProperty("SAVE")) ? CrossWord.Params.SAVE : this.SaveUrl;
            var b = $(this.XML).find("applet-settings").find("completion");
            this.FriendlySubmit = (b && b.attr("friendly-submit") == "true") ? 1 : 0;
            this.FriendlySubmit = (CrossWord.Params.hasOwnProperty("FRIENDLYSUBMIT")) ? parseInt(CrossWord.Params.FRIENDLYSUBMIT) : this.FriendlySubmit;
            var a = ($(this.XML).find("applet-settings")) ? $(this.XML).find("applet-settings") : null;
            var d = (a != null && a.find("picture")) ? a.find("picture") : null;
            if (d != null) {
                this.Picture = d.text();
                this.PictureURL = (d.attr("target-url")) ? d.attr("target-url") : null;
                this.PictureFrame = (d.attr("target-frame")) ? d.attr("target-frame") : null;
                this.PictureType = (d.attr("target-type")) ? d.attr("target-type") : "GET"
            }
            this.Picture = (CrossWord.Params.hasOwnProperty("COMPLETIONPICTURE")) ? CrossWord.Params.COMPLETIONPICTURE : this.Picture;
            this.PictureURL = (CrossWord.Params.hasOwnProperty("COMPLETIONPICTUREURL")) ? CrossWord.Params.COMPLETIONPICTUREURL : this.PictureURL;
            this.PictureFrame = (CrossWord.Params.hasOwnProperty("COMPLETIONPICTUREURLFRAME")) ? CrossWord.Params.COMPLETIONPICTUREURLFRAME : this.PictureFrame;
            a = a.find("completion");
            this.LinkURL = (a != null && a.attr("target-url")) ? a.attr("target-url") : null;
            this.LinkFrame = (a != null && a.attr("target-frame")) ? a.attr("target-frame") : "_blank";
            this.LinkType = (a != null && a.attr("target-type")) ? a.attr("target-type") : "GET";
            this.Message = (a != null) ? a.text() : "Congratulations";
            this.LinkURL = (CrossWord.Params.hasOwnProperty("FINISHEDURL")) ? CrossWord.Params.FINISHEDURL : this.LinkURL;
            this.LinkFrame = (CrossWord.Params.hasOwnProperty("FINISHEDURLFRAME")) ? CrossWord.Params.FINISHEDURLFRAME : this.LinkFrame;
            this.OnlyIfCorrect = (a != null && a.attr("only-if-correct")) ? (a.attr("only-if-correct") == "false") ? false : true : false;
            this.OnlyIfCorrect = (CrossWord.Params.hasOwnProperty("COMPLETECORRECT")) ? CrossWord.Params.COMPLETECORRECT : this.OnlyIfCorrect;
            this.ShowSolution = (a != null && a.attr("show-solution")) ? (a.attr("show-solution") == "false") ? false : true : false;
            this.ShowSolution = (CrossWord.Params.hasOwnProperty("SHOWSOL")) ? CrossWord.Params.SHOWSOL : this.OnlyIfCorrect
        }, GridWord: function (e) {
            var d = e.x.split("-");
            var g = e.y.split("-");
            var f = [];
            var c = (d.length == 1) ? "X" : "Y";
            if (c == "X") {
                g[0] = parseInt(g[0]);
                g[1] = parseInt(g[1]);
                var a = (g[0] > g[1]) ? g[1] : g[0];
                var h = (g[0] > g[1]) ? g[0] : g[1];
                for (var b = a; b <= h; b++) {
                    f.push(d[0] + "-" + b)
                }
            }
            if (c == "Y") {
                d[0] = parseInt(d[0]);
                d[1] = parseInt(d[1]);
                var a = (d[0] > d[1]) ? d[1] : d[0];
                var h = (d[0] > d[1]) ? d[0] : d[1];
                for (var b = a; b <= h; b++) {
                    f.push(b + "-" + g[0])
                }
            }
            return f
        }, Congratulations: function (b, a) {
            if (this.HasShown) {
                return false
            }
            if (this.OnlyIfCorrect) {
                if (b + a != Grid.Goal) {
                    return false
                }
            } else {
                if (Grid.Goal != Grid.TotalGoal) {
                    return false
                }
            }
            this.HasShown = true;
            if (CrossWord.TimerDiv != "") {
                CrossWord.TimerDiv.stopTime();
                CrossWord.TimerObject.Stop = true;
                CrossWord.TimerObject.Stopping = true
            }
            if (this.PictureURL != null) {
                window.open(this.PictureURL, "WindowC")
            } else {
                if (this.LinkURL != null) {
                    this.ShowProcessedURL(this.LinkURL, this.LinkFrame, true, false)
                } else {
                    this.ShowCompletionMessage()
                }
            }
        }, ShowCompletionMessage: function () {
            this.Message = (this.Message != null && this.Message != "") ? this.Message : "Congratulations!";
            var c = $("<div/>").css({ color: "darkred", border: "solid 5px #c00", "text-align": "center", "font-weight": "bolder", "font-size": parseInt(Grid.Size * 0.55) + "px" }).html(this.Message);
            Iframe.fillRect(0, (CrossWord.Attributes.height) / 2, parseInt((CrossWord.Attributes.width)), 100, { color: "green" });
            Iframe.find("div:last").css({ "z-index": 4 }).append(c);
            var e = c.height();
            var a = c.width();
            Iframe.find("div:last").parent().remove();
            Iframe.fillRect(0, (CrossWord.Attributes.height) / 2, a + 10, e + 10, { color: "white" });
            var b = Iframe.find("div:last"), d = b.get(0);
            if (!d) {
                return
            }
            b.append(c);
            setTimeout(function () {
                Iframe.bind("click", function () {
                    d.parentNode.removeChild(d);
                    Iframe.unbind("click", arguments.callee)
                })
            }, 100)
        }, GetWordSearchProgressString: function (d, c) {
            var b = "";
            var a = "";
            $.each(Clues.WordsWordSearch, function (f, h) {
                if ((h.Object != null) && h.Reves == null) {
                    a += (h.Real != null) ? "1" : "0";
                    b += "+";
                    var g = f.split("/");
                    var e = g[0].split("-");
                    var i = g[1].split("-");
                    if (d != 0) {
                        b += This.MayEncode(h.solution, c)
                    }
                    b += "(" + (parseInt(e[0]) - 1) + "," + (parseInt(i[0]) - 1) + "," + (parseInt(e[1]) - 1) + "," + (parseInt(i[1]) - 1) + ")"
                }
            });
            if (b.length > 0) {
                return d == 2 ? a + b : b.substr(1)
            } else {
                return ""
            }
        }, MayEncode: function (a, b) {
            if (b) {
                return this.URLencode(a)
            } else {
                return a
            }
        }, URLencode: function (a) {
            return a
        }
    }
});
$(function () {
    GridHelper = {
        CodedHint: [], FontSize: 0, IdWord: 0, CodedLetter: {}, Progress: [], Scroll: false, DivScroll: "", Cheatting: 0, Solution: false, Revert: false, TotalGoal: 0, Goal: 0, UserGoal: 0, CheatedGoal: 0, SudokuWidth: 3, SudokuHeight: 3, Cheated: false, Shift: false, MultiLetter: false, LetterUsed: [], LetterUsedCell: {}, Pencil: false, RectangularPuzzle: "rectangular-puzzle", Alphabet: "", InicioX: 0, InicioY: 0, Input: $("<input/>"), Name: "grid", GameType: "", GridLook: "grid-look", XML: {}, Canvas: {}, CanvasX: 0, CanvasY: 0, CanvasSquare: [], Cells: [], CellsLetter: [], Cell: {}, CellSelected: "", CellsSelected: [], Width: 0, Height: 0, Size: 0, X: 200, Y: 200, FontColor: "black", FontStyle: "", FontWeight: "bolder", GameAttributes: {}, DomForSolution: $("<p/>").css({ width: "100%", "text-align": "center", "font-family": "sans-serif", "font-weight": "normal", position: "absolute", "margin-top": "0px", "margin-bottom": "0px" }).append($("<span/>")), Settings: { "numbered-sides": { top: 0, left: 0 }, "italian-style": false, "bars-in-collocations": "?", "thick-border": false, "numbering-schema": "normal", "cell-size-in-pixels": 21, "grid-line-color": "black", "grid-background-color": "white", "block-color": "black", "font-color": "black", "pencil-color": "blue", "number-color": "black", "clue-background-color": "white", "clue-square-divider-width": 1, "revealed-color": false }, ArrowSettings: { stem: 0.1, "head-width": 0.1, "head-length": 0.1, "bend-start": 0.2, "bend-end": 0.1, "bend-side-offset": 0.1 }, FixBackSpace: function () {
            $(document).keydown(function (e) {
                if (e.which == 8) {
                    Grid.DrawLetter("", 8, event);
                    return false
                }
            })
        }, Start: function (xml, divGame, canvas, gameType, gameAttributes, xstart, ystart) {
            this.DivGame = divGame;
            this.InicioX = xstart;
            this.InicioY = ystart;
            this.GameAttributes = gameAttributes;
            this.Canvas = canvas;
            this.XML = xml;
            this.GameType = gameType;
            this.SetAttributes();
            this.Size = parseInt(this.Settings["cell-size-in-pixels"]);
            this.FontSize = parseInt(this.Size * 0.65);
            this.IsTouchable();
            this.SetDimensions();
            this.SetNumberedSides();
            this.SetArrowSettings();
            this.DrawCells();
            this.SetEventsAction();
            CrossWord.RepaintHeightClues();
            if (!isWordSearch) {
                this.InputReference()
            }
            if (!isWordSearch) {
                return false
            }
            this.SetCanvasWordSearch();
            this.SetCanvasEvent();
            return false
        }, QueueTouch: null, IsTouch: false, IsTouchable: function () {
            try {
                document.createEvent("TouchEvent");
                this.IsTouch = true
            } catch (e) {
                this.IsTouch = false
            }
            return false
        }, SetLetter: function (letter) {
            if (this.GameType == "sudoku") {
                this.ClearSelected();
                this.CellsSelected = new Array(this.CellSelected)
            } else {
                this.LookForSides()
            }
            this.DrawCapitalLetter(letter, true)
        }, SetEventForCell: function (item) {
            var This = this;
            $(item).bind("click", function (e) {
                var $this = $(this);
                try {
                    if (!(This.MultiLetter == true && This.CellSelected.get(0) == this && This.IsTouch)) {
                        This.MultiLetter = false
                    }
                } catch (e) {
                    This.MultiLetter = false
                }
                if (This.CellSelected != "" && This.MultiLetter != true) {
                    if (This.CellSelected.data("data")["x"] == $this.data("data")["x"] && This.CellSelected.data("data")["y"] == $this.data("data")["y"]) {
                        This.IsHorizontal = !This.IsHorizontal
                    }
                }
                This.CellSelected = $this;
                if (This.GameType == "sudoku") {
                    This.ClearSelected();
                    This.CellsSelected = new Array(This.CellSelected);
                    This.HighlightME();
                    This.Input.focus()
                } else {
                    This.LookForSides();
                    This.HighlightME();
                    This.Input.focus()
                }
                return false
            });
            if (this.IsTouch) {
                function cancelMultiletter() {
                    clearTimeout(This.QueueTouch);
                    This.QueueTouch = null
                }
                $(item).bind("touchstart", function (e) {
                    if (e.originalEvent.touches.length == 1 && This.CellSelected.get(0) == this) {
                        This.QueueTouch = window.setTimeout(function () {
                            alert("Multiletter On");
                            This.MultiLetter = true
                        }, 1000)
                    }
                }).bind("touchend", cancelMultiletter).bind("touchmove", cancelMultiletter)
            }
            return false
        }, CanvasBackground: null, DrawBackground: function () {
            var Color = (CrossWord.Params.hasOwnProperty("GRIDBACKCOLOR")) ? CrossWord.Params.GRIDBACKCOLOR : "transparent";
            var Background = Iframe.fillRect(this.InicioX, this.InicioY, this.Width * this.Size + 1, this.Height * this.Size + 1, { color: Color });
            var id = RandomString();
            Background.attr({ id: id });
            this.CanvasBackground = Raphael(id, this.Width * this.Size, this.Height * this.Size);
            return false
        }, FirstTime: function () {
            this.IsHorizontal = this.CellsLetter[0] == this.CellSelected ? false : true;
            this.CellsLetter[0].click();
            return false
        }, Override: function () {
            (CrossWord.Params.hasOwnProperty("GRIDBACKCOLOR")) ? this.Settings["grid-background-color"] = CrossWord.Params.GRIDBACKCOLOR : true;
            (CrossWord.Params.hasOwnProperty("GRIDCOLOR")) ? this.Settings["grid-line-color"] = CrossWord.Params.GRIDCOLOR : true;
            (CrossWord.Params.hasOwnProperty("BLOCKCOLOR")) ? this.Settings["block-color"] = CrossWord.Params.BLOCKCOLOR : true;
            (CrossWord.Params.hasOwnProperty("FONTCOLOR")) ? this.Settings["font-color"] = CrossWord.Params.FONTCOLOR : true;
            (CrossWord.Params.hasOwnProperty("NUMCOLOR")) ? this.Settings["number-color"] = CrossWord.Params.NUMCOLOR : true;
            (CrossWord.Params.hasOwnProperty("REVEALEDCOLOR")) ? this.Settings["revealed-color"] = CrossWord.Params.REVEALEDCOLOR : true;
            if (CrossWord.Params.hasOwnProperty("PROGRESS")) {
                if (!isWordSearch) {
                    var Pro = CrossWord.Params.PROGRESS.split("");
                    var isPencil = false;
                    var Temporal = "";
                    for (var i = 0; i < Pro.length; i++) {
                        if (Pro[i] != "|" && !isPencil) {
                            this.Progress.push({ solution: Pro[i], Pencil: false })
                        } else {
                            isPencil = true
                        }
                        if (isPencil) {
                            if (Pro[i] != "|" && Pro[i] != "*") {
                                Temporal += Pro[i]
                            }
                        }
                        if (Pro[i] == "|" && Temporal != "") {
                            this.Progress.push({ solution: Temporal, Pencil: true });
                            Temporal = "";
                            isPencil = false
                        }
                    }
                } else {
                    this.Progress = CrossWord.Params.PROGRESS.split(/\).?\(/g);
                    for (var i = 0; i < this.Progress.length; ++i) {
                        this.Progress[i] = this.Progress[i].replace(/[\(\)]/g, "")
                    }
                }
            }
            return false
        }, SetDimensions: function () {
            var Grid = this.XML.find(this.GameType).find(this.Name);
            this.Width = parseInt(Grid.attr("width"));
            this.Height = parseInt(Grid.attr("height"));
            for (var i = 0; i <= this.Width; i++) {
                var X = [];
                for (var j = 0; j <= this.Height; j++) {
                    X.push("")
                }
                this.Cells.push(X)
            }
            return false
        }, SetAttributes: function () {
            var Attributes = this.XML.find(this.GameType).find(this.GridLook);
            var This = this;
            $.each(this.Settings, function (index, item) {
                if (index != "numbered-sides" && Attributes.attr(index) != null) {
                    This.Settings[index] = Attributes.attr(index)
                }
            });
            if (this.GameType == "sudoku") {
                this.SudokuHeight = parseInt(this.XML.find(this.RectangularPuzzle).find(this.GameType).attr("box-height"));
                this.SudokuWidth = parseInt(this.XML.find(this.RectangularPuzzle).find(this.GameType).attr("box-width"))
            }
            this.Size = parseInt(this.Settings["cell-size-in-pixels"]);
            if (this.Settings["thick-border"] == "true") {
                this.InicioX += 2;
                this.InicioY++
            }
            this.Override();
            this.FontColor = this.Settings["font-color"];
            return false
        }, SetArrowSettings: function () {
            var XML = this.XML.find(this.GameType).find("arrows");
            var This = this;
            if (XML.length == 0) {
                return false
            }
            $.each(this.ArrowSettings, function (index, item) {
                if (XML.attr(index)) {
                    This.ArrowSettings[index] = parseFloat(item)
                }
            });
            return false
        }, HasTop: false, SetNumberedSides: function () {
            var This = this;
            var XML = this.XML.find(this.GameType).find("numbered-sides");
            if (XML.length > 0) {
                if (XML.attr("top") != null) {
                    this.HasTop = true;
                    this.Settings["numbered-sides"]["top"] = XML.attr("top").split(",");
                    $.each(this.Settings["numbered-sides"]["top"], function (index, item) {
                        if (index >= This.Width) {
                            return false
                        }
                        Iframe.fillRect(This.InicioX + ((index + 1) * This.Size), This.InicioY, This.Size, This.Size, { color: "transparent" });
                        Iframe.find("div:last").append($("<p/>").css({ width: This.Size + "px", fontFamily: "sans-serif", marginTop: "9px", "text-align": "center", fontSize: parseInt(This.Size * 0.5) + "px" }).html(item))
                    });
                    this.InicioY += parseInt(this.Settings["cell-size-in-pixels"])
                }
                if (XML.attr("left") != null) {
                    this.Settings["numbered-sides"]["left"] = XML.attr("left").split(",");
                    $.each(this.Settings["numbered-sides"]["left"], function (index, item) {
                        if (index >= This.Height) {
                            return false
                        }
                        Iframe.fillRect(This.InicioX, This.InicioY + ((index) * This.Size), This.Size, This.Size, { color: "transparent" });
                        Iframe.find("div:last").append($("<span/>").css({ "float": "right", marginTop: parseInt(This.Size * 0.25) + "px", marginRight: "4px", fontFamily: "sans-serif", fontSize: parseInt(This.Size * 0.5) + "px" }).html(item))
                    });
                    this.InicioX += parseInt(this.Settings["cell-size-in-pixels"])
                }
            }
            return false
        }, DrawCells: function () {
            var This = this;
            var scrollw = This.GameAttributes["scroll-width"];
            var scrollh = This.GameAttributes["scroll-height"];
            if (scrollw != "" || scrollh != "") {
                var TemporalIframe = Iframe;
                var TemporalInicioX = This.InicioX;
                var TemporalInicioY = This.InicioY;
                This.Scroll = true;
                Iframe = $("<div/>").css({ overflow: "auto", "float": "left", display: "inline-block", position: "relative", backgroundColor: "gray", borderLeft: "solid 1px transparent", borderTop: "solid 1px transparent" }).appendTo(Iframe);
                if (scrollw != "") {
                    Iframe.css({ width: parseInt(scrollw) + "px" })
                }
                if (scrollh != "") {
                    Iframe.css({ height: parseInt(scrollh) + "px" })
                }
                This.InicioX = 0;
                This.InicioY = 0
            }
            this.DrawBackground();
            var MyCells = this.XML.find(this.GameType).find(this.Name).find("cell");
            var Objects = {};
            $.each(MyCells, function (index, item) {
                This.Cells[parseInt($(this).attr("x"))][parseInt($(this).attr("y"))] = "Letter";
                Objects[parseInt($(this).attr("x")) + "-" + parseInt($(this).attr("y"))] = $(item)
            });
            for (var i = 1; i <= this.Width; i++) {
                for (var j = 1; j <= this.Height; j++) {
                    if (Objects[i + "-" + j] != null) {
                        Cell.Start(this.Canvas, Objects[i + "-" + j], this.Settings, this.GameType, this.ArrowSettings);
                        if (Cell.IsLetter) {
                            this.Cells[Cell.x][Cell.y] = Cell.Cell;
                            this.CellsLetter.push(Cell.Cell);
                            this.SetEventForCell(Cell.Cell)
                        } else {
                            this.Cells[Cell.x][Cell.y] = null
                        }
                    }
                }
            }
            if (scrollw != "" || scrollh != "") {
                This.DivScroll = Iframe;
                Iframe = TemporalIframe;
                This.InicioX = TemporalInicioX;
                This.InicioY = TemporalInicioY
            }
            return false
        }, ClueAction: function (Selected) {
            var SelectedOne = Selected[0].split("-");
            if (Selected.length > 1) {
                var Second = Selected[1].split("-");
                var tmpIH = this.IsHorizontal;
                if (SelectedOne[0] == Second[0]) {
                    this.IsHorizontal = false
                } else {
                    if (SelectedOne[1] == Second[1]) {
                        this.IsHorizontal = true
                    }
                }
                if (this.CellSelected.data("data")["x"] == SelectedOne[0] && this.CellSelected.data("data")["y"] == SelectedOne[1]) {
                    this.IsHorizontal = tmpIH != this.IsHorizontal ? tmpIH : this.IsHorizontal
                }
                this.Cells[parseInt(SelectedOne[0])][parseInt(SelectedOne[1])].click()
            }
            return false
        }, WordIdSelected: 0, throwError: function (err) {
            if (console && console.error) {
                console.error(err)
            }
            throw err
        }, HighlightMECell: undefined, HighlightME: function () {
            if (!this.CellSelected) {
                this.throwError(new Error("CellSelected is Undefined"))
            }
            var cellS = this.CellSelected;
            var This = this;
            cellS.css("background-color", this.GameAttributes["cursor-color"]).find("img").hide();
            if (this.GameType == "sudoku") {
                this.ClearSelected();
                this.CellsSelected = [];
                this.CellsSelected.push(cellS);
                cellS.css("background-color", this.GameAttributes["cursor-color"])
            }
            if (!this.HighlightMECell) {
                setTimeout(function () {
                    var a = This.HighlightMECell;
                    This.HighlightMECell = undefined;
                    This.HighlightMEFT(a)
                }, 50)
            }
            this.HighlightMECell = cellS
        }, HighlightMEFT: function (cellS) {
            var This = this;
            cellS = cellS || this.CellSelected;
            if (!CrossWord.TimerObject.Stopping) {
                CrossWord.RunTimer(false)
            } else {
                CrossWord.TimerObject.Stopping = false
            }
            Clues.ResetLi();
            var offset = cellS.offset();
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(navigator.userAgent);
            var _ieVers = parseFloat(RegExp.$1);
            if (_ieVers) {
                this.Input.offset({ top: offset.top + ((Grid.Size / 2) * 0.8), left: offset.left }).focus().css({ opacity: 0, zIndex: -100 })
            } else {
                if (CrossWord.Params.VIEWPORT == true) {
                    this.Input.offset({ top: offset.top }).focus()
                } else {
                    this.Input.offset({ top: offset.top, left: offset.left }).focus()
                }
            }
            if (this.GameType == "sudoku") {
                return false
            }
            if (cellS.data("LIS") == null) {
                return false
            }
            $.each(This.CellSelected.data("LIS"), function (index, item) {
                $.each(item, function (index, item) {
                    var $this = $(this);
                    if (!$this.data("coordinates")) {
                        return false
                    }
                    if (!$this.hasClass("ClueCell")) {
                        Clues.SetReference($this)
                    }
                    if (!$this.data("data")["IsLink"] && $this.data("coordinates") == This.Coordinates) {
                        if ($this.hasClass("ClueCell")) {
                            Clues.ResetLi();
                            Clues.SetReference($this)
                        }
                        Clues.SetLiClicked($this)
                    }
                    var offset = $this.offset();
                    var $parent = $this.parent();
                    var fli_offset = $parent.find("li").eq(0).offset();
                    var Alto = offset.top - fli_offset.top;
                    var Bol1 = (Alto + $this.height() + 5 > $parent.scrollTop() + $parent.height() || $parent.scrollTop() > Alto + $this.height() + 5);
                    var Bol2 = (Alto > $parent.scrollTop() + $parent.height() || $parent.scrollTop() > Alto);
                    if (Bol1 || Bol2) {
                        $parent.scrollTop(Alto)
                    }
                })
            });
            if (CrossWord.Attributes["scroll-height"] != "" || CrossWord.Attributes["scroll-width"]) {
                var scell_parent = cellS.parent();
                var scell_parent_offset = cellS.parent().offset();
                var Parent = { top: scell_parent_offset.top, left: scell_parent_offset.left, ScrollLeft: scell_parent.scrollLeft(), ScrollTop: scell_parent.scrollTop(), width: scell_parent.width() - 20, height: scell_parent.height() - 20 };
                var Son = { top: offset.top - Parent.top, left: offset.left - Parent.left, width: cellS.width(), height: cellS.height() };
                var toff = this.CellsSelected[this.CellsTotal].offset();
                if (toff.left + Son.width > Parent.width - 5) {
                    scell_parent.scrollLeft(Parent.ScrollLeft + Son.left)
                } else {
                    if (Son.left < 0) {
                        scell_parent.scrollLeft(Son.left + Parent.ScrollLeft)
                    }
                }
                if (toff.top + Son.height > Parent.height - 5) {
                    scell_parent.scrollTop(Parent.ScrollTop + Son.top)
                } else {
                    if (Son.top < 0) {
                        scell_parent.scrollTop(Son.top + Parent.ScrollTop)
                    }
                }
            }
            return false
        }, ClearSelected: function () {
            $.each(this.CellsSelected, function (index, item) {
                if (item.data("Correct") == true || !item.data("Use").img) {
                    item.find("img").show()
                }
                item.css("background-color", item.data("background-color"))
            });
            return false
        }, HighLightSides: function () {
            var This = this;
            $.each(this.CellsSelected, function (index, item) {
                item.css("background-color", This.GameAttributes["selected-cells-color"])
            });
            return false
        }, IsHorizontal: true, Coordinates: [], CoordinatesX: [], CoordinatesY: [], CellsIndex: 0, CellsTotal: 0, CellImages: [], LookForSides: function () {
            this.ClearSelected();
            this.Coordinates = [];
            this.CoordinatesX = [];
            this.CoordinatesY = [];
            this.CellsSelected = !this.IsHorizontal ? $.merge(this.GetVecino("UP"), this.GetVecino("BELOW")) : $.merge(this.GetVecino("LEFT"), this.GetVecino("RIGHT"));
            if (this.CellsSelected.length == 1) {
                if (this.CellSelected.data("Unique") == null || this.CellSelected.data("Unique") == "") {
                    this.CellSelected.data("Unique", "YES");
                    this.IsHorizontal = !this.IsHorizontal;
                    this.LookForSides()
                }
            }
            this.Coordinates = (this.CoordinatesX.length > 1 && this.CoordinatesX[0] == this.CoordinatesX[1]) ? this.CoordinatesX[0] + "," + this.CoordinatesY[0] + "-" + this.CoordinatesY[this.CoordinatesY.length - 1] : this.CoordinatesX[0] + "-" + this.CoordinatesX[this.CoordinatesX.length - 1] + "," + this.CoordinatesY[0];
            this.CellSelected.data("Unique", "");
            this.LookForLinked();
            this.LookForParentAndBrother();
            this.CellsTotal = this.CellsSelected.length - 1;
            this.HighLightSides();
            return false
        }, GetVecino: function (Case) {
            var Cases = { UP: "Y-->0", BELOW: "Y++<this.Height", LEFT: "X-->0", RIGHT: "++X<=this.Width" };
            var This = this;
            var Data = this.CellSelected.data("data");
            var X = Data.x;
            var Y = Data.y;
            var Cells = [];
            var Words = (this.CellSelected.data("WordId")) ? this.CellSelected.data("WordId") : [];
            var Keep = true;
            var Cell = "";
            var MatchWords = [];
            while (eval(Cases[Case]) && Keep) {
                Cell = this.Cells[X][Y];
                Keep = false;
                if (Cell != null && Cell != "") {
                    MatchWords = Cell.data("WordId");
                    if (MatchWords != null) {
                        $.each(Words, function (index, item) {
                            if (!Keep) {
                                if ($.inArray(item, MatchWords) >= 0) {
                                    Keep = true;
                                    Cells.push(Cell);
                                    This.WordIdSelected = item;
                                    This.CoordinatesX.push(X);
                                    This.CoordinatesY.push(Y)
                                }
                            }
                        })
                    }
                }
            }
            if (Case == "UP" || Case == "LEFT") {
                this.CellsIndex = Cells.length;
                Cells = Cells.reverse();
                Cells.push(this.CellSelected);
                this.CoordinatesX.reverse();
                this.CoordinatesX.push(Data.x);
                this.CoordinatesY.reverse();
                this.CoordinatesY.push(Data.y)
            }
            return Cells
        }, LookForLinked: function () {
            if (this.CellSelected.data("WordItem") != null && this.CellSelected.data("ImLink") == null) {
                var This = this;
                var Coords = this.Coordinates.split(",");
                var Father = CellContains({ x: Coords[0], y: Coords[1] });
                $.each(Clues.Words[This.WordIdSelected]["cells"], function (index, item) {
                    var Coordinates = CellContains({ x: $(item).attr("x"), y: $(item).attr("y") });
                    $.each(Coordinates, function (index, item) {
                        var Cords = item.split("-");
                        if ($.inArray(Cords[0] + "-" + Cords[1], Father) < 0) {
                            Father.push(Cords[0] + "-" + Cords[1]);
                            This.CellsSelected.push(This.Cells[Cords[0]][Cords[1]])
                        }
                    })
                })
            }
            return false
        }, GridSetCellSelected: function (x, y) {
            this.CellSelected = this.Cells[x][y];
            this.LookForSides();
            this.HighlightME();
            this.Input.focus();
            return false
        }, LookForParentAndBrother: function () {
            var This = this;
            var Searched = false;
            if (this.CellSelected.data("ImLink")) {
                var Begin = [];
                var Coords = this.Coordinates.split(",");
                var SelectedCells = CellContains({ x: Coords[0], y: Coords[1] });
                $.each(Clues.Words[this.WordIdSelected]["Squares"], function (index, item) {
                    if ($.inArray(item, SelectedCells) < 0) {
                        var Cords = item.split("-");
                        Begin.push(This.Cells[Cords[0]][Cords[1]])
                    }
                });
                $.each(this.CellSelected.data("WordId"), function (index, Palabra) {
                    var Word = Clues.Words[Palabra]["cells"];
                    $.each(Word, function (index, item) {
                        var Range = $(this).attr("x") + "," + $(this).attr("y");
                        if (This.Coordinates == Range) {
                            This.WordIdSelected = Clues.Words[Palabra]["id"];
                            var SelectedCells = CellContains({ x: Word.attr("x"), y: Word.attr("y") });
                            var Begin = [];
                            var Last = [];
                            var Reset = false;
                            $.each(Clues.Words[Palabra]["Squares"], function (index, item) {
                                var Cords = item.split("-");
                                if ($.inArray(item, SelectedCells) < 0) {
                                    Begin.push(This.Cells[Cords[0]][Cords[1]]);
                                    This.CellsIndex++
                                }
                            });
                            $.each(Clues.Words[Palabra]["cells"], function (index, item) {
                                var Range = $(this).attr("x") + "," + $(this).attr("y");
                                if (This.Coordinates == Range) {
                                    Reset = true
                                } else {
                                    var Cells = CellContains({ x: $(this).attr("x"), y: $(this).attr("y") });
                                    if (!Reset) {
                                        $.each(Cells, function (index, item) {
                                            var Cord = item.split("-");
                                            Begin.push(This.Cells[Cord[0]][Cord[1]]);
                                            This.CellsIndex++
                                        })
                                    } else {
                                        $.each(Cells, function (index, item) {
                                            var Cord = item.split("-");
                                            Last.push(This.Cells[Cord[0]][Cord[1]])
                                        })
                                    }
                                }
                            });
                            This.CellsSelected = $.merge(Begin, This.CellsSelected);
                            This.CellsSelected = (Last.length > 0) ? $.merge(This.CellsSelected, Last) : This.CellsSelected;
                            Searched = true
                        }
                    })
                })
            }
            if (This.GameType != "sudoku" && This.CellsSelected[1] != null) {
                var First = This.CellsSelected[0].data("WordId");
                var Second = This.CellsSelected[1].data("WordId");
                $.each(First, function (index, item) {
                    ($.inArray(item, Second) > -1) ? This.WordIdSelected = item : true
                });
                if (!Searched && (This.CellsSelected[1].data("ImLink") || This.CellsSelected[0].data("ImLink"))) {
                    var Word = Clues.Words[This.WordIdSelected]["cells"].eq(0);
                    $.each(Word, function (index, item) {
                        var SelectedCells = CellContains({ x: Word.attr("x"), y: Word.attr("y") });
                        var Begin = [];
                        $.each(Clues.Words[This.WordIdSelected]["Squares"], function (index, item) {
                            var Cords = item.split("-");
                            if ($.inArray(item, SelectedCells) < 0) {
                                This.Cells[Cords[0]][Cords[1]].css({ backgroundColor: This.GameAttributes["selected-cells-color"] });
                                Begin.push(This.Cells[Cords[0]][Cords[1]]);
                                This.CellsIndex++
                            }
                        });
                        This.CellSelected.css({ backgroundColor: This.GameAttributes["cursor-color"] });
                        This.CellsSelected = $.merge(Begin, This.CellsSelected)
                    })
                }
            }
            return false
        }, KeysDown: [37, 38, 39, 40, 46, 45, 8], InputReference: function () {
            if (this.IsTouch) {
                this.KeysDown.push(8)
            }
            if (this.GameType == "word-search") {
                return false
            }
            var This = this;
            this.Input.keypress(function (e) {
                if (e.which == 0 || e.which == 8) {
                    return true
                }
                This.DrawLetter(String.fromCharCode(e.which), e.which, e)
            }).keydown(function (e) {
                if ($.inArray(e.which, This.KeysDown) > -1) {
                    This.DrawLetter(String.fromCharCode(e.which), e.which, e)
                }
            }).css({ position: "absolute", "z-index": "-10000", overflow: "hidden", background: "none", display: "block", "font-size": "1px", border: "none", "box-shadow": "none", "-moz-box-shadow": "none", "-webkit-box-shadow": "none", color: "transparent", opacity: "0", width: "1px", height: "1px" }).appendTo(Iframe);
            if (navigator.userAgent.indexOf("Android") >= 0) {
                this.Input.css({ width: "0px", height: "0px" })
            }
            if (this.IsTouch) {
                this.Input.css({ top: Iframe.offset().top + "px", left: ((CrossWord.Attributes.width) / 2) + "px" })
            }
            return false
        }, DrawLetter: function (Letter, Codigo, e) {
            var This = this;
            if ($.inArray(Codigo, [37, 38, 39, 40]) > -1) {
                this.MoveTo(Codigo, e.shiftKey);
                return false
            }
            switch (Codigo) {
                case 13:
                    this.MultiLetter = false;
                    var Index = Iframe.find("li").index(Iframe.find("li.Selected").eq(0));
                    if (e.shiftKey) {
                        Index = (Index == 0) ? Iframe.find("li").length - 1 : Index - 1
                    } else {
                        Index = (Index + 1 < (Iframe.find("li").length)) ? Index + 1 : 0
                    }
                    Iframe.find("li").eq(Index).click();
                    break;
                case 46:
                    this.DrawCapitalLetter("", true);
                    break;
                case 32:
                    this.DrawCapitalLetter("", false);
                    break;
                case 27:
                    this.DrawCapitalLetter("", false);
                    break;
                case 45:
                    if (this.GameType != "sudoku") {
                        if (this.GameType == "coded" && !this.Pencil) {
                            return false
                        }
                        this.MultiLetter = !this.MultiLetter
                    }
                    break;
                case 8:
                    var Solution = this.CellSelected.data("ObjectLetter").html();
                    Solution = Solution.split("");
                    this.Backspace = true;
                    Solution = ((Solution.length > 1) ? Solution.slice(0, Solution.length - 1) : [""]).join("");
                    this.DrawCapitalLetter(Solution, true);
                    this.Backspace = false;
                    break;
                default:
                    this.DrawCapitalLetter(Letter, false)
            }
            This.Input.focus();
            this.HighlightME()
        }, Backspace: false, ValideSudokuInput: function (Number) {
            return true;
            if (this.Pencil) {
                return true
            }
            var X = parseInt(this.CellSelected.data("data")["x"]);
            var Y = parseInt(this.CellSelected.data("data")["y"]);
            var XX = X;
            var YY = Y;
            for (var i = 1; i <= this.Width; i++) {
                if (i != Y && this.Cells[X][i].data("ObjectLetter").html() == Number && this.Cells[X][i].data("SolveStatus") != "*") {
                    return false
                }
            }
            for (var i = 1; i <= this.Height; i++) {
                if (i != X && this.Cells[i][Y].data("ObjectLetter").html() == Number && this.Cells[i][Y].data("SolveStatus") != "*") {
                    return false
                }
            }
            X = (X <= this.SudokuWidth) ? 1 : X - ((X % this.SudokuWidth == 0) ? this.SudokuWidth : X % this.SudokuWidth) + 1;
            Y = (Y <= this.SudokuHeight) ? 1 : Y - ((Y % this.SudokuHeight == 0) ? this.SudokuHeight : Y % this.SudokuHeight) + 1;
            for (var i = X; i < X + this.SudokuWidth; i++) {
                for (var j = Y; j < Y + this.SudokuHeight; j++) {
                    if (i != XX && j != YY && this.Cells[i][j].data("ObjectLetter").html() == Number && this.Cells[i][j].data("SolveStatus") != "*") {
                        return false
                    }
                }
            }
            return true
        }, ValidateCoded: function (Letter, Cell) {
            var Index = $.inArray(Letter, this.LetterUsed);
            if (Index >= 0 && Letter != "") {
                if (this.CellSelected.data("ObjectLetter").html() != "") {
                    if (!this.Background && !this.MultiLetter && !this.Solution) {
                        this.CellSelected.css("background-color", this.GameAttributes["selected-cells-color"]);
                        if (CrossWord.Attributes["type-skip-existing"] != false) {
                            var TemporalIndex = this.CellsIndex++;
                            if (this.CellsIndex > this.CellsTotal) {
                                this.CellsIndex = 0
                            }
                            while (this.CellsSelected[this.CellsIndex].data("ObjectLetter").html() != "" && TemporalIndex != this.CellsIndex) {
                                this.CellsIndex++;
                                if (this.CellsIndex > this.CellsTotal) {
                                    this.CellsIndex = 0
                                }
                            }
                            this.CellSelected = this.CellsSelected[this.CellsIndex]
                        } else {
                            if (this.CellsIndex < this.CellsTotal) {
                                this.CellsIndex++
                            }
                            this.CellSelected = this.CellsSelected[this.CellsIndex]
                        }
                    }
                }
                return false
            } else {
                if (this.CellSelected.data("ObjectLetter").html() != "") {
                    var scell_letter = this.CellSelected.data("ObjectLetter").html();
                    this.LetterUsed[$.inArray(scell_letter, this.LetterUsed)] = "";
                    this.LetterUsedCell[scell_letter] = undefined;
                    this.LetterUsed = $.grep(this.LetterUsed, function (item) {
                        return item != ""
                    })
                }
                this.LetterUsed.push(Letter);
                this.LetterUsedCell[Letter] = Cell;
                this.RepaintAlphabet()
            }
            return true
        }, RepaintAlphabet: function () {
            var This = this;
            $.each(CrossWord.LetterAlphabet, function (index, item) {
                ($.inArray($(this).html(), This.LetterUsed) >= 0) ? $(this).fadeTo("fast", 0.5) : $(this).fadeTo("fast", 1)
            })
        }, MoveTo: function (Arrow, shift) {
            var data = this.CellSelected.data("data");
            var Y = parseInt(data.y);
            var X = parseInt(data.x);
            var ix = X, iy = Y;
            var Search = true;
            if (isCoded) {
                shift = false
            }
            var Cases = { "40": "++Y>this.Height", "38": "--Y==0", "39": "++X>this.Width", "37": "--X==0" };
            var TemporalChange = this.IsHorizontal == true;
            if (!shift) {
                this.IsHorizontal = (Arrow == 40 || Arrow == 38) ? false : true
            } else {
                if ((Arrow == 40 && this.IsHorizontal) || ((Arrow == 37 || Arrow == 39) && !this.IsHorizontal) || (this.IsHorizontal && Arrow == 38 && this.CellsIndex != 0)) {
                    Search = false
                }
            }
            var Cond = true;
            while (Search) {
                if (eval(Cases[Arrow])) {
                    Search = false;
                    Cond = true
                }
                if (Search && this.Cells[X][Y] != null && this.Cells[X][Y] != "") {
                    if (this.CellSelected.data("ObjectLetter").html() != "") {
                        this.Cells[X][Y].click()
                    } else {
                        if (TemporalChange != this.IsHorizontal) {
                            this.IsHorizontal = !this.IsHorizontal;
                            this.Cells[ix][iy].click()
                        } else {
                            this.Cells[X][Y].click()
                        }
                    }
                    Search = false;
                    Cond = false
                }
            }
            if (shift && Cond) {
                var Selected = Iframe.find("li.Selected");
                if (Selected.length == 1) {
                    var Li = null;
                    if ((Arrow == 40)) {
                        Li = Iframe.find("li").eq(Selected.data("index") + 1);
                        if (Li.length == 0) {
                            Li = Iframe.find("li:first")
                        }
                        Li.click();
                        return false
                    } else {
                        if (Arrow == 39) {
                            Li = Iframe.find("li").eq(Selected.data("index") + 1);
                            if (Li.length == 0) {
                                Li = Iframe.find("li:first")
                            }
                            Li.click();
                            return false
                        } else {
                            if (Arrow == 38) {
                                Li = Iframe.find("li").eq(Selected.data("index") - 1);
                                if (Li.length == 0) {
                                    Li = Iframe.find("li:last")
                                }
                                Li.click();
                                return false
                            } else {
                                if (Arrow == 37) {
                                    Li = Iframe.find("li").eq(Selected.data("index") - 1);
                                    if (Li.length == 0) {
                                        Li = Iframe.find("li:last")
                                    }
                                    Li.click();
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        }, CheckKeyWord: function (Letter) {
            var KeyWord = Clues.KeyWordID[this.CellSelected.data("data")["x"] + this.CellSelected.data("data")["y"]];
            if (KeyWord) {
                $(KeyWord).find("p span").html(Letter);
                $(KeyWord).textfill($(KeyWord).find("p:eq(0)").data("fontSize"))
            }
        }, HighLightClues: function (WordId) {
            if (WordId != null) {
                var This = this;
                $.each(WordId, function (index, item) {
                    var Cells = Clues.Words[item]["Squares"];
                    $.each(Clues.Words[item]["cells"], function (index, item) {
                        Cells = $.merge(CellContains({ x: $(this).attr("x"), y: $(this).attr("y") }), Cells)
                    });
                    var Completed = true;
                    $.each(Cells, function (index, item) {
                        var Cord = item.split("-");
                        if (This.Cells[Cord[0]][Cord[1]].data("ObjectLetter").html() == "") {
                            Completed = false
                        }
                    });
                    (Completed) ? $("li#LI" + item).addClass("Completed") : $("li#LI" + item).removeClass("Completed")
                })
            }
        }, LoadProgress: function () {
            if (isWordSearch) {
                for (var i = 0; i < this.Progress.length; i++) {
                    var Coords = this.Progress[i];
                    Coords = Coords.split(",");
                    if (Coords[0] != "") {
                        this.DrawBaseShapeWordSearch(parseInt(Coords[0]), parseInt(Coords[1]));
                        this.DrawEndLoop2(parseInt(Coords[2]), parseInt(Coords[3]));
                        this.DrawFinishLoop();
                        Coords.shift()
                    }
                }
                return false
            }
            for (var i = 1; i <= Grid.Height; i++) {
                for (var j = 1; j <= Grid.Width; j++) {
                    if (this.Cells[j][i] != null && this.Cells[j][i] != "") {
                        if (this.Progress[0] != null && this.Progress[0].solution != "-") {
                            if (this.Progress[0].Pencil) {
                                this.Pencil = true;
                                this.FontStyle = "italic";
                                this.FontWeight = "";
                                this.FontColor = this.Settings["pencil-color"]
                            }
                            this.CellSelected = this.Cells[j][i];
                            this.SetLetter(this.Progress[0].solution);
                            this.Progress.shift();
                            this.Pencil = false;
                            this.FontStyle = "";
                            this.FontWeight = "bolder";
                            this.FontColor = this.Settings["font-color"]
                        } else {
                            if (this.Progress[0] != null && this.Progress[0].solution == "-") {
                                this.Progress.shift()
                            }
                        }
                    }
                }
            }
            return false
        }, MarginTop: 0, SetEventsAction: function () {
            var This = this;
            var Game = CrossWord;
            var Action = {};
            $.each(Game.DivActions.find(">div"), function (index, item) {
                Action[$(item).data("id")] = $(item)
            });
            if (Action.hasOwnProperty("reveal-letter")) {
                Action["reveal-letter"].click(function () {
                    if (!This.StillReveal($(this))) {
                        return false
                    }
                    This.RevealLetters(new Array(This.CellSelected));
                    return false
                })
            }
            if (Action.hasOwnProperty("solution")) {
                Action.solution.click(function () {
                    Clues.Div.find("li").addClass("Completed").find("p").css({ color: Clues.Attributes["completed-color"] });
                    if (isWordSearch) {
                        $.each(This.TemporalShapes, function (index, item) {
                            item.Object.remove()
                        });
                        This.TemporalShapes = {};
                        $.each(Clues.WordsWordSearch, function (index, item) {
                            if (item.Object != null) {
                                item.Object.remove();
                                item.Object = null
                            }
                            if (item.Real == null) {
                                var Cord = index.split("/");
                                var X = Cord[0].split("-");
                                var Y = Cord[1].split("-");
                                This.DrawBaseShapeWordSearch(X[0] - 1, Y[0] - 1);
                                This.SecondSquare = { x: X[1] - 1, y: Y[1] - 1 };
                                This.DrawWordSearch({ x: X[1] - 1, y: Y[1] - 1 });
                                This.LastAngle = 0;
                                item.Object = This.TemporalLine;
                                This.TemporalLine = null
                            }
                        });
                        return false
                    }
                    This.Solution = true;
                    var Data = null;
                    for (var i = 0; i < This.CellsLetter.length; i++) {
                        Data = This.CellsLetter[i].data("Use");
                        if (Data.hint) {
                            continue
                        }
                        This.CellsLetter[i].data("ObjectLetter").css({ color: This.Settings["font-color"], fontWeight: "bolder", fontStyle: "" }).html(Data.solution);
                        if (Data.img) {
                            This.CellsLetter[i].find("img").show()
                        }
                        This.CellsLetter[i].data("Correct", true);
                        if (This.CellsLetter[i].data("Protector")) {
                            This.CellsLetter[i].data("Protector").css({ opacity: 0 })
                        }
                        if (Data.alone) {
                            This.CellsLetter[i].data("ObjectLetter").css({ fontSize: This.FontSize + "px", marginTop: This.MarginTop });
                            This.CellsLetter[i].data("ObjectLetter").parent().css({ marginTop: "5px" })
                        } else {
                            This.CellsLetter[i].textfill(This.FontSize)
                        }
                    }
                    This.Solution = false;
                    This.Input.focus()
                })
            }
            if (Action.hasOwnProperty("reveal-word")) {
                Action["reveal-word"].click(function () {
                    if (!This.StillReveal($(this))) {
                        return false
                    }
                    This.RevealLetters(This.CellsSelected);
                    return false
                })
            }
            if (Action.hasOwnProperty("revert")) {
                Action.revert.click(function () {
                    Clues.Div.find("li").removeClass("Completed").find("p").css({ color: Clues.Attributes.color });
                    if (isWordSearch) {
                        $.each(Clues.WordsWordSearch, function (index, item) {
                            if (item.Object != null) {
                                if (!item.Object._raph_removed) {
                                    item.Object.remove();
                                    item.Object._raph_removed = true
                                }
                                item.Object = null;
                                item.Input = null
                            }
                            if (item.Real != null) {
                                delete Clues.WordsWordSearch[index]
                            }
                        })
                    } else {
                        var sCell = This.CellSelected;
                        $.each(This.CellsLetter, function (index, item) {
                            var Data = $(this).data("Use");
                            if (Data.hint != true) {
                                $(this).find("img").hide();
                                if ($(this).data("ObjectLetter").html()) {
                                    This.CellSelected = $(this);
                                    This.SetLetter("");
                                    if ($(this).data("Protector")) {
                                        $(this).data("Protector").css({ opacity: 0 })
                                    }
                                }
                            }
                        });
                        if (sCell) {
                            this.CellSelected = "";
                            sCell.click()
                        }
                        This.Input.focus()
                    }
                    This.UserGoal = 0;
                    This.CheatedGoal = 0;
                    This.TotalGoal = 0
                })
            }
            if (Action.hasOwnProperty("check")) {
                Action.check.click(function () {
                    if (isWordSearch) {
                        $.each(Clues.WordsWordSearch, function (index, item) {
                            if (item.Real == false) {
                                if (!item.Object._raph_removed) {
                                    item.Object.remove();
                                    item.Object._raph_removed = true
                                }
                                delete Clues.WordsWordSearch[index]
                            }
                        })
                    }
                    This.Input.focus();
                    if (isWordSearch) {
                        return false
                    }
                    $.each(This.CellsLetter, function (index, item) {
                        $this = $(this);
                        var text = $this.data("ObjectLetter").html();
                        if (text != "" && $this.data("Use")["solution"] != text) {
                            if (!$this.data("Protector")) {
                                Cell.DrawProtect($this)
                            }
                            if ($this.data("Protector")) {
                                $this.data("Protector").fadeTo("fast", 1)
                            }
                        }
                    })
                })
            }
            if (Action.hasOwnProperty("pencil")) {
                ((Action.pencil.find("input").length > 0) ? Action.pencil.find("input") : Action.pencil).click(function () {
                    This.Input.focus();
                    if (isWordSearch) {
                        return false
                    }
                    if (!This.Pencil) {
                        This.FontStyle = "italic";
                        This.FontWeight = "";
                        This.FontColor = This.Settings["pencil-color"];
                        $(this).css({ border: "solid 1px black", height: "33px" })
                    } else {
                        This.FontStyle = "";
                        This.FontWeight = "bolder";
                        This.FontColor = This.Settings["font-color"];
                        $(this).css({ border: "solid 1px transparent" })
                    }
                    This.Pencil = !This.Pencil
                })
            }
            (Action.hasOwnProperty("submit")) ? Action.submit.click(function () {
                Completition.Submit()
            }) : true;
            (Action.hasOwnProperty("save")) ? Action.save.click(function () {
                Completition.Save()
            }) : true
        }, RevealWordSearch: function () {
            if (Clues.WordsWordSearch[Clues.Words[this.IdWord]["WordSearch"]]["Object"] != null) {
                return false
            }
            Clues.Div.find("li#LI" + this.IdWord).addClass("Completed");
            Clues.ResetLi();
            var This = this;
            var Cord = Clues.Words[This.IdWord]["WordSearch"].split("/");
            var X = Cord[0].split("-");
            var Y = Cord[1].split("-");
            This.DrawBaseShapeWordSearch(X[0] - 1, Y[0] - 1);
            This.SecondSquare = { x: X[1] - 1, y: Y[1] - 1 };
            This.DrawWordSearch({ x: X[1] - 1, y: Y[1] - 1 });
            This.LastAngle = 0;
            if (Clues.WordsWordSearch[Clues.Words[This.IdWord]["WordSearch"]]["Object"] != null) {
                Clues.WordsWordSearch[Clues.Words[This.IdWord]["WordSearch"]]["Object"].remove()
            }
            Clues.WordsWordSearch[Clues.Words[This.IdWord]["WordSearch"]]["Object"] = This.TemporalLine;
            Clues.WordsWordSearch[Clues.Words[This.IdWord]["WordSearch"]]["Input"] = false;
            This.TemporalLine = null
        }, DrawBaseShapeWordSearch: function (X, Y) {
            this.FirstSquare = { x: X, y: Y };
            this.TemporalLine = this.Canvas.rect(X * this.Size + 3, Y * this.Size + 3, this.Size - 6, this.Size - 5, 8);
            this.TemporalLine.attr({ "stroke-width": 2, stroke: this.FontColor });
            this.CenterX = X * this.Size + (this.Size / 2);
            this.CenterY = Y * this.Size + (this.Size / 2);
            this.TemporalLine.toBack();
            return false
        }, LoadingCoded: false, ProcessHintLetter: function () {
            if (isCoded) {
                this.LoadingCoded = true;
                for (var i = 0; i < this.CodedHint.length; i++) {
                    this.CellSelected = this.Cells[parseInt(this.CodedHint[i]["x"])][parseInt(this.CodedHint[i]["y"])];
                    this.DrawCapitalLetter(this.CodedHint[i]["solution"], false)
                }
                this.LoadingCoded = false
            }
            return false
        }, RevealLetters: function (Cells) {
            var This = this;
            This.FontColor = (This.Settings["revealed-color"] != false) ? This.Settings["revealed-color"] : This.Settings["font-color"];
            This.FontStyle = "";
            This.FontWeight = "bolder";
            var IsPencil = This.Pencil;
            This.Pencil = false;
            This.Cheated = true;
            if (isWordSearch && This.IdWord != 0) {
                This.RevealWordSearch();
                return false
            } else {
                var Data = null;
                var Ids = [];
                var sCell = this.CellSelected;
                for (var i = 0; i < Cells.length; i++) {
                    Data = Cells[i].data("Use");
                    var letter = Data.solution;
                    ObjectLetter = Cells[i].data("ObjectLetter");
                    Cells[i].data("Correct", true);
                    if (Cells[i].data("Protector")) {
                        Cells[i].data("Protector").css({ opacity: 0 })
                    }
                    if (Data.img) {
                        Cells[i].find("img").show()
                    }
                    if (this.GameType == "coded" && this.LetterUsedCell[letter]) {
                        this.CellSelected = this.LetterUsedCell[letter];
                        this.SetLetter("")
                    }
                    this.CellSelected = Cells[i];
                    this.SetLetter(letter);
                    Ids = $.merge(Ids, This.CellsSelected[i].data("WordId"))
                }
                if (sCell) {
                    this.CellSelected = "";
                    sCell.click()
                }
                Ids = $.unique(Ids);
                This.HighLightClues(Ids);
                if (!This.IsTouch) {
                    This.Input.focus()
                }
            }
            This.Cheated = false;
            if (IsPencil) {
                This.FontStyle = "italic";
                This.FontWeight = "";
                This.FontColor = This.Settings["pencil-color"];
                This.Pencil = true
            }
        }, StillReveal: function (Element) {
            if (!isNaN(MaxCheat) && MaxCheat != -1 && this.Cheatting < MaxCheat) {
                this.Cheatting++;
                return true
            } else {
                if (MaxCheat != -1) {
                    Element.fadeTo("fast", 0.5);
                    if (Action.hasOwnProperty("reveal-word")) {
                        Action["reveal-word"].fadeTo("fast", 0.5)
                    }
                    return false
                }
            }
            return true
        }
    }
});
$(function () {
    Grid = {
        IdCanvas: "", CanvasSquare: [], TemporalShapes: {}, FirstSquare: null, SecondSqure: null, LastAngle: 0, d: 0, CenterX: 0, CenterY: 0, TemporalLine: null, IsForDragQueue: null, IsForDrag: false, DrawEndLoop2: function (c, b) {
            var a = { x: parseInt(c), y: parseInt(b) };
            if (this.SecondSquare != null && a.x == this.SecondSquare.x && a.y == this.SecondSquare.y) {
                return false
            }
            if (a == null) {
                return false
            }
            this.SecondSquare = a;
            if (!this.DrawWordSearch(a)) {
                return false
            }
            this.TemporalLine.attr({ opacity: 0 });
            return false
        }, DrawEndLoop: function (c, b) {
            c -= this.IdCanvas.offset().left;
            b -= this.IdCanvas.offset().top;
            if (c < 0 || b < 0 || c > this.Width * this.Size || b > this.Height * this.Size) {
                return false
            }
            var a = { x: parseInt(c / this.Size), y: parseInt(b / this.Size) };
            if (this.SecondSquare != null && a.x == this.SecondSquare.x && a.y == this.SecondSquare.y) {
                return false
            }
            if (a == null) {
                return false
            }
            this.SecondSquare = a;
            if (!this.DrawWordSearch(a)) {
                return false
            }
            this.TemporalLine.attr({ opacity: 0 });
            return false
        }, DrawFinishLoop: function () {
            var d = this;
            d.LastAngle = 0;
            if (d.TemporalLine.attr("opacity") == 0 || d.SecondSquare == null || (d.FirstSquare.x == d.SecondSquare.x && d.FirstSquare.y == d.SecondSquare.y)) {
                d.TemporalLine.remove();
                d.SecondSquare = null;
                return false
            }
            var c = null;
            var a = (d.FirstSquare.x + 1) + "-" + (d.SecondSquare.x + 1) + "/" + (d.FirstSquare.y + 1) + "-" + (d.SecondSquare.y + 1);
            var b = (d.SecondSquare.x + 1) + "-" + (d.FirstSquare.x + 1) + "/" + (d.SecondSquare.y + 1) + "-" + (d.FirstSquare.y + 1);
            if (Clues.WordsWordSearch.hasOwnProperty(a)) {
                c = Clues.WordsWordSearch[a]
            } else {
                if (Clues.WordsWordSearch.hasOwnProperty(b)) {
                    c = Clues.WordsWordSearch[b]
                }
            }
            if (c != null && c.id != null) {
                if (c.Object == null) {
                    c.Object = d.TemporalLine;
                    if (c.Input == false) {
                        d.CheatedGoal--
                    }
                    d.UserGoal++;
                    d.TotalGoal++;
                    c.Input = true;
                    Iframe.find("li#LI" + c.id).addClass("Completed")
                } else {
                    c.Object.remove();
                    if (c.Input == false) {
                        d.CheatedGoal--
                    } else {
                        d.UserGoal--
                    }
                    d.TotalGoal--;
                    c.Input = null;
                    Iframe.find("li#LI" + c.id).removeClass("Completed");
                    d.TemporalLine.remove();
                    c.Object = null
                }
                Completition.Congratulations(d.UserGoal, d.CheatedGoal);
                Clues.ResetLi()
            } else {
                if (Clues.WordsWordSearch.hasOwnProperty(a)) {
                    Clues.WordsWordSearch[a]["Object"].remove();
                    d.TemporalLine.remove();
                    delete Clues.WordsWordSearch[a];
                    delete Clues.WordsWordSearch[b]
                } else {
                    if (Clues.WordsWordSearch.hasOwnProperty(b)) {
                        Clues.WordsWordSearch[b]["Object"].remove();
                        d.TemporalLine.remove();
                        delete Clues.WordsWordSearch[a];
                        delete Clues.WordsWordSearch[b]
                    } else {
                        Clues.WordsWordSearch[a] = { Object: d.TemporalLine, Real: false };
                        Clues.WordsWordSearch[b] = { Object: d.TemporalLine, Real: false, Reves: true }
                    }
                }
            }
            d.SecondSquare = null;
            return false
        }, PointerAnimation: false, SetCanvasWordSearch: function () {
            Iframe.fillRect(this.InicioX, this.InicioY, this.Size * this.Width, this.Size * this.Height, { color: "transparent" });
            var b = RandomString();
            Iframe.find("div:last").attr({ id: b });
            this.IdCanvas = $("#" + b);
            this.Canvas = Raphael(b, this.Width * this.Size, this.Height * this.Size);
            this.CanvasSquare.push(this.Canvas.rect(0, 0, this.Size * this.Width, this.Size * this.Height).attr({ opacity: 0, fill: "red" }));
            if (!this.IsTouch) {
                return false
            }
            var c = this;
            var a = Iframe.fillRect(this.InicioX, this.InicioY, this.Size * this.Width, this.Size * this.Height, { alpha: 0, color: "yellow" });
            a.bind("click", function (d) {
                d.preventDefault()
            }).bind("touchstart", function (f) {
                var d = f;
                if (d.originalEvent.touches.length == 1) {
                    c.IsForDragQueue = window.setTimeout(function (i) {
                        c.IsForDrag = true;
                        var h = parseInt((d.originalEvent.touches[0].pageX - c.IdCanvas.offset().left) / c.Size);
                        var g = parseInt((d.originalEvent.touches[0].pageY - c.IdCanvas.offset().top) / c.Size);
                        c.PointerAnimation = c.Canvas.circle((d.originalEvent.touches[0].pageX - c.IdCanvas.offset().left), (d.originalEvent.touches[0].pageY - c.IdCanvas.offset().top), c.Size * 1.5);
                        c.PointerAnimation.attr({ fill: "red", opacity: 0.5 });
                        c.DrawBaseShapeWordSearch(h, g)
                    }, 1000)
                }
            }).bind("touchmove", function (d) {
                clearTimeout(c.IsForDragQueue);
                if (c.IsForDrag) {
                    d.preventDefault();
                    c.DrawEndLoop(d.originalEvent.touches[0].pageX, d.originalEvent.touches[0].pageY)
                }
            }).bind("touchend", function () {
                clearTimeout(c.IsForDragQueue);
                if (c.IsForDrag) {
                    c.PointerAnimation.remove();
                    c.IsForDrag = false;
                    c.DrawFinishLoop()
                }
            });
            return false
        }, CustomRotation: function (a) {
            this.TemporalLine.attr({ opacity: 1 });
            if (this.LastAngle != a) {
                if (this.LastAngle != 0) {
                    this.TemporalLine.rotate(-this.LastAngle, this.CenterX, this.CenterY)
                }
                this.TemporalLine.rotate(a, this.CenterX, this.CenterY);
                this.LastAngle = a
            }
            return false
        }, SetCanvasEvent: function () {
            var a = this;
            this.d = parseInt(Math.sqrt(this.Size * this.Size + this.Size * this.Size));
            $.each(this.CanvasSquare, function (b, c) {
                c.drag(function (e, d, g, f) {
                    a.DrawEndLoop(g, f)
                }, function (e, d) {
                    CrossWord.RunTimer(false);
                    a.DrawBaseShapeWordSearch(parseInt((e - a.IdCanvas.offset().left) / a.Size), parseInt((d - a.IdCanvas.offset().top) / a.Size))
                }, function (e, d) {
                    a.DrawFinishLoop()
                })
            });
            return false
        }, DrawWordSearch: function (a) {
            var c = this;
            if (c.FirstSquare.x == a.x) {
                c.TemporalLine.attr({ height: Math.abs(a.y - c.FirstSquare.y) * c.Size + c.Size - 5 });
                (c.FirstSquare.y > a.y) ? c.CustomRotation(180) : c.CustomRotation(0);
                return fals
            } else {
                if (c.FirstSquare.y == a.y) {
                    c.TemporalLine.attr({ height: Math.abs(a.x - c.FirstSquare.x) * c.Size + c.Size - 5 });
                    (c.FirstSquare.x > a.x) ? c.CustomRotation(90) : c.CustomRotation(270);
                    return false
                } else {
                    var b = Math.abs(a.x - c.FirstSquare.x);
                    c.TemporalLine.attr({ height: c.d * (b + 1) - 10 });
                    if (a.x > c.FirstSquare.x) {
                        if (c.FirstSquare.y == a.y + (a.x - c.FirstSquare.x)) {
                            c.CustomRotation(225);
                            return false
                        } else {
                            if (c.FirstSquare.y == a.y - (a.x - c.FirstSquare.x)) {
                                c.CustomRotation(315);
                                return false
                            }
                        }
                    } else {
                        if (c.FirstSquare.y == a.y + (a.x - c.FirstSquare.x)) {
                            c.CustomRotation(45);
                            return false
                        } else {
                            if (c.FirstSquare.y == a.y - (a.x - c.FirstSquare.x)) {
                                c.CustomRotation(135);
                                return false
                            }
                        }
                    }
                }
            }
            return true
        }, DrawCapitalLetter: function (d, l) {
            d = d.toUpperCase();
            if ((CrossWord.Attributes["enforce-alphabet"] || this.GameType == "sudoku" || this.GameType == "coded")) {
                if ($.inArray(d, CrossWord.Alphabet) < 0 && d != "") {
                    return false
                }
                if (this.GameType == "sudoku" && d != "") {
                    if (!this.ValideSudokuInput(d)) {
                        return false
                    }
                }
                if (this.GameType == "coded" && !this.Pencil) {
                    if (!this.ValidateCoded(d, this.CellSelected)) {
                        return false
                    }
                }
            }
            var g = this.CellSelected.data("Use");
            var c = -1;
            if (!g.hint || this.LoadingCoded) {
                if (this.CellSelected.data("Protector")) {
                    this.CellSelected.data("Protector").fadeTo("fast", 0)
                }
                if (d == g.solution || d.toLowerCase() == g.solution) {
                    d = g.solution
                }
                var b = {};
                if (CrossWord.Attributes["wrong-letter-color"] != false && !this.Cheated && !this.Pencil) {
                    var i = (d != g.solution) ? CrossWord.Attributes["wrong-letter-color"] : this.FontColor;
                    b = { color: i, "font-style": this.FontStyle, "font-weight": this.FontWeight }
                } else {
                    b = { color: this.FontColor, "font-style": this.FontStyle, "font-weight": this.FontWeight }
                }
                var h = this.CellSelected.data("ObjectLetter");
                var k = h.html();
                if (this.MultiLetter) {
                    var j = d;
                    d = (this.Backspace) ? d : k + d
                }
                if (k == "" && d != "") {
                    this.TotalGoal++
                } else {
                    if (k != "" && d == "") {
                        this.TotalGoal--
                    }
                }
                this.CellSelected.data("Correct", false);
                if (d == g.solution) {
                    if (k != g.solution) {
                        this.UserGoal++;
                        this.CellSelected.data("Correct", true)
                    }
                } else {
                    if (k == g.solution) {
                        this.UserGoal--;
                        this.CellSelected.data("Correct", false)
                    }
                }
                if (this.MultiLetter) {
                    d = (this.Backspace) ? d : j
                }
                var f = (this.Pencil && !this.Cheated) ? "*" : (this.Cheated) ? false : true;
                d = (this.MultiLetter && !this.Backspace) ? h.html() + d : d;
                h.css(b).html(d);
                this.CellSelected.textfill(this.FontSize);
                var a = this;
                this.CellSelected.data("SolveStatus", f);
                if (this.GameType == "coded") {
                    $.each(Grid.CodedLetter[g.solution], function (m, n) {
                        n.data("ObjectLetter").css(b).html(d);
                        n.data("SolveStatus", f);
                        if (a.LoadingCoded) {
                            n.data("Use").hint = true
                        }
                        n.textfill(Grid.FontSize)
                    })
                }
                this.CheckKeyWord(d);
                this.HighLightClues(this.CellSelected.data("WordId"))
            }
            if (!this.Background && !this.MultiLetter && c == -1 && !this.Solution && !l) {
                this.CellSelected.css("background-color", this.GameAttributes["selected-cells-color"]);
                if (CrossWord.Attributes["type-skip-existing"] != false) {
                    var e = this.CellsIndex++;
                    if (this.CellsIndex > this.CellsTotal) {
                        this.CellsIndex = 0
                    }
                    while (this.CellsSelected[this.CellsIndex].data("ObjectLetter").html() != "" && e != this.CellsIndex) {
                        this.CellsIndex++;
                        if (this.CellsIndex > this.CellsTotal) {
                            this.CellsIndex = 0
                        }
                    }
                    this.CellSelected = this.CellsSelected[this.CellsIndex]
                } else {
                    if (this.CellsIndex < this.CellsTotal) {
                        this.CellsIndex++
                    }
                    this.CellSelected = this.CellsSelected[this.CellsIndex]
                }
            }
            if (this.Backspace && !this.MultiLetter) {
                this.CellSelected.css("background-color", this.GameAttributes["selected-cells-color"]);
                this.CellsIndex = ((this.CellsIndex - 1) < 0) ? 0 : this.CellsIndex - 1;
                this.CellSelected = this.CellsSelected[this.CellsIndex]
            }
            Completition.Congratulations(this.UserGoal, this.CheatedGoal);
            return false
        }
    };
    Grid = $.extend(Grid, GridHelper)
});
function CustomScrollBar(c, d, b) {
    var a = "<style type='text/css'>";
    b = RootImages + "scrollbar/";
    a += c + " div{ scrollbar-base-color : " + d + "}";
    a += c + " div::-webkit-scrollbar{ width : 15px; height:16px; background-Color:" + d + "}";
    a += c + " div::-webkit-scrollbar-button:start:decrement," + c + " div::-webkit-scrollbar-button:end:increment{";
    a += "background:" + d + ";background-position:center center;background-repeat:no-repeat;display:block;height:16px;width:17px;";
    a += "}";
    a += c + " div::-webkit-scrollbar-button:horizontal:decrement{ background-image: url(" + b + "HD.png); border:1px solid black  }";
    a += c + " div::-webkit-scrollbar-button:horizontal:increment{ background-image: url(" + b + "HI.png); border:1px solid black  }";
    a += c + " div::-webkit-scrollbar-button:vertical:decrement{ background-image: url(" + b + "VD.png); border:1px solid black }";
    a += c + " div::-webkit-scrollbar-button:vertical:increment{ background-image: url(" + b + "VI.png); border:1px solid black }";
    a += c + " div::-webkit-scrollbar-thumb{background-Color:" + d + "; width:15px ; border:solid 1px black; opacity : 0.5    }";
    a += c + " div::-webkit-scrollbar-corner {background-Color:" + d + "}";
    a += "</style>";
    $(a).appendTo("head");
    return false
}
function firstChildElement(b) {
    var c = b.childNodes;
    for (var a = 0; a < c.length; ++a) {
        if (c[a].nodeType == 1) {
            return c[a]
        }
    }
    return null
}
function CreateMyCustomDiv(d, b, e, c, a, g) {
    var f = document.createElement("div");
    f.setAttribute("style", "cursor:default;height:" + d + "px;width:" + b + "px;background-color:" + e + "; position: absolute; top:" + c + "px; left:" + a + "px; border: solid " + g + " 1px;");
    return f
}
function CreateMyCustomDiv2(d, b, e, c, a) {
    var f = document.createElement("div");
    f.setAttribute("style", "cursor:default;height:" + d + "px;width:" + b + "px;background-color:" + e + "; position: absolute; top:" + c + "px; left:" + a + "px;");
    return f
}
jQuery.fn.center = function (b) {
    var a = { vertical: true, horizontal: true };
    op = jQuery.extend(a, b);
    return this.each(function () {
        var m = jQuery(this);
        var c = m.width();
        var n = m.height();
        var o = parseInt(m.css("padding-top"));
        var d = parseInt(m.css("padding-bottom"));
        var e = parseInt(m.css("border-top-width"));
        var l = parseInt(m.css("border-bottom-width"));
        var h = (e + l) / 2;
        var j = (o + d) / 2;
        var i = m.parent().css("position");
        var g = (c / 2) * (-1);
        var k = ((n / 2) * (-1)) - j - h;
        var f = { position: "absolute" };
        if (op.vertical) {
            f.height = n;
            f.top = "50%";
            f.marginTop = k
        }
        if (op.horizontal) {
            f.width = c;
            f.left = "50%";
            f.marginLeft = g
        }
        if (i == "static") {
            m.parent().css("position", "relative")
        }
        m.css(f)
    })
};
function xmlTag(d) {
    var b = new Array(d.find(">*").length);
    var a = ["b", "i", "sub", "sup", "span"];
    $.each(a, function (e, h) {
        for (var g = 0; g < d.children(h).length; g++) {
            var j = d.find(h).eq(g);
            var k = (j.find(">*").length > 0) ? xmlTag(j) : (j.text()) ? j.text() : "";
            var f = $("<div/>").append($("<" + h + "/>").html(k)).html();
            b[d.find("*").index(j)] = (f != null) ? f : ""
        }
    });
    var c = "";
    $.each(b, function (e, f) {
        c += (f != null) ? f : ""
    });
    return c
}
function FontName(c) {
    var a = c.split("");
    var b = "";
    $.each(a, function (d, e) {
        if (e == e.toUpperCase() && d != 0) {
            b += "-" + e
        } else {
            b += e
        }
    });
    return b.toLowerCase()
}
function CellContains(e) {
    if (e == null) {
        return []
    }
    var d = e.x.split("-");
    var g = e.y.split("-");
    var f = [];
    var c = (d.length == 1) ? "X" : "Y";
    if (c == "X") {
        g[0] = parseInt(g[0]);
        g[1] = parseInt(g[1]);
        var a = (g[0] > g[1]) ? g[1] : g[0];
        var h = (g[0] > g[1]) ? g[0] : g[1];
        for (var b = a; b <= h; b++) {
            f.push(d[0] + "-" + b)
        }
    }
    if (c == "Y") {
        d[0] = parseInt(d[0]);
        d[1] = parseInt(d[1]);
        var a = (d[0] > d[1]) ? d[1] : d[0];
        var h = (d[0] > d[1]) ? d[0] : d[1];
        for (var b = a; b <= h; b++) {
            f.push(b + "-" + g[0])
        }
    }
    return f
}
function RandomString() {
    var d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var e = 8;
    var c = "";
    for (var b = 0; b < e; b++) {
        var a = Math.floor(Math.random() * d.length);
        c += d.substring(a, a + 1)
    }
    return c
}
(function (a) {
    a.fn.textfill = function (b) {
        b = parseInt(b, 10);
        return this.each(function () {
            var i = a("p span", this), e = i.parent(), g = e.height(), f = e.width(), h = parseInt(i.css("fontSize"), 10), j = f / i.width(), d = (h * (j - 0.1));
            var c = (b > 0 && d > b) ? b : d;
            e.css({ "margin-top": (parseInt(b - c + (c * 0.38))) + "px" });
            i.css({ fontSize: c + "px" })
        });
        return false
    }
})(jQuery);
(function (a) {
    a.tiny = a.tiny || {};
    a.tiny.scrollbar = { options: { axis: "y", wheel: 40, scroll: true, size: "auto", sizethumb: "auto" } };
    a.fn.tinyscrollbar = function (c) {
        var c = a.extend({}, a.tiny.scrollbar.options, c);
        this.each(function () {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.tinyscrollbar_update = function (c) {
        return a(this).data("tsb").update(c)
    };
    function b(p, f) {
        var j = this;
        var s = p;
        var i = { obj: a(".viewport", p) };
        var g = { obj: a(".overview", p) };
        var d = { obj: a(".scrollbar", p) };
        var l = { obj: a(".track", d.obj) };
        var o = { obj: a(".thumb", d.obj) };
        var k = f.axis == "x", m = k ? "left" : "top", u = k ? "Width" : "Height";
        var q, x = { start: 0, now: 0 }, n = {};
        function c() {
            j.update();
            r();
            return j
        }
        this.update = function (y) {
            i[f.axis] = i.obj[0]["offset" + u];
            g[f.axis] = g.obj[0]["scroll" + u];
            g.ratio = i[f.axis] / g[f.axis];
            d.obj.toggleClass("disable", g.ratio >= 1);
            l[f.axis] = f.size == "auto" ? i[f.axis] : f.size;
            o[f.axis] = Math.min(l[f.axis], Math.max(0, (f.sizethumb == "auto" ? (l[f.axis] * g.ratio) : f.sizethumb)));
            d.ratio = f.sizethumb == "auto" ? (g[f.axis] / l[f.axis]) : (g[f.axis] - i[f.axis]) / (l[f.axis] - o[f.axis]);
            q = (y == "relative" && g.ratio <= 1) ? Math.min((g[f.axis] - i[f.axis]), Math.max(0, q)) : 0;
            q = (y == "bottom" && g.ratio <= 1) ? (g[f.axis] - i[f.axis]) : isNaN(parseInt(y)) ? q : parseInt(y);
            v()
        };
        function v() {
            o.obj.css(m, q / d.ratio);
            g.obj.css(m, -q);
            n.start = o.obj.offset()[m];
            var y = u.toLowerCase();
            d.obj.css(y, l[f.axis]);
            l.obj.css(y, l[f.axis]);
            o.obj.css(y, o[f.axis])
        }
        function r() {
            o.obj.bind("mousedown", h);
            o.obj[0].ontouchstart = function (y) {
                y.preventDefault();
                o.obj.unbind("mousedown");
                h(y.touches[0]);
                return false
            };
            l.obj.bind("mouseup", t);
            if (f.scroll && this.addEventListener) {
                s[0].addEventListener("DOMMouseScroll", w, false);
                s[0].addEventListener("mousewheel", w, false)
            } else {
                if (f.scroll) {
                    s[0].onmousewheel = w
                }
            }
        }
        function h(z) {
            n.start = k ? z.pageX : z.pageY;
            var y = parseInt(o.obj.css(m));
            x.start = y == "auto" ? 0 : y;
            a(document).bind("mousemove", t);
            document.ontouchmove = function (A) {
                a(document).unbind("mousemove");
                t(A.touches[0])
            };
            a(document).bind("mouseup", e);
            o.obj.bind("mouseup", e);
            o.obj[0].ontouchend = document.ontouchend = function (A) {
                a(document).unbind("mouseup");
                o.obj.unbind("mouseup");
                e(A.touches[0])
            };
            return false
        }
        function w(z) {
            if (!(g.ratio >= 1)) {
                z = a.event.fix(z || window.event);
                var y = z.wheelDelta ? z.wheelDelta / 120 : -z.detail / 3;
                q -= y * f.wheel;
                q = Math.min((g[f.axis] - i[f.axis]), Math.max(0, q));
                o.obj.css(m, q / d.ratio);
                g.obj.css(m, -q);
                z.preventDefault()
            }
        }
        function e(y) {
            a(document).unbind("mousemove", t);
            a(document).unbind("mouseup", e);
            o.obj.unbind("mouseup", e);
            document.ontouchmove = o.obj[0].ontouchend = document.ontouchend = null;
            return false
        }
        function t(y) {
            if (!(g.ratio >= 1)) {
                x.now = Math.min((l[f.axis] - o[f.axis]), Math.max(0, (x.start + ((k ? y.pageX : y.pageY) - n.start))));
                q = x.now * d.ratio;
                g.obj.css(m, -q);
                o.obj.css(m, x.now)
            }
            return false
        }
        return c()
    }
})(jQuery);
(function (e) {
    e.fn.settings = { color: "#000000", stroke: 1, alpha: 1 };
    e.fn.fillRect = function (i, o, j, k, m) {
        var n = h(e(this), m);
        var l = d(n, i, o, j, k);
        return l
    };
    e.fn.drawRect = function (i, n, j, k, l) {
        var m = h(e(this), l);
        m.drawRect(m, i, n, j, k);
        return e(this)
    };
    e.fn.drawPolyline = function (j, n, l) {
        var m = h(e(this), l);
        for (var k = j.length - 1; k;) {
            --k;
            m.drawLine(m, j[k], n[k], j[k + 1], n[k + 1])
        }
        return e(this)
    };
    e.fn.drawPolygon = function (i, l, j) {
        var k = h(e(this), j);
        k.drawPolyline(i, l, j);
        k.drawLine(k, i[i.length - 1], l[i.length - 1], i[0], l[0]);
        return e(this)
    };
    e.fn.drawEllipse = function (i, n, j, k, l) {
        var m = h(e(this), l);
        m._mkOv(m, i, n, j, k);
        return e(this)
    };
    e.fn.fillPolygon = function (p, o, v) {
        var q = h(e(this), v);
        var z;
        var r;
        var m, l;
        var B, k;
        var A, j;
        var t, s;
        var u;
        var x = p.length;
        if (!x) {
            return
        }
        m = o[0];
        l = o[0];
        for (z = 1; z < x; z++) {
            if (o[z] < m) {
                m = o[z]
            }
            if (o[z] > l) {
                l = o[z]
            }
        }
        for (r = m; r <= l; r++) {
            var C = new Array();
            u = 0;
            for (z = 0; z < x; z++) {
                if (!z) {
                    t = x - 1;
                    s = 0
                } else {
                    t = z - 1;
                    s = z
                }
                k = o[t];
                j = o[s];
                if (k < j) {
                    B = p[t];
                    A = p[s]
                } else {
                    if (k > j) {
                        j = o[t];
                        k = o[s];
                        A = p[t];
                        B = p[s]
                    } else {
                        continue
                    }
                }
                if ((r >= k) && (r < j)) {
                    C[u++] = Math.round((r - k) * (A - B) / (j - k) + B)
                } else {
                    if ((r == l) && (r > k) && (r <= j)) {
                        C[u++] = Math.round((r - k) * (A - B) / (j - k) + B)
                    }
                }
            }
            C.sort(function w(i, n) {
                return (i - n)
            });
            for (z = 0; z < u; z += 2) {
                d(q, C[z], r, C[z + 1] - C[z] + 1, 1)
            }
        }
        return e(this)
    };
    function h(j, i) {
        j.opts = e.extend({}, e.fn.settings, i);
        return g(j)
    }
    function g(j) {
        var i = j.opts.stroke;
        if (!(i + 1)) {
            j.drawLine = _mkLinDott;
            j._mkOv = _mkOvDott;
            j.drawRect = _mkRectDott
        } else {
            if (i - 1 > 0) {
                j.drawLine = _mkLin2D;
                j._mkOv = _mkOv2D;
                j.drawRect = b
            } else {
                j.drawLine = a;
                j._mkOv = f;
                j.drawRect = b
            }
        }
        return j
    }
    function a(r, m, w, j, u) {
        if (m > j) {
            var t = j;
            var o = u;
            j = m;
            u = w;
            m = t;
            w = o
        }
        var B = j - m, A = Math.abs(u - w), v = m, s = w, z = (w > u) ? -1 : 1;
        if (B >= A) {
            var i = A << 1, q = i - (B << 1), l = i - B, n = v;
            while (B > 0) {
                --B;
                ++v;
                if (l > 0) {
                    d(r, n, s, v - n, 1);
                    s += z;
                    l += q;
                    n = v
                } else {
                    l += i
                }
            }
            d(r, n, s, j - n + 1, 1)
        } else {
            var i = B << 1, q = i - (A << 1), l = i - A, k = s;
            if (u <= w) {
                while (A > 0) {
                    --A;
                    if (l > 0) {
                        d(r, v++, s, 1, k - s + 1);
                        s += z;
                        l += q;
                        k = s
                    } else {
                        s += z;
                        l += i
                    }
                }
                d(r, j, u, 1, k - u + 1)
            } else {
                while (A > 0) {
                    --A;
                    s += z;
                    if (l > 0) {
                        d(r, v++, k, 1, s - k);
                        l += q;
                        k = s
                    } else {
                        l += i
                    }
                }
                d(r, j, k, 1, u - k + 1)
            }
        }
    }
    function f(p, m, z, D, B) {
        var H = (++D) >> 1, G = (++B) >> 1, u = D & 1, l = B & 1, k = m + H, j = z + G, r = 0, q = G, o = 0, n = G, C = (H * H) << 1, A = C << 1, v = (G * G) << 1, t = v << 1, E = (C >> 1) * (1 - (G << 1)) + v, i = (v >> 1) - C * ((G << 1) - 1), s, F;
        while (q > 0) {
            if (E < 0) {
                E += v * ((r << 1) + 3);
                i += t * (++r)
            } else {
                if (i < 0) {
                    E += v * ((r << 1) + 3) - A * (q - 1);
                    i += t * (++r) - C * (((q--) << 1) - 3);
                    s = r - o;
                    F = n - q;
                    if ((s & 2) && (F & 2)) {
                        c(p, k, j, r - 2, q + 2, 1, 1, u, l);
                        c(p, k, j, r - 1, q + 1, 1, 1, u, l)
                    } else {
                        c(p, k, j, r - 1, n, s, F, u, l)
                    }
                    o = r;
                    n = q
                } else {
                    i -= C * ((q << 1) - 3);
                    E -= A * (--q)
                }
            }
        }
        s = H - o + 1;
        F = (n << 1) + l;
        q = j - n;
        d(p, k - H, q, s, F);
        d(p, k + o + u - 1, q, s, F)
    }
    function c(p, k, j, r, q, s, l, u, o) {
        var m = k - r, i = k + r + u - s, t = j - q, n = j + q + o - l;
        if (i > m + s) {
            d(p, i, t, s, l);
            d(p, i, n, s, l)
        } else {
            s = i - m + s
        }
        d(p, m, t, s, l);
        d(p, m, n, s, l)
    }
    function b(n, i, m, j, l) {
        var k = n.opts.stroke;
        d(n, i, m, j, k);
        d(n, i + j, m, k, l);
        d(n, i, m + l, j + k, k);
        d(n, i, m + k, k, l - k)
    }
    function d(o, j, n, k, m) {
        var l = [];
        l[l.length] = '<div style="position:absolute;';
        l[l.length] = "left:" + j + "px;";
        l[l.length] = "top:" + n + "px;";
        l[l.length] = "width:" + k + "px;";
        l[l.length] = "height:" + m + "px;";
        l[l.length] = "clip:rect(0," + k + "px," + m + "px,0);";
        l[l.length] = "padding:0px;margin:0px;";
        l[l.length] = "background-color:" + o.opts.color + ";";
        l[l.length] = "overflow:hidden;";
        l[l.length] = '"></div>';
        var i = e(l.join(""));
        i.css("opacity", o.opts.alpha);
        o.append(i);
        return i
    }
})(jQuery);
jQuery.fn.extend({
    everyTime: function (b, c, d, e, a) {
        return this.each(function () {
            jQuery.timer.add(this, b, c, d, e, a)
        })
    }, oneTime: function (a, b, c) {
        return this.each(function () {
            jQuery.timer.add(this, a, b, c, 1)
        })
    }, stopTime: function (a, b) {
        return this.each(function () {
            jQuery.timer.remove(this, a, b)
        })
    }
});
jQuery.extend({
    timer: {
        guid: 1, global: {}, regex: /^([0-9]+)\s*(.*s)?$/, powers: { ms: 1, cs: 10, ds: 100, s: 1000, das: 10000, hs: 100000, ks: 1000000 }, timeParse: function (c) {
            if (c == undefined || c == null) {
                return null
            }
            var a = this.regex.exec(jQuery.trim(c.toString()));
            if (a[2]) {
                var b = parseInt(a[1], 10);
                var d = this.powers[a[2]] || 1;
                return b * d
            } else {
                return c
            }
        }, add: function (e, c, d, g, h, b) {
            var a = 0;
            if (jQuery.isFunction(d)) {
                if (!h) {
                    h = g
                }
                g = d;
                d = c
            }
            c = jQuery.timer.timeParse(c);
            if (typeof c != "number" || isNaN(c) || c <= 0) {
                return
            }
            if (h && h.constructor != Number) {
                b = !!h;
                h = 0
            }
            h = h || 0;
            b = b || false;
            if (!e.$timers) {
                e.$timers = {}
            }
            if (!e.$timers[d]) {
                e.$timers[d] = {}
            }
            g.$timerID = g.$timerID || this.guid++;
            var f = function () {
                if (b && this.inProgress) {
                    return
                }
                this.inProgress = true;
                if ((++a > h && h !== 0) || g.call(e, a) === false) {
                    jQuery.timer.remove(e, d, g)
                }
                this.inProgress = false
            };
            f.$timerID = g.$timerID;
            if (!e.$timers[d][g.$timerID]) {
                e.$timers[d][g.$timerID] = window.setInterval(f, c)
            }
            if (!this.global[d]) {
                this.global[d] = []
            }
            this.global[d].push(e)
        }, remove: function (c, b, d) {
            var e = c.$timers, a;
            if (e) {
                if (!b) {
                    for (b in e) {
                        this.remove(c, b, d)
                    }
                } else {
                    if (e[b]) {
                        if (d) {
                            if (d.$timerID) {
                                window.clearInterval(e[b][d.$timerID]);
                                delete e[b][d.$timerID]
                            }
                        } else {
                            for (var d in e[b]) {
                                window.clearInterval(e[b][d]);
                                delete e[b][d]
                            }
                        }
                        for (a in e[b]) {
                            break
                        }
                        if (!a) {
                            a = null;
                            delete e[b]
                        }
                    }
                }
                for (a in e) {
                    break
                }
                if (!a) {
                    c.$timers = null
                }
            }
        }
    }
});
(/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(navigator.userAgent);
var _ieVers = parseFloat(RegExp.$1);
if (_ieVers) {
    jQuery(window).one("unload", function () {
        var d = jQuery.timer.global;
        for (var a in d) {
            var c = d[a], b = c.length;
            while (--b) {
                jQuery.timer.remove(c[b], a)
            }
        }
    })
}
$.fn.CrosswordCompiler = function (b, d, c) {
    var a = $(this).attr("id");
    if (a == null) {
        alert("You Must Pass An Element With an Id");
        return false
    }
    $("<style>#" + a + " td{font-size:auto}</style>").appendTo($(this));
    IdDivGame = a;
    if (!$.isXMLDoc(b)) {
        b = $.parseXML(b)
    }
    CrossWord.Start(b, a, d, c)
};
var IdDivGame = "";
var CrossWord = {};
var GridHelper = {};
var Grid = {};
var Clues = {};
var Cell = {};
var Completition = {};
var Iframe = {};
var SuperXML = {};
var ObjectXML = {};
var isWordSearch = false;
var isSudoku = false;
var isCoded = false;
var MaxCheat = -1;
var RootImages = "CrosswordImages/";
$(function () {
    CrossWord = {
        Images: { "reveal-word": "revealword.png", "reveal-letter": "revealletter.png", revert: "revert.png", solution: "solution.png", check: "check.png", pencil: "pencil.png", submit: "submit.png", save: "save.png" }, Iframe: $("<iframe />"), PuzzlePage: "Software &copy; 2013 <span>crossword-compiler.com</span>", CopyRight: "", TimerObject: { Enabled: false, OnLoad: false, Start: 0, Pause: true, Stop: true, Actions: false, Stopping: true }, TimerDiv: "", HideNumbers: false, DivTitle: "", Cells: {}, Words: {}, GridX: 0, Alphabet: [], LetterAlphabet: [], GridY: 0, DivActions: "", DivGame: "", TypeGame: "", Timer: { "initial-value": 0, "start-on-load": "false", "allow-pause": "true" }, AppletSettings: "applet-settings", ActionsName: "actions", RectangularPuzzle: "rectangular-puzzle", Actions: { width: { left: 100, right: 100, down: 400 }, actions: { revert: 0, check: 0, save: 0, submit: 0, "reveal-word": 0, "reveal-letter": 0, solution: 0, pencil: 0 }, attributesActions: { "buttons-layout": "", "wide-buttons": "", "graphical-buttons": false }, eachAction: { label: "", "target-url": "", "target-frame": "", "target-type": "GET" } }, XML: {}, Width: 0, Height: 0, X: 0, Y: 0, Canvas: {}, Params: {}, Attributes: { "background-color": "white", "wrong-letter-color": false, "selected-cells-color": "gray", "cursor-color": "yellow", width: 0, height: 0, "scroll-width": "", "scroll-height": "", "hide-numbers": "?", "show-alphabet": "", "enforce-alphabet": false, "is-solving": "?", "title-left": "false", "title-height": 11, "type-skip-existing": false }, Start: function (b, d, a, c) {
            this.Params = c;
            if (a != null) {
                this.images = $.extend(this.Images, a)
            }
            this.X = 0;
            this.Y = 0;
            this.DivGame = d;
            var e = this;
            this.XML = SuperXML = ObjectXML = $(b);
            this.SetTypeGame();
            this.SetAttributes();
            this.ImplementAttributes();
            this.DrawTitle();
            this.StartTimer();
            this.DrawHTMLactions();
            this.CallClues();
            if (Clues.Attributes.layout == "left") {
                e.GridX += parseInt(Clues.Attributes.width)
            }
            this.CallGrid();
            this.CallKeyWords();
            this.ShowAlphabet();
            this.Words = Clues.GetWords();
            this.Cells = Grid.Cells;
            this.SetIdCells();
            this.RepaintTitle();
            Clues.SetEventClick();
            Completition.SetUrl();
            Grid.LoadProgress();
            if (!isWordSearch) {
                Grid.FirstTime()
            }
            e.RunTimer(true);
            if (e.TimerObject.OnLoad == false && e.TimerObject.Enabled == true) {
                e.TimerDiv.stopTime();
                e.TimerObject.Stop = true;
                e.TimerObject.Stopping = true
            }
            e.DrawCopy();
            $("#" + e.DivGame).find("#loading").remove();
            Grid.ProcessHintLetter();
            return false
        }, DrawCopy: function () {
            var d = 208;
            var a = $("<div/>").css({ position: "absolute", fontSize: "11px", color: "black", fontFamily: "sans-serif", fontWeight: "normal", backgroundColor: "transparent", cursor: "default", width: "220px", textAlign: "right" }).html(this.PuzzlePage).appendTo(Iframe).find("span").css({ color: "black", textDecoration: "none", cursor: "pointer" }).mouseover(function () {
                $(this).css({ color: "blue", textDecoration: "underline" })
            }).mouseout(function () {
                $(this).css({ color: "black", textDecoration: "none" })
            }).click(function () {
                window.open("http://www.crossword-compiler.com")
            }).end();
            var b = Grid.InicioY + 2;
            b += (this.Attributes["scroll-height"] != "") ? parseInt(this.Attributes["scroll-height"]) : Grid.Size * Grid.Height;
            b += (this.Attributes["show-alphabet"] == "true") ? 22 : 0;
            b += (Clues.HasKeyWord == true) ? Grid.Size + 4 : 0;
            b += (Clues.Attributes.layout == "below" && Clues.Div.find(">div").length > 0) ? Clues.Div.height() : 0;
            var i = Grid.InicioX - d;
            i += (this.Attributes["scroll-width"] != "") ? parseInt(this.Attributes["scroll-width"]) : Grid.Size * Grid.Width;
            var g = (this.Attributes["scroll-width"] != "") ? parseInt(this.Attributes["scroll-width"]) : Grid.Size * Grid.Width;
            if (Grid.Settings["thick-border"] == "true") {
                b += 2
            }
            a.css({ top: b + "px", marginLeft: (i - 10) + "px" });
            var e = null;
            if (this.CopyRight != "") {
                e = $("<div/>").css({ position: "absolute", fontSize: "11px", color: "black", fontFamily: "sans-serif", fontWeight: "normal", backgroundColor: "transparent", cursor: "default" }).html(this.CopyRight).appendTo(Iframe);
                e.css({ top: b, marginLeft: Grid.InicioX + 2 + "px" })
            }
            if (e != null) {
                if (a.width() + e.width() > g) {
                    var f = parseInt(this.Attributes.width) - d - 12;
                    a.css({ marginLeft: f + "px" })
                }
            }
            if (this.Attributes["show-alphabet"] && e == null) {
                var c = Grid.InicioX + (g / 2) - d / 2;
                var h = (Grid.InicioX + (g / 2)) + (d / 2);
                if (h > this.Attributes.width) {
                    Iframe.css({ width: Iframe.width() + (parseInt(h) - Iframe.width()) + "px" })
                }
                a.css({ marginLeft: c + "px" })
            }
            return false
        }, StartTimer: function () {
            var a = this;
            if (this.TimerObject.Enabled == true) {
                this.TimerDiv = $("<center/>").css({ "font-family": "sans-serif", "font-size": "15px", border: "0px", "font-weight": "bolder", cursor: "default" }).html("00:00").click(function () {
                    if (a.TimerObject.Pause == true) {
                        $(this).stopTime();
                        $(this).fadeTo("fast", 0.5);
                        a.TimerObject.Stop = true
                    }
                })
            }
            return false
        }, RunTimer: function (a) {
            if (typeof this.TimerDiv == "object" && this.TimerObject.Stop && this.TimerObject.Enabled) {
                this.TimerObject.Stop = false;
                var b = this;
                this.TimerDiv.fadeTo("fast", 1).everyTime(1000, function () {
                    b.TimerObject.Start++;
                    var c = Math.floor((b.TimerObject.Start) / 60);
                    var d = (b.TimerObject.Start) % 60;
                    c = (c < 10) ? "0" + c : c;
                    d = (d < 10) ? "0" + d : d;
                    $(this).html(c + ":" + d)
                })
            }
            if (a && this.TimerObject.Enabled) {
                (this.TimerObject.Actions) ? this.TimerDiv.appendTo(this.DivActions) : this.TimerDiv.css({ "float": "right", marginRight: "20px" }).appendTo(Clues.Div)
            }
            if (this.DivActions.height() > Iframe.height()) {
                Iframe.height(this.DivActions.height())
            }
            return false
        }, Override: function () {
            if (this.Params.hasOwnProperty("ROOTIMAGES")) {
                RootImages = this.Params.ROOTIMAGES
            }
            var a = this;
            $.each(this.Images, function (b, c) {
                a.Images[b] = RootImages + a.Images[b]
            });
            if (this.Params.hasOwnProperty("TITLEHEIGHT")) {
                this.Attributes["title-height"] = (!isNaN(parseInt(this.Params.TITLEHEIGHT))) ? parseInt(this.Params.TITLEHEIGHT) : this.Attributes["title-height"]
            }
            if (this.Params.hasOwnProperty("MAXCHEATS")) {
                MaxCheat = (!isNaN(parseInt(this.Params.MAXCHEATS)) && parseInt(this.Params.MAXCHEATS > 0)) ? parseInt(this.Params.MAXCHEATS) : -1
            }
            if (this.Params.hasOwnProperty("SCROLLWIDTH")) {
                this.Attributes["scroll-width"] = (!isNaN(parseInt(this.Params.SCROLLWIDTH)) && parseInt(this.Params.SCROLLWIDTH > 0)) ? parseInt(this.Params.SCROLLWIDTH) : ""
            }
            if (this.Params.hasOwnProperty("SCROLLHEIGHT")) {
                this.Attributes["scroll-height"] = (!isNaN(parseInt(this.Params.SCROLLHEIGHT)) && parseInt(this.Params.SCROLLHEIGHT > 0)) ? parseInt(this.Params.SCROLLHEIGHT) : ""
            }
            (this.Params.hasOwnProperty("TITLELEFT")) ? this.Attributes["title-left"] = (this.Params.TITLELEFT) ? "true" : "false" : true;
            (this.Params.hasOwnProperty("CURCOLOR")) ? this.Attributes["cursor-color"] = this.Params.CURCOLOR : true;
            (this.Params.hasOwnProperty("WRONGCOLOR")) ? this.Attributes["wrong-letter-color"] = this.Params.WRONGCOLOR : true;
            (this.Params.hasOwnProperty("BACKCOLOR")) ? this.Attributes["background-color"] = this.Params.BACKCOLOR : true;
            (this.Params.hasOwnProperty("TIMER")) ? this.Timer.Enabled = this.Params.TIMER : true;
            (this.Params.hasOwnProperty("STARTTIME")) ? this.Timer.Start = this.Params.STARTTIME : true;
            (this.Params.hasOwnProperty("NOPAUSE")) ? this.Timer.Pause = this.Params.NOPAUSE : true;
            (this.Params.hasOwnProperty("TIMEFROMLOAD")) ? this.Timer.OnLoad = this.Params.TIMEFROMLOAD : true;
            if (this.Params.hasOwnProperty("VIEWPORT")) {
                this.ViewPort = true
            }
            this.CopyRight = ((this.XML.find("applet-settings")).find("copyright").length == 1) ? (xmlTag(this.XML.find("applet-settings").find("copyright")) == "") ? this.XML.find("applet-settings").find("copyright").text() : xmlTag(this.XML.find("applet-settings").find("copyright")) : "";
            this.CopyRight = (this.Params.hasOwnProperty("COPYRIGHT")) ? this.Params.COPYRIGHT : this.CopyRight;
            return false
        }, SetAttributes: function () {
            var d = this;
            var c = d.XML.find(d.AppletSettings);
            $.each(this.Attributes, function (e, f) {
                if (c.attr(e) != null) {
                    d.Attributes[e] = c.attr(e)
                }
            });
            this.Attributes["hide-numbers"] = this.Attributes["hide-numbers"] == "true";
            this.Attributes["enforce-alphabet"] = this.Attributes["enforce-alphabet"] == "true";
            var b = d.XML.find(d.AppletSettings).find("completion");
            if (b.length == 1) {
                if (b.attr("cheating")) {
                    MaxCheat = parseInt(b.attr("cheating"))
                }
            }
            if (this.Attributes["scroll-width"] != "") {
                this.Attributes["scroll-width"] = parseInt(this.Attributes["scroll-width"])
            }
            var a = d.XML.find(d.AppletSettings).find("timer");
            if (a.length == 1) {
                this.TimerObject.Enabled = true;
                if (a.attr("initial-value")) {
                    this.TimerObject.Start = parseInt(a.attr("initial-value"))
                }
                if (a.attr("start-on-load")) {
                    this.TimerObject.OnLoad = ((a.attr("start-on-load") == "true"))
                }
                if (a.attr("allow-pause")) {
                    this.TimerObject.Pause = ((a.attr("allow-pause") == "true"))
                }
            }
            this.Override();
            return false
        }, ImplementAttributes: function () {
            var a = $("#" + this.DivGame);
            a.css({ "background-color": this.Attributes["background-color"] + "", width: this.Attributes.width + "", height: this.Attributes.height + "", position: "relative" });
            Iframe = a;
            return false
        }, DrawTitle: function () {
            var a = (this.XML.find("applet-settings").find("title").length > 0) ? (xmlTag(this.XML.find("applet-settings").find("title"))) ? xmlTag(this.XML.find("applet-settings").find("title")) : this.XML.find("applet-settings").find("title").text() : "";
            a = (this.Params.hasOwnProperty("TITLE")) ? this.Params.TITLE : a;
            if (a != null && a != "" && a != "%TITLE%") {
                this.DivTitle = $("<div />").css({ "font-size": this.Attributes["title-height"] + "px", width: "100%", "text-align": "center", "font-family": "sans-serif", "font-weight": "normal" }).html(a);
                if (this.Attributes["title-left"] == "true") {
                    DivTitle.css({ "text-align": "left" })
                }
                Iframe.append(this.DivTitle);
                this.GridY += this.DivTitle.height()
            }
            return false
        }, RepaintTitle: function () {
            var a = (this.Attributes["scroll-width"] != "") ? parseInt(this.Attributes["scroll-width"]) : Grid.Width * Grid.Size;
            if (this.DivTitle != "") {
                this.DivTitle.css({ opacity: 0 });
                this.DivTitle.clone().css({ position: "absolute", opacity: 1, width: a + "px", left: Grid.InicioX + "px", top: "0px" }).appendTo(Iframe)
            }
            return false
        }, TagAction: null, DrawHTMLactions: function () {
            var e = this;
            var c = e.XML.find(e.AppletSettings).find(e.ActionsName);
            this.TagAction = c;
            var a = $("<div/>").css({ border: "solid 0px", "font-size": this.Attributes["title-height"], "font-weight": "normal", "font-family": "sans-serif", width: (c.attr("wide-buttons") == "true" && c.attr("graphical-buttons") == "true") ? "100px" : (c.attr("graphical-buttons") != "true" && c.attr("wide-buttons") == "true") ? "80px" : "60px" });
            var d = (c.attr("graphical-buttons") == "true");
            $.each(this.Actions.actions, function (f, i) {
                var g = c.find(f);
                if (g.length == 1) {
                    var h = $("<div/>").data("id", f).css({ height: "35px", cursor: "pointer" });
                    if (d) {
                        h.html("<img src='" + e.Images[f] + "' width='25'   />")
                    }
                    if (!d) {
                        if (f == "pencil") {
                            $("<input type='checkbox' />").appendTo(h)
                        }
                    }
                    h.append($("<div/>").height(35).append($("<span>").css({ marginTop: "10px" }).html(g.attr("label"))));
                    if (!d) {
                        h.css({ backgroundColor: (f == "pencil") ? "" : "#E0E0E0", textAlign: "center", marginBottom: "5px", border: (f != "pencil") ? "solid gray 1px" : "solid 0px" })
                    }
                    h.appendTo(a);
                    h.find("*").css({ display: "inline-block" })
                }
            });
            this.DivActions = a;
            if (c.attr("buttons-layout") != "below") {
                this.DivActions.css({ "float": c.attr("buttons-layout") });
                $.each(this.DivActions.find(">div"), function (f, g) {
                    if (c.attr("graphical-buttons") == "true") {
                        $(this).find(">*").css({ "float": "left" })
                    }
                })
            }
            Iframe.append(this.DivActions);
            if (c.attr("buttons-layout") == "below") {
                Iframe.fillRect(0, this.Attributes.height - 35, parseInt(this.Attributes.width), 35, { color: this.Attributes["background-color"] });
                a.find(">div").each(function (f, g) {
                    if ($(this).width() > 80) {
                        $(this).css({ display: "inline-block", width: $(this).width() + "px" })
                    } else {
                        $(this).css({ display: "inline-block", width: "80px" })
                    }
                });
                var b = 0;
                $.each(a.find(">div"), function (f, g) {
                    b += $(this).width()
                });
                a.css({ width: b + 20, margin: "auto" });
                a.appendTo(Iframe.find("div:last"))
            } else {
                if (c.attr("buttons-layout") == "left" && a.find("div").length > 0) {
                    this.GridX += this.DivActions.width() + 5;
                    this.TimerObject.Actions = true
                }
            }
            return false
        }, SetTypeGame: function () {
            var b = this;
            var c = ["crossword", "coded", "sudoku", "word-search"];
            var a = this.XML.find(this.RectangularPuzzle);
            $.each(c, function (d, e) {
                if (a.find(e).length == 1) {
                    b.TypeGame = e
                }
            });
            isWordSearch = (b.TypeGame == "word-search") ? true : false;
            isSudoku = (b.TypeGame == "sudoku") ? true : false;
            isCoded = (b.TypeGame == "coded") ? true : false;
            return false
        }, ShowAlphabet: function () {
            var g = this;
            var f = this.XML.find(this.RectangularPuzzle).attr("alphabet");
            (f != null) ? this.Alphabet = f.split("") : true;
            if (this.Attributes["show-alphabet"] == "true") {
                var b = Grid;
                var e = b.InicioY;
                e += (this.Attributes["scroll-height"] == "") ? ((parseInt(b.Settings["cell-size-in-pixels"]) * b.Height) + 5) : (parseInt(this.Attributes["scroll-height"]) + 5);
                var h = b.InicioX;
                var f = this.Alphabet;
                var c = 14;
                var d = 14;
                while (c * f.length > Grid.Width * Grid.Size) {
                    c--;
                    d--
                }
                var a = (this.Attributes["scroll-width"] == "") ? Grid.Size * Grid.Width : parseInt(this.Attributes["scroll-width"]);
                a = a - (f.length * c);
                a /= 2;
                h += a;
                $.each(f, function (i, j) {
                    var k = Iframe.fillRect(h + (c * i), e, c, 20, { color: "white" });
                    k.click(function () {
                        Grid.DrawLetter($(this).html(), 5000)
                    }).html(j).css({ cursor: "pointer", "font-weight": "bolder", "font-size": d + "px", "text-align": "center", "font-family": "sans-serif" });
                    g.LetterAlphabet.push(k)
                })
            }
            return false
        }, CallGrid: function () {
            Grid.Start(this.XML, this.DivGame, this.Canvas, this.TypeGame, this.Attributes, this.GridX, this.GridY)
        }, CallButtonsEvents: function () {
            Grid.SetEventsAction()
        }, CallClues: function () {
            Clues.Start(this.TypeGame)
        }, CallKeyWords: function () {
            Clues.KeyWord()
        }, ObjectGrid: function () {
            Grid.GetMe()
        }, SetIdCells: function () {
            if (this.TypeGame == "word-search") {
                return false
            }
            var a = this;
            $.each(this.Words, function (c, d) {
                if (d.keyword == "true") {
                    return false
                }
                var b = Iframe.find("li#LI" + c);
                $.each(d.Squares, function (e, h) {
                    var f = h.split("-");
                    var g = a.Cells[parseInt(f[0])][parseInt(f[1])];
                    g.data("WordId").push(c);
                    g.data("WordItem").push(d);
                    g.data("LIS").push(b)
                });
                $.each(d.cells, function (e, f) {
                    var g = $(this);
                    var h = CellContains({ x: g.attr("x"), y: g.attr("y") });
                    $.each(h, function (i, k) {
                        var j = k.split("-");
                        var l = a.Cells[parseInt(j[0])][parseInt(j[1])];
                        if (l != null) {
                            l.data("ImLink", true);
                            l.data("WordId").push(c);
                            l.data("LIS").push(b)
                        }
                    })
                })
            });
            return false
        }, Boxy: 0, RepaintHeightClues: function () {
            var d = (Clues.Attributes.layout == "below") ? parseFloat(this.Attributes.height) - (Grid.InicioY + (Grid.Height * parseInt(Grid.Settings["cell-size-in-pixels"]))) : (Grid.Height * parseInt(Grid.Settings["cell-size-in-pixels"])) / Clues.Div.find(">div").length;
            if (Clues.Div.find(">div").length == 1) {
                d -= 5
            }
            d = (this.Attributes["scroll-height"] != "") ? parseInt(this.Attributes["scroll-height"]) / 2 : d;
            if (Grid.Settings["numbered-sides"]["top"] != "") {
                d += Grid.Size / 2
            }
            if (Clues.Attributes.layout == "below") {
                var c = Grid.InicioY + 2;
                c += (this.Attributes["scroll-height"] != "") ? parseInt(this.Attributes["scroll-height"]) : Grid.Size * Grid.Height;
                var b = this.Attributes.height - c - 15;
                Clues.Div.css({ position: "absolute", top: c + "px", height: b + "px" });
                Clues.Div.find(">div").css({ height: b + "px" });
                var a = (this.Attributes["scroll-width"] != "") ? parseInt(this.Attributes["scroll-width"]) : Grid.Width * Grid.Size;
                Clues.Div.css({ width: a + "px", marginLeft: Grid.InicioX + "px" });
                $.each(Clues.Div.find(">div"), function (e, f) {
                    $(f).css({ marginLeft: "0px", width: "50%", display: "inline-block", marginTop: "0px", height: b + "px" })
                })
            } else {
                if (Clues.Div != null) {
                    Clues.Div.css({ "float": Clues.Attributes.layout });
                    Clues.Div.css({ marginLeft: "5px" });
                    $.each(Clues.Div.find(">div"), function (e, f) {
                        $(f).css({ height: d + "px" })
                    })
                }
            }
            $.each(Clues.Div.find("li"), function (i, j) {
                if ($(this).find(">span").eq(0).length == 1) {
                    var f = $(this).width();
                    var g = $(this).find(">span").eq(0).width();
                    var h = f - g;
                    $(this).find(">span").eq(0).css({ marginLeft: h });
                    $(this).find(">p").eq(0).css({ width: (h - 2) + "px" });
                    var e = ($(this).find(">p").eq(0).find("span").eq(0).length == 1) ? $(this).find(">p").eq(0).find("span").eq(0).width() : 0;
                    $(this).find(">p").eq(0).find("span").eq(1).css({ width: h - e + "px" });
                    if ($(this).find(">p").eq(0).find("span").eq(1).width() != h - e) {
                        $(this).find(">p").eq(0).find("span").eq(1).html($(this).find(">p").eq(0).find("span").eq(1).html() + "&nbsp;&nbsp;&nbsp;");
                        $(this).find(">p").eq(0).find("span").eq(1).css({ width: h - e - 2 + "px" })
                    }
                }
            });
            if (Clues.Attributes["right-align-numbers"] == "true") {
                $.each(Clues.Div.find("li"), function (k, n) {
                    var f = ($(this).find("p").find(">span").eq(0).length == 1) ? $(this).find("p").find(">span").eq(0) : null;
                    var j = ($(this).find("p").find(">span").eq(1).length == 1) ? $(this).find("p").find(">span").eq(1) : null;
                    if (f != null && j != null) {
                        var g = parseInt(f.parent().width() / 10);
                        (/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(navigator.userAgent);
                        var l = parseFloat(RegExp.$1);
                        var h = l >= 8 && l < 9;
                        if (f.height() != j.height()) {
                            j.css({ position: "absolute" });
                            if (h) {
                                j.css({ marginRight: 16 + "px" })
                            }
                            if (f.width() - 10 > g) {
                                var i = parseInt((f.width() - g));
                                var e = $("<span/>");
                                var m = $("<span/>").html(j.html());
                                j.html("&nbsp;").append(e).append(m);
                                j.css({ left: g - 1 + "px" });
                                while (e.width() < i) {
                                    e.html(e.html() + "&nbsp")
                                }
                            }
                            j.parent().css({ height: j.height() })
                        }
                    }
                })
            }
            Clues.Div.find(">div").each(function (e, f) {
                $(this).find("p").eq(0).remove();
                if ($(this).find("div:eq(0)").height() + $(this).find("*:eq(0)").height() > $(this).height()) {
                    $(this).find("div:eq(0)").height($(this).height() - $(this).find("*:eq(0)").height())
                }
                if (navigator.userAgent.indexOf("Mozilla") >= 0) {
                    $(this).find("li:last").css({ marginBottom: "1px" })
                }
            });
            return false
        }
    }
});
