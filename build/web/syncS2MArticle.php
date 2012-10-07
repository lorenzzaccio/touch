<?php
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    
    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());
    
    //build query
    $query = "SELECT ord_pref,ord_art FROM ordine where ord_pref not like 'K%' and ord_pref not like 'E%' GROUP BY ord_art,ord_pref ASC";

    //Execute query
    $qry_result = mysql_query($query) or die(mysql_error());

    //Build Result String
    $data = array();

    while(($row = mysql_fetch_row($qry_result))) {
    $data[] = $row;
    }
 
    echo json_encode(array($data));


?>