(function () {
    var activeType = 'rectangle';

    $(document).ready(function () {
        var $canvasContainer = $('#canvas-container'),
            $canvasElement = $('#drawing-pad'),
            canvasElement = $canvasElement[0],
            ctx = canvasElement.getContext('2d'),
            arrRect = [],
            arrCircle = [],
            arrText = [];

        $('.tool-item').on('click', function () {
            var this$ = $(this),
                data = this$.data(),
                type = data.type;

            $('textarea#textareaTest').remove();
            $('#saveText').remove();
            $('#textAreaPopUp').remove();

            if (type !== activeType) {

                $('.tool-item').removeClass('selected');
                $('#' + type).addClass('selected');
                activeType = type;
            }

        });

        $('#button-reset').on('click', function () {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(image, 0, 0);
        });

        $('#button-save').on('click', function () {
            openWindowWithPostRequest(canvasElement.toDataURL());
        });

        function openWindowWithPostRequest(imageData) {
            var winName = 'MywindowDraw';
            var winURL = 'http://localhost:8003/demos/GoogleMapCapture/final.debug.php';
            var params = { 'imageData': imageData };
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", winURL);
            form.setAttribute("target", winName);
            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = params[i];
                    form.appendChild(input);
                }
            }
            document.body.appendChild(form);
            window.open('', winName);
            form.target = winName;
            form.submit();
            document.body.removeChild(form);
        }

        var image = new Image();
        image.src = imageData;
        //image.width = 500;
        //image.height = 380;
        image.onload = function () {
            canvasElement.width = image.width;
            canvasElement.height = image.height;
            $(canvasElement).css({ width: image.width, height: image.height });
            ctx.drawImage(image, 0, 0);
        }


        var downX, downY, curX, curY, rect, preX, preY,
            backupImageData;
        $canvasElement.on('mousedown', function (evt) {
            backupImageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
            downX = evt.clientX - canvasElement.getBoundingClientRect().left;
            downY = evt.clientY - canvasElement.getBoundingClientRect().top;
            console.clear();
            console.log('downX : ' + downX + ' downY : ' + downY);
            ctx.beginPath();
            ctx.moveTo(downX, downY);

            $(document).on('mousemove', function (evt) {
                switch (activeType) {
                    case 'rectangle': {
                        drawRectangle(evt);
                    }
                        break;
                    case 'circle': {
                        drawCircle(evt);
                    }
                        break;
                    case 'pencil': {
                        drawPencil(evt);
                    }
                        break;
                }

            });

            function drawRectangle(evt) {
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.beginPath();

                backupImageData && ctx.putImageData(backupImageData, 0, 0);
                curX = evt.clientX - canvasElement.getBoundingClientRect().left;
                curY = evt.clientY - canvasElement.getBoundingClientRect().top;
                ctx.rect(downX, downY, curX - downX, curY - downY);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }

            function drawCircle(evt) {
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.beginPath();

                backupImageData && ctx.putImageData(backupImageData, 0, 0);
                curX = evt.clientX - canvasElement.getBoundingClientRect().left;
                curY = evt.clientY - canvasElement.getBoundingClientRect().top;

                ctx.moveTo(downX, downY + (curY - downY) / 2);
                ctx.bezierCurveTo(downX, downY, curX, downY, curX, downY + (curY - downY) / 2);
                ctx.bezierCurveTo(curX, curY, downX, curY, downX, downY + (curY - downY) / 2);

                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }

            function drawPencil(evt) {
                //ctx.beginPath();
                curX = evt.clientX - canvasElement.getBoundingClientRect().left;
                curY = evt.clientY - canvasElement.getBoundingClientRect().top;
                console.log('curX : ' + curX + ' curY : ' + curY);
                ctx.lineTo(curX, curY);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
                //ctx.closePath();
            }

            $(document).on('mouseup', function (evt) {
                //arrRect.push({ x: downX, y: downY, width: evt.clientX - canvasElement.getBoundingClientRect().left - downX, height: evt.clientY - canvasElement.getBoundingClientRect().top - downY });
                backupImageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
                $(document).off('mousemove mouseup');
            });
        });



        // Draiwng text
        $canvasElement.on('click', function (e) {

            if (activeType !== 'text') {
                return;
            }

            if ($('#textAreaPopUp').length == 0) {
                var mouseX = e.clientX - $canvasContainer[0].getBoundingClientRect().left;
                var mouseY = e.clientY - $canvasContainer[0].getBoundingClientRect().top;

                //append a text area box to the canvas where the user clicked to enter in a comment
                var textArea = "<div id='textAreaPopUp' style='position:absolute;top:" + mouseY + "px;left:" + mouseX + "px;z-index:30;'><textarea id='textareaTest' style='width:100px;height:50px;'></textarea>";
                var saveButton = "<input type='button' value='save' id='saveText'></div>";
                var appendString = textArea + saveButton;
                $canvasContainer.append(appendString);
                $("#textareaTest").focus();
            } else {
                $('textarea#textareaTest').remove();
                $('#saveText').remove();
                $('#textAreaPopUp').remove();
                var mouseX = e.clientX - $canvasContainer[0].getBoundingClientRect().left;
                var mouseY = e.clientY - $canvasContainer[0].getBoundingClientRect().top;
                //append a text area box to the canvas where the user clicked to enter in a comment
                var textArea = "<div id='textAreaPopUp' style='position:absolute;top:" + mouseY + "px;left:" + mouseX + "px;z-index:30;'><textarea id='textareaTest' style='width:100px;height:50px;'></textarea>";
                var saveButton = "<input type='button' value='save' id='saveText'></div>";
                var appendString = textArea + saveButton;
                $canvasContainer.append(appendString);
                $("#textareaTest").focus();
            }
            $("#saveText").click(function () {
                var y = mouseY, x = mouseX;
                var text = $('textarea#textareaTest').val();
                $('textarea#textareaTest').remove();
                $('#saveText').remove();
                $('#textAreaPopUp').remove();
                //get the canvas and add the text functions
                var cw = canvasElement.clientWidth;
                var ch = canvasElement.clientHeight;
                // canvas.width = cw;
                // canvas.height = ch;
                //break the text into arrays based on a text width of 100px
                var phraseArray = text.split('\n');//getLines(ctx,text,100);
                // this adds the text functions to the ctx
                CanvasTextFunctions.enable(ctx);
                var counter = 0;
                //set the font styles
                var font = "sans";
                var fontsize = 16;
                ctx.strokeStyle = "rgba(255,0,0,1)";
                var origFontSize = ctx.font;
                ctx.font = "900 16px Helvetica";
                //ctx.shadowOffsetX = 2;
                //ctx.shadowOffsetY = 2;
                //ctx.shadowBlur = 1;
                //ctx.shadowColor = "rgba(0,0,0,1)";
                //draw each phrase to the screen, making the top position 20px more each time so it appears there are line breaks
                $.each(phraseArray, function () {
                    //set the placement in the canvas
                    var lineheight = fontsize * 1.5;
                    var newline = ++counter;
                    newline = newline * lineheight;
                    var topPlacement = y - $canvasElement.position().top + newline;
                    var leftPlacement = x - $canvasElement.position().left;
                    text = this;
                    //draw the text
                    ctx.drawText(font, fontsize, leftPlacement, topPlacement, text);
                    ctx.save();
                    ctx.restore();
                });
                //reset the drop shadow so any other drawing don't have them
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgba(0,0,0,0)";
            });

        });

    });
})();