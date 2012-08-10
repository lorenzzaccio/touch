<?php
//echo "<pre>";print_r($_POST['tab']);echo"</pre>";
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    $table_name = "stockplan";

    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());


    $req1="REPLACE ".$table_name." VALUES(";
    $nbr_data = 22;
    $arrow=$_POST['tab'];
    
    for($i=0;$i<$nbr_data;$i++){
        //if($i==0)
        //    $arrow[$i]='null';
        $req1 .= "'".$arrow[$i]."'" ;
        if($i+1>=$nbr_data){
            $req1 .= ')';
        }else{
            $req1 .= ',';
        }
    }
    print_r($req1);

    mysql_query($req1) or exit("Sql Error".mysql_error());

    mysql_close($con);
?> 