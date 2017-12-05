<?php
header("Content-type:text/xml");
$feed = file_get_contents("http://finance.yahoo.com/rss/headline?s=yhoo,msft,tivo");
echo $feed;
?>