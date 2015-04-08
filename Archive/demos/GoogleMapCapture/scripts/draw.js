(function () {
    var activeType = 'rectangle';

    $(document).ready(function () {
        var canvasElement = $('#drawing-pad')[0],
            ctx = canvasElement.getContext('2d');

        $('.tool-item').on('click', function () {
            var this$ = $(this),
                data = this$.data(),
                type = data.type;

            if (type !== activeType) {

                $('.tool-item').removeClass('selected');
                $('#' + type).addClass('selected');
                activeType = type;
            }

        });

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

    });
})();