<!DOCTYPE html>
<html>
	<head>
        <script src="../../lib/jquery-1.11.0.js"></script>
		<style>
		    html, body, #container {
		        height: 100%;
		        margin: 0;
		        font-family: Helvetica;
		    }

		    #container {
		        display: inline-table;
		        width: 90%;
		        padding: 50px 0px;
		        margin: 0 5%;
		        min-width: 1024px;
		    }

		    #title, #info {
		        text-align: center;
		        font-size: 45px;
		        color: #697464;
		    }

		    .advertise {
		        display: table-cell;
		        height: 500px;
		        width: 150px;
		        border: 1px solid;
		    }

		    #content {
		        padding: 0 30px;
		    }

		    #info {
		        text-align: center;
		        font-size: 25px;
		        color: #697464;
		    }

		    #map-image {
		        border: 1px solid;
		        margin-top: 30px;
		        margin-left: auto;
		        margin-right: auto;
		        display: inherit;
		    }
		</style>

		<?php
        if($_POST["imageData"] !== undefined ){
         $imageData = $_POST["imageData"];
         }
        ?>
    <script>
        var imageData = '<?php  echo $imageData  ?>';
        $(document).ready(function () {
            $('#map-image')[0].src = imageData;
        });
    </script>

	</head>
	
	<body>
	<div id="container">
		<div class="advertise"></div>
		<div id="content">
			<div id="title">Title</div>
			<br>
			<div id="info">Right click on image and save it.</div>
			<img id="map-image" width="500" height="380"/>
		</div>
		<div class="advertise"></div>
	</div>
	</body>
</html>