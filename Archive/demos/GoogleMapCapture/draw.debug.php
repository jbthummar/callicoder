﻿<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Draw</title>
    <meta name="viewport" content="width=device-width,initial-sclae=1.0" />
    <script src="../../lib/jquery-1.11.0.js"></script>
    <script src="../../lib/text.js"></script>
    <script src="scripts/draw.js"></script>

    <style>
        body {
            -webkit-user-select: none;
            text-align: center;
            margin: 0px;
            font-family: Helvetica;
        }

        #wrapper {
            min-width: 800px;
            display: inline-block;
            min-height: 591px;
            position: relative;
            margin: auto;
            background-color: rgb(224,216,197);
            padding-top: 30px;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #4433ff;
            border-radius: 15px;
        }

        #table-wrapper {
            min-height: 500px;
            min-width: 500px;
            margin: auto;
        }

        .advertise {
            width: 70px;
            height: 100px;
            border: 1px solid black;
        }

        #toolbox-wrapper {
            width: 60px;
            border: 1px solid black;
            background-color: #FFFFFF;
        }

            #toolbox-wrapper table td {
                width: 30px;
                height: 35px;
                padding: 0px;
            }

        .tool-item {
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 15px 19px;
        }

            .tool-item.selected {
                background-color: rgb(40,85,118);
            }

        #rectangle {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAIAAABfg7keAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIMSURBVChTFVFbbxJhEP1oaxEf9Bf4rDW1D0iLDQWqJmob2r4Y/4jvxp9jfFCaCoGFvXVZdpfLciuXUgrLFtgry15giX2pH5Mzk8nMyZyZDOgLDVm9dRay5cimLQliWzfu7LkCo6L1Z9ZIN4YA+mKpwtJN78qy1akhK+rItBRNHymaYNrj6UwEgb2t4P5O6CCw/frF6dnxXtAfjuyHDoJvAjvRw7f+wNb3H9/Al69H6Uy8c91AMkmGoSFSK0vW6mWGvTy/+Hly9h6Eo36GJfqDLkFgCIKwKysQBMGy+WKJabb4l6+eg1DYn0j+RrE0TdMYRjAMV6s2G41mPB6ncniewY9j70DkcBfJJBAkxfM8SdCXZD6dwkrFKkmSHMf8if/6+DkMILFaK1Yq5XK5gqEUx/I5ikOzJBzG8yWWoz4dRcBucDuVvqAoCmplEKJYqNeqHSSNE3gORdEcjcPbQez0Qyb7F+7IcRyd42DvPJ6ACY7jjasKlcuu5DxrYH19hWdPfR4Anvi8j72PvJtr3k3Pxgbw+UDsJAo618WHB0fXBcuSbFs1prJjT3V9NJuNl0ttNG4Lwxpw5vAJd5J0Yxgjy1Igz3UNSRoMh23HkfTpYOFOwMwUWm3GXSquq3a7VUm6VVXRNCeGITrzyVCsa3oXSHJL03u2M7btCRSFEoUCIcs9SJqZ4njS+ncv/wf74XlG+7K+gwAAAABJRU5ErkJggg==);
        }

        #circle {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAIAAABfg7keAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI2SURBVChTASsC1P0A///u7O3d7u/h19fL3NzQ9/fr+Pju1NTI7+/j2NnL3t/P+/zqAOrr2+Hi1Pj47PX16///9vb27Obm3vv78fT06v//9Pr77dHSwgDP0MLx8eX39+3i4tru7ubGxr7k497e3tbn59/Jyb/y8ub///MA7e3h9fXr5eXdp6ahtLOuwL+6wsG9t7axxcS////409PJ7e3hAPz88oqKgoKBfGRjX19eWnFwbGdmZG5taWBfW21sZ+fn3/j47gCnp594d3KbmpbFxMLFxMLBwL7LycquravNzMq2tbEcGxb5+fEAOTkxxcTA0dDOz83Ox8XIzcvOvry/1dPWwL6/xsXD09LOKysjAEdHP8rJxcjGx8nHyq+ss8/M1crH0Lm2vczKzcLAwcHAvFJSSgBMTESwr6vBv8Dm5OnV0tu6t8DAvcjBvsfDwcbS0NG+vbk6OjIAra2jd3ZxzMvJtbO2w8DHzMnQzMnSsq+24+HkuLe1ExIN4uLYAP//9HFxaTU0MKmnqJiWmbCus4+NkrKws1dVViUkIOrq4uTk2ADf4NLq6uD//vlXVlJwb21oZmd2dHVmZWOtrKjy8ez///bz9OYA2tvL///01dXL///68vHt4N/b9vXx6unl6Ofi7+/l2NjM7/DgAPHy4ufo2vHx5fPz6enp4fj38tfW0f//+Orq4O7u4vj569LTwwDo6dn8/e3b3M7u7uLy8ujq6uDx8enU1Mro6Nzl5tjr7Nzv8ODYGJypzNC1cAAAAABJRU5ErkJggg==);
        }

        #pencil {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAIAAABbdmkjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJdSURBVChTLc5NSBRhGAfwd5GsMAU1pQgh6CBCpwi6dAo6BZFESQodLCWo8FIagpcuFtU5okMfB49BaIFgVlJqme6u6zqzs++8s+/svvP93c7HjqNvQ/XwnB5+z58/cG2RyND29ITGglhyfbmC85SaRM7LRtGKa9Auj45eX1n5DKJEJyYSDVwzcBkXXV+anXt7YD/o6dn36On9qsE41MpkwMLCHMAaw5EtrEJR44NIVyTmaAcYunR25uV07/FW10GqiVpamiYmxoATVRvUiXc9Qsr89q+xGwPdANzuP/fhxZMvM893VRSqlYGr/bnsTwDxOo9zqs47lpD4ZPjKeamw1NcBjmXA6rtXjSrrCWxhc90yFcBXspaLkj21HqDx8cE3rx8aytrUg6HJe4M1tGor244G40ad0hhQ6i6vzjoet7bx/vGzOzxeZOF8exfIFT5Sqnl1wQ8khsmaJgFhpFFqF4qfEP52sf8UEr+e6G0+feYIW16EaNlxBR7ldBXuJTZAQp5IW5Qa7YcBrn3f5ubb2kHQ4PaoZLvlnUQTKpuqURLEfFrgt6IyHFw+1AY6u0HfydaRWxegsGS7JT/EbGnFD5SKxYTUAbLC1UgxTuTOLtB8EExODfsRr1uFKK45Hs+jjZSy2qYcVIGilqOGmnbKNIG7Y9eInFX1QhCJEP1II22nEoSqElYEgwNJ4ojVoqpxN0cu+6Fo2lwaZrvQsvl4RycS63kS/TvAdYmm8+m6nigrbCp0gwsjRTdg6uq+7Di1/1RRICElTUPp1bJxEMqQz6afqcPilmliXRf+0T+cteWj4OoljgAAAABJRU5ErkJggg==);
        }

        #text {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAIAAABfg7keAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIGSURBVChTFZAxTBNRHMZfCXGgDF2IBkcsg8aYEOqgA12IhAR1No6YsBKjcSvFCUEHY9IOhBDjRBoGJlwYVYKiKZT22nLXXu/uvbt3995d79rrXduc/ybf8B9++b7/9yFm17BRNrkYDDk2JJmI1NZ1EKd21/PCrmbKqCn/E+pnfkCpJRMqO57luKyhNqWWTEwLm0SjCvJ7pHT1y2krhiH6AXv2fCmKerohK6rEuF6pFZlDUBCanS7pD1i/z9fWXo6Po8nJMdfVh0NXEP5GUZeyFtKwIDWKqlapVs+z2TexGEombxcKX1W1BqjYKBHaQNQUiV4Ds5OTo0zm9fR0ArjV1Re2rTGmWFxRyTUaDLnFGrpRPz4urK+/SqXuTU3FAd3aygBEDEnBdWh3CQJ0bm42DJnnGeAEyuc/mabMHW0EXZVPvQ7u+vrMzM2dnY3t7ezEBEokbgBXKp2ZrDWKg3aKWn6y9OjgYG9//8vh4bdc7iMQwC0uPobxYOHR41HkxsZQs1lyXWxZLUjZ3f0cj8cAdVzC2xjl8h+Ss7dWnqY3N99qWhVqLy+n5+fvLiyk0umH9x/c2Xj/DkGW62nclimVRLGI8TWYwUiOg8GyF3LbJSMIqsFUvk+DwIJ5oqgjyxXYGm7DbA4iD4V968fP7/CWIPwBJ12XKpVzCL24ONW0ut3Gl+Xf/wEu2YtY09CqPwAAAABJRU5ErkJggg==);
        }

        #canvas-container {
            /*width: 500px;*/
            /*height: 380px;*/
            border: 1px solid black;
            padding: 6px;
            position: relative;
        }

        #drawing-pad {
            /*width: 100%;*/
            /*height: 100%;*/
        }

        .button {
            background-color: rgb(40,85,118);
            border: 1px solid #333333;
            border-radius: 3px;
            color: #FFFFFF;
            float: left;
            margin-left: 30px;
            margin-top: 10px;
            /* height: 24px; */
            padding: 0 16px;
            font-size: 16px;
            line-height: 30px;
            height: 30px;
        }
    </style>
     <?php
        if($_POST["imageData"] !== undefined ){
         $imageData = $_POST["imageData"];
         }
        ?>
    <script>
        var imageData = '<?php  echo $imageData  ?>';
    </script>
</head>
<body>
   
    <div id="wrapper">
        <table id="table-wrapper">
            <tbody>
                <tr>
                    <td style="width: 100px">
                        <div class="advertise"></div>
                    </td>
                    <td style="vertical-align: top">
                        <div>
                            <h2>Title</h2>
                            <h4>Select shape from toolbox and draw on canvas.</h4>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="vertical-align: top">
                                                <div id="toolbox-wrapper">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div id="rectangle" class="tool-item selected" data-type="rectangle" title="rectangle"></div>
                                                                </td>
                                                                <td>
                                                                    <div id="circle" class="tool-item" data-type="circle" title="circle"></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div id="text" class="tool-item" data-type="text" title="text"></div>
                                                                </td>
                                                                <td>
                                                                    <div id="pencil" class="tool-item" data-type="pencil" title="pencil"></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <div id="canvas-container">
                                                    <canvas id="drawing-pad" width="500" height="380"></canvas>
                                                </div>
                                                <button id="button-reset" class="button">Reset</button>
                                                <button id="button-save" class="button">Save</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td style="width: 100px">
                        <div class="advertise"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
