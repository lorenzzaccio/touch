<?php
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "lorenzo2301";
    $dbname = "capstech";
    $table_name = "stockplan";



    $nbr_data = 22;
    $arrow=$_POST['tab'];
    $index=$arrow[0];
    $id=$arrow[1];
    print_r("COUCOU!!!");
    $name = array('plan_index','plan_id','plan_x','plan_y','plan_transx','plan_transy','plan_rotation','plan_forme','plan_width','plan_height','plan_arg1','plan_arg2','plan_text','plan_fillcolor','plan_strokecolor','plan_type','plan_lieu','plan_room','plan_marchandise','plan_quantite','plan_order','plan_sync');

    //Connect to MySQL Server
    mysql_connect($dbhost, $dbuser, $dbpass);
    //Select Database
    mysql_select_db($dbname) or die(mysql_error());
    // Retrieve data from Query String
    
    // Escape User Input to help prevent SQL Injection
    $index = mysql_real_escape_string($index);
    $id = mysql_real_escape_string($id);
    	
    //build query
    $query = "SELECT "plan_id" FROM stockplan WHERE plan_index = '$index'";
    print_r($query);
    //Execute query
    $qry_result = mysql_query($query) or die(mysql_error());

    //Build Result String
    if(mysql_num_rows($qry_result)>0){
        //update line
        $req1="UPDATE ".$table_name." SET "; 
        for($i=1;$i<$nbr_data;$i++){
            $req1 .= $name[$i]."='".$arrow[$i]."'" ;
            if($i+1>=$nbr_data){
                $req1 .= "WHERE ".$name[0]."='".$arrow[0]."'";
            }else{
                $req1 .= ',';
            }
        }
    }else{
        //create new line
        $req1="INSERT INTO ".$table_name." VALUES(";
        for($i=0;$i<$nbr_data;$i++){
            if($i==0)
                $arrow[$i]='null';
            $req1 .= "'".$arrow[$i]."'" ;
            if($i+1>=$nbr_data){
                $req1 .= ')';
            }else{
                $req1 .= ',';
            }
        }
    }
    print_r($req1);
    mysql_query($req1) or exit("Sql Error".mysql_error());
    mysql_close($con);

?> 