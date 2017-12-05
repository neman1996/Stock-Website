<?php
ob_start();
header("Content-type: text/event-stream");
$url = "https://www.google.com/finance/info?q=NASDAQ:GOOGL,AAPL,NSE:YESBANK,RELIANCE,MARUTI,INFY,TCS";

while(true)
{
    clearstatcache();
    $stockarr = array();
    $feed = file_get_contents($url);
    $arr = array("//","[","]","}","\n");
    $feed = str_replace($arr,"",$feed);
    $feed = explode("{", $feed);
    $names = array("GOOGLE", "APPLE", "YES BANK", "RELIANCE", "MARUTI", "INFOSYS", "TCS");
    for($i=0; $i<7; $i++)
    {
        $stockarr[$names[$i]] = (float)str_replace('"',"",explode(":",explode(",", $feed[$i+1])[5])[1]);
    }

    $stockarr = json_encode($stockarr);
    echo "event:all_stocks\n";
    echo "retry:100\n";
    echo "data:$stockarr\n\n";
    ob_flush();
    flush();
    sleep(3);
}
?>