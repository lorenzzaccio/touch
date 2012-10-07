<?php
//echo "<pre>";print_r($_POST['tab']);echo"</pre>";
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    //$table_name = "stockplan";

    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());


    $arrow=$_POST['tab'];
    $table_name=$arrow[0];
    $value=$arrow[1];
    $cond1=$arrow[2];
    $cond2=$arrow[3];

    $req1 = "CREATE TABLE ". $table_name." (
  `plan_index` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(32) NOT NULL,
  `plan_x` int(11) NOT NULL,
  `plan_y` int(11) NOT NULL,
  `plan_transx` int(11) NOT NULL,
  `plan_transy` int(11) NOT NULL,
  `plan_rotation` float NOT NULL,
  `plan_forme` varchar(128) NOT NULL,
  `plan_width` int(11) NOT NULL,
  `plan_height` int(11) NOT NULL,
  `plan_arg1` int(11) NOT NULL,
  `plan_arg2` int(11) NOT NULL,
  `plan_text` varchar(256) NOT NULL,
  `plan_fillcolor` varchar(9) NOT NULL,
  `plan_strokecolor` varchar(9) NOT NULL,
  `plan_type` varchar(64) NOT NULL,
  `plan_lieu` varchar(32) NOT NULL,
  `plan_room` varchar(32) NOT NULL,
  `plan_marchandise` varchar(64) NOT NULL,
  `plan_quantite` int(11) NOT NULL,
  `plan_order` int(11) NOT NULL,
  `plan_sync` int(11) NOT NULL,
  PRIMARY KEY (`plan_index`),
  KEY `plan_index` (`plan_index`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1" ;


    //$req1="UPDATE ".$table_name." SET ".$col_name."='".$value."' WHERE ".$cond1."='".$cond2."'";

    
    print_r($req1);

    mysql_query($req1) or exit("Sql Error".mysql_error());


    //mysql_close($con);
?> 