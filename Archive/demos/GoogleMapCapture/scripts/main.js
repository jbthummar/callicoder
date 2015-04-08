(function () {

    $(document).ready(function () {

        function onCapture() {
            //get transform value
            var transform = $(".gm-style>div:first>div").css("transform");
            var comp = transform.split(","); //split up the transform matrix
            var mapleft = parseFloat(comp[4]); //get left value
            var maptop = parseFloat(comp[5]);  //get top value
            $(".gm-style>div:first>div").css({ //get the map container. not sure if stable
                "transform": "none",
                "left": mapleft,
                "top": maptop,
            });

            $('.gmnoprint').each(function (node) {
                this.attributes['skipelement'] = true;
            });

            html2canvas($('#googleMap')[0], {
                logging: false,
                useCORS: true,
                sourceElement: $('#googleMap')[0],
                onrendered: function (canvas) {
                    console.log(canvas.toDataURL());
                    openWindowWithPostRequest(canvas.toDataURL());
                    $(".gm-style>div:first>div").css({ left: '', top: '', transform: transform });
                    $('.gmnoprint').each(function (node) {
                        this.attributes['skipelement'] = false;
                    });
                    //document.body.appendChild(canvas);
                }
            });
        }

        function initialize() {
            var mapProp = {
                center: new google.maps.LatLng(51.508742, -0.120850),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            $('#button-capture').on("click", onCapture);
        }
        initialize();

        function openWindowWithPostRequest(imageData) {
            var winName = 'Mywindow';
            var winURL = 'http://localhost:8003/demos/GoogleMapCapture/draw.debug.php';
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
    });

})();