<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Tutorials</title>
    <meta name="viewport" content="width=device-width">
    <link href="../css/main.css" rel="stylesheet" type="text/css" />
</head>
<body>
</body>
</html>




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
        <link href="../css/main.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
        <script type='text/javascript' src="../js/alignment.js"></script>
    </head>
    <body>

    <div>
        <div class="sidebar">
            <div class="profile">
                <img src="../images/profile.jpg" class="profile-img" alt="Ankur`s Image">
                <h1 class="profilename">Ankur Patel</h1>
                <p class="profile">fornt-end developer<a href="http://www.zeuslearning.com/" target="_black">@Zeus Learing</a><br>
                    JavaScript and HTML5<br> software engineer</p>
                
                <div class="socialMedia">
                    <a href="https://twitter.com/webonautsIN" class="twitter-follow-button" data-show-count="false" data-lang="en"></a>
                    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
                        <div class="g-follow" data-annotation="none" data-height="20" data-href="//plus.google.com/u/0/107536392728444153466" data-rel="publisher"></div>
                </div>
                
                <ul class="navmenu">
                    <li><a href="posts/">Blog</a></li>
                    <li><a href="tutorials/">tutorials</a></li>
                    <li><a href="Lab/">Lab</a></li>
                    <li><a href="Hire Me/">Hire Me</a></li> 
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="postContainer">
                <?php
                    $con=mysqli_connect("mysql.hostinger.in","u561012792_ankur","ankur@7600","u561012792_blogd");
    
                    if (mysqli_connect_errno()) {
                        echo "Failed to connect to MySQL: " . mysqli_connect_error();
                    }
    
                    $result = mysqli_query($con,"SELECT * FROM tutorial");
                    while($row = mysqli_fetch_array($result)) {
                        echo '<div class="tutorial-intro-box"><div class="tutorial-intro-header">';
                        echo '<img class="tutorial-intro-img" src="../images/'.$row['image'].'"/>';
                        echo '<h1 class="tutorial-intro-title">'.$row['name'].'</h1></div>';
                        echo '<div class="horizontal-ruler"></div>';
                        echo '<div class="tutorial-intro-text"><p>'.$row['description'].'<p></div>';
                        echo '<div class="horizontal-ruler"></div>';
                        echo '<div class="tutorial-start-button"><a href="" class=".start-tutorial-btn">Strart Learning</a></div></div>';
                    }
                    
                    mysqli_close($con);
                ?>
        </div>
            <div class="comment-container">
                 <div id="disqus_thread"></div>
                    <script type="text/javascript">
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                     var disqus_shortname = 'callicoder'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
                    (function() {
                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    
                
            </div>
        </div>
        
        <div class="footer">
        </div>
    </div>    
    </body>
</html>

