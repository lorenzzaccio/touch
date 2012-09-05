/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function ajaxFunction(){
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//var ajaxDisplay = document.getElementById('ajaxDiv');
			var ajaxDisplay = ajaxRequest.responseText;
                        
                        
		}
	}
	var queryString = "?client_id=" + selectedIndex;// + "&wpm=" + wpm + "&sex=" + sex;
	ajaxRequest.open("GET", "getRequest.php" + queryString, true);
	ajaxRequest.send(null); 
}

function setDb(arrow){
	var ajaxRequest;  // The variable that makes Ajax possible!
	var http;
	/*
         *try{
		// Opera 8.0+, Firefox, Safari
		http = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			http = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				http = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}*/
	var url = "setRequest.php";
        var params = query;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");
        http.send(params);
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
		alert(http.responseText);
            }
        }
        

	//ajaxRequest.open("POST", "setRequest.php" + queryString, true);
	//ajaxRequest.send(null); 
        
}
function send_array(arrow){
        var req = { 'tab[]' : arrow , type : 'demo'};
        $.ajax({
                   type: "POST",
                   url: "setRequest.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}

function update(val1,val2,cond1,cond2){
        var tab=[];
        tab[0]=val1;
        tab[1]=val2;
        tab[2]=cond1;
        tab[3]=cond2;
        
        var req = { 'tab[]' : tab , type : 'demo'};
        $.ajax({
                   type: "POST",
                   url: "update.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}

function syncM2S(arrow){        
        var req = { 'tab[]' : arrow , type : 'sync'};
        $.ajax({
                   type: "POST",
                   url: "duplicate.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}
function syncS2MPhp2(){
    	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//var ajaxDisplay = document.getElementById('ajaxDiv');
			var ajaxDisplay = ajaxRequest.responseText;
                        syncLclStorage(ajaxRequest.responseText);
		}
	}
	var queryString = "?client_id=" + selectedIndex;// + "&wpm=" + wpm + "&sex=" + sex;
	ajaxRequest.open("GET", "syncS2M.php" + queryString, true);
	ajaxRequest.send(null); 
}
function syncS2MPhp(){
    var arr = [];
/* call the php that has the php array which is json_encoded */
                $.getJSON('syncS2M.php', function(data) {
                        /* data will hold the php array as a javascript object */
                        arr = data[0];
                        syncLclStorage(arr);
                        /*
                        $.each(data, function(key) {
                            var arr = [];
                            arr.push(JSON.parse(data[key]));
                            syncLclStorage(arr);
                                //$('ul').append('<li id="' + key + '">' + val.first_name + ' ' + val.last_name + ' ' + val.email + ' ' + val.age + '</li>');
                        });*/
                });
}
function syncS2MArticlePhp(){
    var arr = [];
    /* call the php that has the php array which is json_encoded */
    $.getJSON('syncS2MArticle.php', function(data) {
    /* data will hold the php array as a javascript object */
    arr = data[0];
    syncLclStorageArticle(arr); 
    });
}