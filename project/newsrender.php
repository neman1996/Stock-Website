<?php
header("Content-Encoding:gzip");
extract($_GET);
$f = "News/".$news.".txt";
$file = fopen($f,"r");
$data = fread($file, filesize($f));
$output = gzencode($data,9);
echo $output;
?>