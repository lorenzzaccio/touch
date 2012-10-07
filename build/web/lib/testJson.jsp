<?php
echo "coucoucoucouccuo";
if ($_GET['action']=='getlink'){

$ld=loadInfo ($_GET['link']);
echo $ld;
}


function loadInfo ($lnk){

switch ($lnk) {
case 1:
$list['name']='name john';
$list['desc']='my desc fsdfsd';
break;
case 2:
$list['name']='orians gate';
$list['desc']='bla for bla';
break;
case 3:
$list['name']='space 1999';
$list['desc']='whos there anyone';
break;
}
//properly format for use in javascript
$str=json_encode($list);

return $str;
}
?> 