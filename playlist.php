<?php require_once 'slogans.php'; ?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Muxamp</title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="css/playlist.css" />
        <link rel="icon" type="image/png" href="img/favicon.ico" />
        <script type="text/javascript">

            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-27456281-1']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>
    </head>
    <body>
        <div id="wrapper">
            <div id="main">
                <form id="search-form" class="form-inline" method="post">
                    <input type="text" id="search-query" />
                    <input id="search-site" type="hidden" value="ytv" />
                    <div id="search-site-dropdown" class="btn-group">
                        <input type="submit" class="btn" id="search-submit" value="Search" />
                        <button id="site-selector" class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                            YouTube&nbsp;<span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href onclick="return false;">YouTube</a></li>
                            <li><a href onclick="return false;">SoundCloud (Tracks)</a></li>
                        </ul>

                    </div>

                </form>
                <div id="search-results-view"><ul id="search-results"></ul></div>
            </div>
            <div id="right-side">
                <div id="video-container">
                    <div id="video"></div>
                </div>
                <div id="side-content">
                    <div id="playlist-controls">
                        <div id="timebar-row" class="player-row">
                            <div id="timebar">
                                <div id="timebar-outer">
                                    <div id="timebar-inner"></div>
                                </div>
                            </div>
                            <div id="time-elapsed">0:00</div>
                        </div>
                        <div class="player-row left">
                            <div id="controls" class="btn-group">
                                <a href onclick="return false;" id="previous" class="btn"><i class="icon-step-backward"></i></a>
                                <a href onclick="return false;" id="play" class="btn"><i class="icon-play"></i></a>
                                <a href onclick="return false;" id="stop" class="btn"><i class="icon-stop"></i></a>
                                <a href onclick="return false;" id="next" class="btn"><i class="icon-step-forward"></i></a>
                                <a href onclick="return false;" id="shuffle" class="btn"><i class="icon-random"></i></a>
                            </div>
                            <div id="volume">
                                <div id="volume-outer">
                                    <div id="volume-inner"></div>
                                </div>
                            </div>
                            <div id="volume-amount"><i id="volume-symbol" class="icon-volume-up"></i><span id="volume-number">50</span></div>
                        </div>
                    </div>
                    <div id="playlist-view" style="overflow: auto;">
                        <ol id="tracks"></ol>
                    </div>
                    <div id="track-information" >
                        <div class="player-row left">
                            Playlist length: <span id="track-count">0</span> [<span id="playlist-duration">0:00</span>]
                        </div>
                        <div class="player-row right">
                            <a id="about-button" href onclick="return false;"><strong>About Muxamp</strong></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="about" class="modal hide">
            <div class="modal-header">
                <button class="close" data-dismiss="modal">&times;</button>
                <h3>About</h3>
            </div>
            <div class="modal-body">
                <p><b>Muxamp</b> is a unified playlist that lets you enjoy media from SoundCloud and YouTube in the same playlist. The site is powered by <a href="http://www.reddit.com">Reddit</a>, <a href="http://www.soundcloud.com">SoundCloud</a> and <a href="http://www.youtube.com">YouTube</a>. This web app is the work of Robert Fruchtman.</p>

                <p>Muxamp wants to get out of your way. To use the site, use the search bar to locate audio and video from among the following sites:</p>

                <ol>
                    <li>Reddit</li> 
                    <li>SoundCloud</li>
                    <li>YouTube videos</li>
                </ol>

                <p><b>Double-click</b> tracks to play. <b>Drag and drop</b> tracks to move them.</p>

                <p><b>Copy and paste</b> the URL to share your playlist. This site won't track you, promise!</p>
            </div>
        </div>
        <script src="js/swfobject.js" type="text/javascript"></script>
        <script src="js/jquery-1.7.1.min.js" type="text/javascript"></script>
        <script src="js/jquery.livequery.min.js" type="text/javascript"></script>
        <script src="js/jquery.whenall.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
        <script src="js/jquery.layout-latest.min.js" type="text/javascript"></script>
        <script src="js/jQuery.tubeplayer.js" type="text/javascript"></script>
        <script src="js/jquery.blockUI.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/soundmanager2-nodebug-jsmin.js" type="text/javascript"></script>
        <script src="js/jsclass.js" type="text/javascript"></script>
        <script src="js/config.js" type="text/javascript"></script>
        <script src="js/searchresults.js" type="text/javascript"></script>
        <script src="js/player.js" type="text/javascript"></script>
        <script src="js/router.js" type="text/javascript"></script>
        <script src="js/playlist.js" type="text/javascript"></script>
        <script src="js/ui.js" type="text/javascript"></script>
        <script src="js/input.js" type="text/javascript"></script>
    </body>
</html>
