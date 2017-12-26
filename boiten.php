<?php
include("./appVersion.php");
include("./Units.php");
$viva = new AppVersion();
$type = "YNT";
$name = "Dep";
$data = "cmd=$type&name=$name";
$viva->CallAPI("POST", "http://api.lichvansu.net:8080/get-name", $data);
?>