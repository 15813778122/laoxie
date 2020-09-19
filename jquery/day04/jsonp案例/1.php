<?php
    header('content-type:text/html;charset="utf-8"');
    $arr = array(10, 20, 30, 40, 50);
    $str = json_encode($arr);
    $funcName = $_GET["callback"];
    if($funcName){
        echo "{$funcName}({$str})";
    }else{
        echo $str;
    }
?>