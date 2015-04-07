<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>AB`s Blog</title>
        <meta name="viewport" content="width=device-width">
        <link href="css/main.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
        <script type='text/javascript' src="js/alignment.js"></script>
    </head>
    <body>
        <?php
        
        ?>
        <div>
        <div class="sidebar">
            <div class="profile">
            <img src="images/profile.jpg" class="profile-img" alt="Ankur`s Image">
            <h1 class="profilename">Jignesh Thummar </h1>
            <p class="profile">fornt-end developer<a href="http://www.zeuslearning.com/" target="_black">@Zeus Learing</a><br>
            JavaScript and HTML5<br> software engineer</p>
            <div class="socialMedia">
                <a href="https://twitter.com/webonautsIN" class="twitter-follow-button" data-show-count="false" data-lang="en"></a>
                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
                <div class="g-follow" data-annotation="none" data-height="20" data-href="//plus.google.com/u/0/107536392728444153466" data-rel="publisher"></div>
            </div>
            <ul class="navmenu">
                <li><a href="posts/">Blog</a></li>
                <li><a href="demos/">Demos</a></li>
                <li><a href="Lab/">Lab</a></li>
                <li><a href="Hire Me/">Hire Me</a></li> 
            </ul>
            </div>
        </div>
        </div>
        <div class="container">
            <div class="postContainer">
                <?php
                    include  'tutorials/index.php';
                ?>
            <div class="ruler"></div>
            </div>
        </div>
        <div class="footer">
        </div>
        
    </body>
</html>