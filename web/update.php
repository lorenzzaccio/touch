<?php
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    $table_name = "stockplan";

    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());

    $arrow=$_POST['tab'];
    $col_name=$arrow[0];
    $value=$arrow[1];
    $cond1=$arrow[2];
    $cond2=$arrow[3];

    $req1="UPDATE ".$table_name." SET ".$col_name."='".$value."' WHERE ".$cond1."='".$cond2."'";
    print_r($req1);
    mysql_query($req1) or exit("Sql Error".mysql_error());
    mysql_close($con);
?> 