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
    $client_id = $_GET['client_id'];
    
    // Escape User Input to help prevent SQL Injection
    $client_nom = mysql_real_escape_string($client_nom);
    	
    //build query
    $query = "SELECT * FROM client WHERE client_id = '$client_id'";

    /*
    if(is_numeric($client_nom))
            $query .= " AND ae_age <= $client_nom";
    if(is_numeric($wpm))
            $query .= " AND ae_wpm <= $wpm";
    */
    //Execute query
    $qry_result = mysql_query($query) or die(mysql_error());

    //Build Result String

    // Insert a new row in the table for each person returned
    while($row = mysql_fetch_array($qry_result)){
	$display_string = json_encode($row);
    }
    echo $display_string;
?>