<?php
ob_start();
session_start();
header("Content-type: text/event-stream");
$url = "https://www.google.com/finance/info?q=INDEXDB:DAX,INDEXBOM:SENSEX,NSE:NIFTY";

if(isset($_SESSION['stock']))
{
    $oldval = $_SESSION['stock'];
}
else $oldval = 0;

while(true)
{
    clearstatcache();
   
    $feed = file_get_contents($url);
    $arr = array("//","[","]","}","\n");
    $feed = str_replace($arr,"",$feed);
    $feed = explode("{", $feed);
    $dax = (float)str_replace('"',"",explode(":",explode(",", $feed[1])[5])[1]);
    $nifty = (float)str_replace('"',"",explode(":",explode(",", $feed[3])[5])[1]);
    $sensex = (float)str_replace('"',"",explode(":",explode(",", $feed[2])[5])[1]);
    $newval = $dax+$nifty+$sensex;

    if($newval != $oldval)
    {
        $stockarr = ["DAX" => $dax, "NIFTY" => $nifty, "SENSEX" => $sensex];
        $stockarr = json_encode($stockarr);
        echo "event:stock_update\n";
        echo "retry:100\n";
        echo "data:$stockarr\n\n";
        ob_flush();
        flush();
        $oldval = $newval;
        $_SESSION["stock"] = $oldval;
    }
    sleep(3);
}
?>