<?php
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    
    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());
    // Retrieve data from Query String
    //$client_id = $_GET['client_id'];
    
    // Escape User Input to help prevent SQL Injection
    //$client_nom = mysql_real_escape_string($client_nom);
    	
    //build query
    $query = "SELECT * FROM stockplan";

    //Execute query
    $qry_result = mysql_query($query) or die(mysql_error());

    //Build Result String
/*
    // Insert a new row in the table for each person returned
    while($row = mysql_fetch_array($qry_result)){
    	$display_string = json_encode($row);
    }
    echo $display_string;
*/
    $data = array();

    while(($row = mysql_fetch_row($qry_result))) {
    $data[] = $row;
    }
    //echo $data[];
    //$script = '<script>var newArr = new Array(' . implode(',', $data) . ');</script>';
    //echo $script;  
    echo json_encode(array($data));


?>